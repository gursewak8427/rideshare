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
            port: 465,
            secure: true, // Use `true` for port 465, `false` for port 587
            auth: {
                user: "gursewaksaggu2043@gmail.com", // Replace with your Gmail address
                pass: "jjenuqkjxlnjrmha", // Replace with your Gmail password or App Password
            },
        });


        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });


        const mailData = {
            from: `"${appName} Team" <gursewaksaggu2043@gmail.com>`, // Replace with your Gmail address
            to: email, // List of receivers
            subject: subject, // Subject line
            html: html, // HTML body
        };

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Message sent successfully");
                    console.log(info);
                    resolve(info);
                }
            });
        });


    } catch (error) {
        console.error("Error sending email:", error);
    }
};
