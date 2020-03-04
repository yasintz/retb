import to from 'await-to-js';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import ServerContext from '@server/context';
import { HTTP400Error, HTTP404Error } from '@server/helpers/http-errors';
import UserModel from '@server/database/models/user.model';

class PassportService {
  private _localStrategy: LocalStrategy;

  private _jswStrategy: JwtStrategy;

  private _googleStrategy: GoogleStrategy;

  get LocalStrategy(): LocalStrategy {
    return this._localStrategy;
  }

  get JwtStrategy(): JwtStrategy {
    return this._jswStrategy;
  }

  get GoogleStrategy(): GoogleStrategy {
    return this._googleStrategy;
  }

  constructor() {
    this.createLocalStrategy();
    this.createJwtStrategy();
    this.createGoogleStrategy();
    this.serializeUser();
    this.desrializeUser();
  }

  private serializeUser() {
    passport.serializeUser<UserModel, string>((user, done) => {
      done(null, user.id);
    });
  }

  private desrializeUser() {
    passport.deserializeUser<UserModel, string>(async (userId, done) => {
      const [error, foundedUser] = await to(ServerContext.DatabaseContext.Services.UserService.findById(userId));

      if (error || foundedUser) {
        done(error, foundedUser);

        return;
      }

      done(new HTTP404Error('required user'));
    });
  }

  private createJwtStrategy = () => {
    this._jswStrategy = new JwtStrategy(
      { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: ServerContext.TOKEN_SECRET_KEY },
      (jwtPayload, done) => {
        process.nextTick(async () => {
          const { userId } = jwtPayload;
          const [error, foundedUser] = await to(ServerContext.DatabaseContext.Services.UserService.findById(userId));
          if (error || foundedUser) {
            done(error, foundedUser);

            return;
          }
          done(new HTTP400Error('Missing Token'));
        });
      },
    );
  };

  private createLocalStrategy = () => {
    this._localStrategy = new LocalStrategy((username, password, done) => {
      process.nextTick(async () => {
        const [error, foundedUser] = await to(
          ServerContext.DatabaseContext.Services.UserService.getUser(username, password),
        );
        if (error || foundedUser) {
          done(error, foundedUser);

          return;
        }
        done(new HTTP400Error('Incorrect Username or Password'));
      });
    });
  };

  private createGoogleStrategy = () => {
    this._googleStrategy = new GoogleStrategy(
      {
        clientID: ServerContext.GOOGLE_CLIENT_ID,
        clientSecret: ServerContext.GOOGLE_CLIENT_SECRET,
        callbackURL: `${ServerContext.SERVER_URL}/auth/login/google/callback`,
      },
      (token, tokenSecret, profile, done) => {
        process.nextTick(async () => {
          try {
            const { id: googleId, emails } = profile;
            if (!emails) {
              throw new HTTP400Error('Email not found');
            }
            const email = emails[0].value;

            const foundedUser = await ServerContext.DatabaseContext.Services.UserService.findOrCreateByGoogleId(
              googleId,
              email,
            );
            if (!foundedUser) {
              throw new HTTP400Error('An error occured');
            }

            done(undefined, foundedUser);
          } catch (error) {
            done(error, false);
          }
        });
      },
    );
  };
}

export default new PassportService();
