const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "qq",
  port: 465,
  secureConnection: true,
  tls: {rejectUnauthorized: false},
  auth: {
    user: "wave.wu@qq.com",
    pass: "cqdgknfdvxsoeafj",
  },
});

function sendEmail(verificationCode, toEmail) {
  let mailOptions = {
    from: "wave.wu@qq.com", 
    to: toEmail, 
    subject: "验证码",
    html: `<b>您的登录验证码为${verificationCode},收到邮件5分钟内有效,如果不是您的操作请忽略此邮件</b>`, // html
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("邮件已发送成功,邮件id: %s", info.messageId, verificationCode);
  });
}

module.exports = sendEmail;
