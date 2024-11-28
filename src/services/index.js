const fs = require("fs")
const nodemailer = require('nodemailer')
const path = require('path')

const generateFourDigitCode = (inputString) => {
    // Générer un hash numérique à partir de la chaîne
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
        hash = (hash << 5) - hash + inputString.charCodeAt(i);
        hash |= 0; // Convertir en entier 32 bits
    }

    // Rendre le hash positif
    hash = Math.abs(hash);

    // Générer un nombre aléatoire entre 1 et 1000
    const randomMultiplier = Math.floor(Math.random() * 1000) + 1;

    // Multiplier et extraire les 4 premiers chiffres
    const product = hash * randomMultiplier;
    const fourDigitCode = product.toString().slice(0, 4);

    return fourDigitCode;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'perrinemmanuelnzaou@gmail.com',
      pass: 'plorvjvqayyjuuhq',
    },
  });
  
const sendFourDigitCodeEmail = async (code, userEmail, confirmationLink, filename, transporter) => {
    const emailTemplatePath = path.join('src', 'mails', filename)
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')
  
    const emailContent = emailTemplate
        .replace('{{code}}', code)
        .replace('{{confirmationLink}}', confirmationLink)
  
    let mailOptions = {
        from: 'perrinemmanuelnzaou@gmail.com',
        to: userEmail,
        subject: 'Vérification de votre adresse email',
        html: emailContent
    }
  
    try {
        await transporter.sendMail(mailOptions)
        console.log('Email envoyé avec succès.')
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error)
    }
}

module.exports = {
    generateFourDigitCode,
    transporter,
    sendFourDigitCodeEmail
}