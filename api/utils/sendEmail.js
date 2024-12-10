const nodemailer = require('nodemailer'); // declaração da biblioteca nodemailer
const resetPasswordHtml = require('./html-for-emails/resetPasswordHTML')
const verifyEmailHtml = require('./html-for-emails/verifyEmailHTML')

const sendEmail = (email,subject, content) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'luisfabianocarvalholeite@gmail.com', 
            pass: 'okdzwsnvgzcuydgp'         
          }
    })
    
    // configurações do envio do e-mail
    const mailOptions = {
        from: 'luisfabianocarvalholeite@gmail.com',
        to: email,
        subject,
        html: content.token? resetPasswordHtml(content.token) : verifyEmailHtml(content.verificationCode, content.userName)
        
    }

    // envio do e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o email:', error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
} 

module.exports = sendEmail // export da função sendEmail que será usada no account controller