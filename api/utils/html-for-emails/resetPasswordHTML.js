const resetPasswordHTML = ( token) => {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background-color: #f4e4e1; color: #8b8a81; width: 100%; height: 100%; margin: 0; padding: 0; font-family: 'Lato', sans-serif;">
    <div style="max-width: 500px; margin: auto; padding: 20px; text-align: center;">
        <h1 style="color: #8b8a81;">Olá!</h1>
        <p style="margin-bottom: 20px; line-height: 1.5; font-size: large; color: #8b8a81;">
            Foi requisitada uma mudança de senha para a sua conta FelicitaStore. Clique no link abaixo para redefinir sua senha.
            Se não foi você que fez isso, ignore este e-mail.
        </p>
        <a href="http://localhost:3000/auth/reset-password?token=${token}" 
           style="display: inline-block; padding: 10px 20px; background-color: #8b8a81; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
           Redefinir Senha
        </a>
        <p style="margin-top: 20px; font-size: 14px; color: #8b8a81; font-size: medium; ">
            Caso o botão não funcione, copie e cole este link em seu navegador:
            <br>
            <a href="http://localhost:3000/auth/reset-password?token=${token}" style="color: #8b8a81; font-size: small;">
              http://localhost:3000/auth/reset-password?token=${token}
            </a>
        </p>
    </div>
</body>
</html>
    `;
  };
  
  module.exports = resetPasswordHTML;