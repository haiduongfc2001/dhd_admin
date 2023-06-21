// const isLogin = async (req, res, next) => {
//     try {
//         if (req.session._id) {
//             next();
//         } else {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         next();
//     } catch (err) {
//         console.log(err.message)
//     }
// };

const isLogin = (req, res, next) => {
    // Check if user is logged in
    if (req.session && req.session.user) {
        // User is logged in, proceed to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to login page or send an error response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware for admin authentication
const isAdminLogin = (req, res, next) => {
    // Check if admin is logged in
    if (req.session  && req.session.adminId) {
        // Admin is logged in, proceed to the next middleware or route handler
        next();
    } else {
        // Admin is not logged in or not authorized, redirect to login page or send an error response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware for logging out
const isLogout = (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        // Redirect to the login page or send a success response
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

// const isLogout = async (req, res, next) => {
//     try {
//         if (req.session._id) {
//             return res.status(200).json({ message: 'Already logged in' });
//         }
//         next();
//     } catch (error) {
//         console.log(error.message);
//     }
// };

module.exports = {
    isLogin,
    isAdminLogin,
    isLogout
}