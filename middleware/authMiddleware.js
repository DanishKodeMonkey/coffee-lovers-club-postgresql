// this middleware checks if a user is currently authenticated and seriealised.
// used to protect route access, redirects if not authenticated

module.exports.ensureAuthenticated = (req, res, next) => {
    // user is authenticated succesfully, proceed.
    if (req.isAuthenticated()) {
        return next();
    }
    // user is not authenticated, redirect to sign in
    res.redirect('/auth/sign-in');
};
