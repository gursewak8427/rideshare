import nodemailer from "nodemailer";

const appName = "Ridesewa";
const appColor = '#DA38A7';

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
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for port 587
            auth: {
                user: "gursewaksaggu2043@gmail.com", // Replace with your Gmail address
                pass: "jjenuqkjxlnjrmha", // Replace with your Gmail password or App Password
            },
        });

        const info = await transporter.sendMail({
            from: `"${appName} Team" <gursewaksaggu2043@gmail.com>`, // Replace with your Gmail address
            to: email, // List of receivers
            subject: subject, // Subject line
            html: html, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
