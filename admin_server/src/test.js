// const sendVerifyMail = async (name, email, user_id) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: HOST,
//             port: PORT,
//             secure: false,
//             requireTLS: true,
//             auth: {
//                 user: USERNAME,
//                 pass: PASSWORD,
//             },
//         });
//
//         const MailOptions = {
//             from: USERNAME, // Use the same email username as the sender
//             to: email,
//             subject: 'For Verification Mail',
//             text: "Plaintext version of the message",
//             html: '<p>Hi ' + name + ', please click here to <a href="http://127.0.0.1:3000/verify?id=' + user_id + '"> Verify </a> your mail.</p>',
//         }
//
//         transporter.sendMail(MailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email has been sent: ' + info.response);
//             }
//         });
//
//     } catch (error) {
//         console.log(error.message);
//     }
// };