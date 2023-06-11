const express = require("express");
const app  = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//MIDLEWARE | REDIRECCIONAMIENTO ESTATICO | "/" => carpeta raiz | Dirname => direccion actual
app.use(express.static("public"))
app.use(express.json())

//re1,res => solicitud de respuesta
app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/public/index.php')
})

app.post("/", (req, res)=>{
    console.log(req.body);
    //createTransporter => metodo para pasar detalles del correo electronico real que usa para enviar el correo
    //Guardarlo en variables de entorno
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "scriptappweb@gmail.com",
            pass: "Example"
        }
    })
    /*const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Servidor SMTP de Hotmail/Outlook
        port: 587, // Puerto SMTP
        secure: false, // Habilitar el uso de STARTTLS
        auth: {
            user: 'soporte.avon@hotmail.com', // Tu dirección de correo electrónico de Hotmail
            pass: '#Jherco098123', // Tu contraseña de Hotmail
        }

    })*/
    //Objeto de datos ingresados
    const mailOptions = {
        from: req.body.email,
        to: "scriptappweb@gmail.com",
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }
    //Metodo de envio de cooreo (enviar correo con valor mailoption callback)
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error){
            console.log(error);
            res.send("error");
        }else{
            console.log("Email enviado: "+ info.response)
            res.send(`success`)
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Servidor en funcionamiento: ${PORT}`)
})