const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {config} = require("dotenv");
config()

const ALLOWED_USER_ID = '103157083898501468881';

passport.use('google', new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport callback function fired:');

    if (profile.id === ALLOWED_USER_ID) { // Assuming emails is an array and you want the primary email
        return done(null, profile);
    } else {
        return done(new Error('Not Allowed'), null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user._json);
});

passport.deserializeUser((id, done) => {
    // Here you would usually fetch the user from your database using the user ID.
    // For simplicity, we're skipping that step.
    // Replace this with your user fetching logic if needed.
    done(null, id);
});
