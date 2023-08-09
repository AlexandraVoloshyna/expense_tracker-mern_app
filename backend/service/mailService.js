import nodemailer from "nodemailer"

export const sendActivationLink = async (to, link) =>{
    const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                    
                }
            })
            await transporter.sendMail({
                        from: process.env.SMTP_USER,
                        to,
                        subject: "Activation",
                        text: '',
                        html:
                            `
                                <div>
                                    <h1>Activate your account by clicking the following link</h1>
                                    <a href="${link}">${link}</a>
                                </div>
                            `
                        })
}





