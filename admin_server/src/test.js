// const UserVerifyLogin = async (req, res) => {
//     try {
//
//         const {email, password} = req.body;
//
//         const userData = await User.findOne({email});
//
//         if (!userData) {
//             return res.status(401).json({message: 'Bạn chưa đăng ký tài khoản'});
//         } else {
//             if (userData.is_verified === 0) {
//                 res.status(401).json({ message: 'Bạn chưa xác thực tài khoản'});
//             } else {const passwordMatch = await bcrypt.compare(password, userData.password);
//                 if (!passwordMatch) {
//                     return res.status(401).json({message: 'Email hoặc mật khẩu không đúng!'});
//                 } else {
//                     const token = jwt.sign({user_id: userData._id}, process.env.JWT_SECRET);
//
//                     req.session.token = token;
//
//                     res.json({ message: 'Logged in successfully', token, user_id: userData._id });
//                 }
//             }
//         }
//     } catch {
//         res.status(500).json({message: 'Server error'});
//     }
// }