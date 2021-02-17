import nodemailer from 'nodemailer'

const user = "gabrielsena@giftr.com.br";

const pass = "";

class Emailcontroller {
    async emailDeConfirmacao(req, res) {
        const { email } = req.params;
        const { codigo } = req.params;

        const transporter = nodemailer.createTransport({
            host: "smtp.umbler.com",
            port: 587,
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