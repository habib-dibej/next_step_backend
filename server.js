const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors()); // Permettre les requêtes CORS
app.use(express.json()); // Pour analyser les requêtes JSON

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'raslensebii100@gmail.com',
        pass: 'tugw saic tlcm qlrc', // Remplacez par votre mot de passe d'application
    },
});

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, phone, businessName, interests, pack } = req.body;

    const mailOptions = {
        from: 'raslensebii100@gmail.com',
        to: 'nextstep132@gmail.com',
        subject: `New Booking: ${firstName} ${lastName}`,
        text: `
        A new booking has been made with the following details:
        - Name: ${firstName} ${lastName}
        - Email: ${email}
        - Phone: ${phone}
        - Business Name: ${businessName}
        - Interests: ${interests}
        - Pack: ${pack}
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
    }
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
