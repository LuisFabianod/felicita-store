const nodemailer = require('nodemailer');

const sendEmail = (email,subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'luisfabianocarvalholeite@gmail.com', // Substitua pelo seu email
            pass: 'okdzwsnvgzcuydgp'            // Substitua pela sua senha do email
          }
    
        
    })
    
    const mailOptions = {
        from: 'luisfabianocarvalholeite@gmail.com',
        to: email,
        subject,
        text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o email:', error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
} 

module.exports = sendEmail