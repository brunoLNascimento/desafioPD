const email = require('emailjs');

function serverEmail(){
    return email.server.connect({
        user: 'bnascimento1@live.com',
        password: 'bruno2019',
        host: 'smtp.outlook.com',
        port: 587,
        ssl: false,
        tls: true
      });
}

module.exports.envia = async function(req,res){
    try{
        let {assunto, email, nome, motivo} = req.body
        let server = await serverEmail()
    
        server.send({
            text: motivo,
            from: 'IB Contabil <bnascimento1@live.com>',
            to: `${nome} <${email}>`,
            subject: assunto
        }, function (err, response) {
            if(err) return res.status(500).send({mensagem: "Algo deu errado ao enviar o email"})
            else return res.status(200).send({mensagem: "Email enviado com sucesso!"})
        })
    }catch(err){
        console.log(err)
        return res.send("Algo deu errado")
    }

}