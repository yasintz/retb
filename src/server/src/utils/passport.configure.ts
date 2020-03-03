import { PassportStatic } from 'passport';
import passportService from '@server/services/passport.service';

function configurePassport(passport: PassportStatic) {
  passport.use(passportService.LocalStrategy);
  passport.use(passportService.JwtStrategy);
  passport.use(passportService.GoogleStrategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });
}

export default configurePassport;
