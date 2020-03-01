import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy((username, password, done) => {
    // TODO: implement auhentication
    done(null, { username: 'yasintz', name: 'Yasin' });
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

export default passport;
