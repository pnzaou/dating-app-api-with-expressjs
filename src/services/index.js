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
  
const sendFourDigitCodeEmail = async (code, userEmail, filename, transporter, confirmationLink = null) => {
    const emailTemplatePath = path.join('src', 'mails', filename)
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')
    let emailContent = emailTemplate

    if(confirmationLink === null) {
        emailContent = emailContent.replace('{{LINK}}', "")
    } else {
        const link = `<p style="text-align: center;"><a style="color: #fff;" href="${confirmationLink}" class="btn">Cliquer ici pour renseigner le code</a></p>`
        emailContent = emailContent.replace('{{LINK}}', link)
    }
  
    emailContent = emailContent.replace('{{code}}', code)
  
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

const calculerAge = (dateDeNaissance) => {
    const birthDate = new Date(dateDeNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Ajuster l'âge si le mois ou le jour de l'anniversaire n'est pas encore passé
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

module.exports = {
    generateFourDigitCode,
    transporter,
    sendFourDigitCodeEmail,
    calculerAge
}