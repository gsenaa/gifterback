"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);

const user = "gabrielsena@giftr.com.br";

const pass = "";

class Emailcontroller {
    async emailDeConfirmacao(req, res) {
        const { email } = req.params;
        const { codigo } = req.params;

        const transporter = _nodemailer2.default.createTransport({
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

exports. default = new Emailcontroller();