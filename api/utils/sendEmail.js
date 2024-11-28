const nodemailer = require('nodemailer'); // declaração da biblioteca nodemailer

const sendEmail = (email, verificationCode) => { 
    // confiurações do e-mail que vai ser usado para o envio
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
        to: email, // e-mail do usuário
        subject: 'Esse é o seu código de verificação',
        text: `${verificationCode}` 
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