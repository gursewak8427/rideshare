import nodemailer from "nodemailer";

const appName = "Ridesewa";

export const sendEmail = async ({
    email,
    subject,
    html,
}: {
    email: string;
    subject: string;
    html: string;
}) => {
    try {
        console.log("Sending email...");

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use SSL for port 465
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address (from environment variables)
                pass: process.env.EMAIL_PASS, // Gmail App Password (from environment variables)
            },
            connectionTimeout: 10000, // 10 seconds
            socketTimeout: 10000, // 10 seconds
        });

        // Verify SMTP configuration
        await transporter.verify();

        // Email content
        const mailData = {
            from: `"${appName} Team" <${process.env.EMAIL_USER}>`, // Sender's email address
            to: email, // Recipient's email address
            subject: subject, // Email subject
            html: html, // Email content in HTML format
        };

        // Send the email
        const info = await transporter.sendMail(mailData);

        console.log("Message sent successfully:", info.messageId);
    } catch (error:any) {
        console.error("Error sending email:", error.message);
    }
};
