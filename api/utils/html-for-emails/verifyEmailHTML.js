const verifyEmailHTML = ( vericationCode, userName) => {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background-color: #f4e4e1; color: #8b8a81; width: 100%; height: 100%; margin: 0; padding: 0; font-family: 'Lato', sans-serif;">
    <div style="max-width: 500px; margin: auto; padding: 20px; text-align: center;">
        <h1 style="color: #8b8a81;">Olá, ${userName}!</h1>
        <p style="margin-bottom: 20px; line-height: 1.5; font-size: large; color: #8b8a81;">
            Seja bem-vinda(o) à FelicitaStore, copie o código abaixo e envie para que sua conta seja verificada!
        </p>
        
        <p style="margin-top: 20px; font-size: 14px; color: #8b8a81; font-size: medium; ">
            ${vericationCode}
        </p>
    </div>
</body>
</html>
    `;
  };
  
  module.exports = verifyEmailHTML;