import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import ServerContext from '@server/context';

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
  }

  private createJwtStrategy = () => {
    this._jswStrategy = new JwtStrategy(
      { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: ServerContext.TOKEN_SECRET_KEY },
      (jwtPayload, done) => {
        process.nextTick(() => {
          const userId = jwtPayload.id;
          // TODO: find user by user id
          if (userId === 'yasin tazeoglu') {
            done(null, { username: 'yasin', id: userId });

            return;
          }

          done(null, false);
        });
      },
    );
  };

  private createLocalStrategy = () => {
    this._localStrategy = new LocalStrategy((username, password, done) => {
      process.nextTick(() => {
        // TODO: find user by username passowrd
        if (username === 'yasintz' && password === '12345') {
          done(null, { username: 'yasintz', name: 'Yasin', id: 'yasin tazeoglu' });

          return;
        }
        done(null, false, { message: 'Incorrect username' });
      });
    });
  };

  private createGoogleStrategy = () => {
    this._googleStrategy = new GoogleStrategy(
      {
        clientID: ServerContext.GOOGLE_CLIENT_ID,
        clientSecret: ServerContext.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/login/google/callback',
      },
      (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
          // TODO: find user by google id > profile.id
          done(undefined, { profile, token });
        });
      },
    );
  };
}

export default new PassportService();
