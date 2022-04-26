require("dotenv").config()
const nodemailer = require("nodemailer");

const mailer = async ({emailC,subjectC,textC})=> {
    //create transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        },
    });
    //create mail options
    let mailOptions = {
        from: "BanTexico",
        to: emailC,
        subject: subjectC,
        text:textC,
    };
    //send mail

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log("Email sent: " + info.response);
        // return res.status(OK).json(resOk('datos enviados al correo'));
        return true
    })
}

module.exports = mailer