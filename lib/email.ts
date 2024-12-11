import nodemailer from "nodemailer"

const appName = "Ridesewa"
const appColor = '#DA38A7';

export const sendEmail = async ({ email, subject, html }: { email: string, subject: string, html: string }) => {
    try {
        console.log("Sending email...")
        const transporter = nodemailer.createTransport({
            host: "in-v3.mailjet.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            tls: {
                maxVersion: 'TLSv1.3',
                minVersion: 'TLSv1.2',
                ciphers: 'TLS_AES_128_GCM_SHA256',
            },
            auth: {
                user: "d478a543897eb46f4f8a47d39b19e3c0",
                pass: "51f611f9afe42a7044dcabe2dc0e87c5",
            }
        });

        const info = await transporter.sendMail({
            from: `"${appName} Team" <noreply@llamanodes.net>`, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        console.log("Message sent: %s", error);

    }


}