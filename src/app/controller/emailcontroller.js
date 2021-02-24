import nodemailer from 'nodemailer';
import 'dotenv/config';

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const host = process.env.EMAIL_HOST
const port = process.env.EMAIL_PORT

class Emailcontroller {
    async emailDeConfirmacao(req, res) {
        const { email } = req.params;
        const { codigo } = req.params;

        const transporter = nodemailer.createTransport({
            host: host,
            port: port,
            auth: { user, pass }
        })
        
        transporter.sendMail({
            from: user,
            to: email,
            replyTo: user,
            subject: "Recuperação de senha",
            text:"Teste",
            html: '<p>Este é seu codigo para mudar sua senha '+ codigo +'</p>'
        }).then(info => {
            res.send(info)
        }).catch(error => {
            res.send(error)
        })


    }
}

export default new Emailcontroller();