import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../config.js";
import PacientesModel from "../models/Pacientes.js"
import { error } from "console";


const registerPacientesController = {};

registerPacientesController.postPacientes = async (req, res) =>{

    const {nombre, edad, correo, contraseña, telefono, isVerified} = req.body;

    try {
    const pacienteExistente = await PacientesModel.findOne({correo})

        if(pacienteExistente){
            return res.json({message: "El cliente existe"})
        }

        const contrasena = await bcrypt.hash(contraseña, 10);

        const pacienteNuevo = new PacientesModel({nombre, edad, correo, contraseña:contrasena, telefono, isVerified: isVerified || false})
        await pacienteNuevo.save();

        const verificationCode = crypto.randomBytes(3).toString("Hex");


        const tokenCode = jsonwebtoken.sign(

            {correo, verificationCode},

            config.jsontoken.SECRETO,
            
            {expiresIn: "2h"},

            (error, token)=>{

                if(error) console.log(error)
                res.cookie("authToken", token)
                res.json({message: "paciente creado"})
            }
        );

        res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000})

        const transporter = nodemailer.createTransport({

            service: "gmail",
            auth:{
                user: config.email.USER,
                pass: config.email.PASS
            }
        });

        const mailOptions = {
            from: config.adminCredentials.USEREMAIL,
            to: correo,
            subject: "Verificación de correo",
            // Usamos HTML en lugar de texto plano
            html: `
              <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      color: #333;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                    }
                    .container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: white;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                      text-align: center;
                      color: #4CAF50;
                    }
                    .content {
                      font-size: 16px;
                      line-height: 1.5;
                      margin-top: 20px;
                    }
                    .code {
                      font-size: 18px;
                      font-weight: bold;
                      color: #4CAF50;
                      margin-top: 20px;
                      text-align: center;
                      padding: 10px;
                      border: 2px solid #4CAF50;
                      border-radius: 4px;
                    }
                    .footer {
                      font-size: 12px;
                      color: #777;
                      text-align: center;
                      margin-top: 30px;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h2>Verificación de Cuenta</h2>
                    </div>
                    <div class="content">
                      <p>¡Hola!</p>
                      <p>Gracias por registrarte en nuestra plataforma. Para completar el proceso de verificación de tu cuenta, utiliza el siguiente código:</p>
                      <div class="code">${verificationCode}</div>
                      <p>Este código expira en 2 horas.</p>
                      <p>Si no solicitaste este correo, por favor ignóralo.</p>
                    </div>
                    <div class="footer">
                      <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
                    </div>
                  </div>
                </body>
              </html>`
          };

              
    transporter.sendMail(mailOptions, (error, info)=>{

        if(error){
            return res.json({message: "error enviando el email" } + error);
        }  
    
        console.log("Email enviado " + info)
    
        });
    
        res.json({message: "Paciente registrado porfavor verifica el codigo del email"})



        
    } catch (error) {
        console.log(error)
        res.json({message: "error al registrar paciente"})
        
    }
};


registerPacientesController.verifyCodeEmail = async (req,res) =>{

    const {requireCode} = req.body;
    
    const token = req.cookies.verificationToken;

    try {
        
    
        const decoded = jsonwebtoken.verify(token,config.jsontoken.SECRETO)
        const {correo, verificationCode: storedCode} = decoded;



        if(requireCode !== storedCode){

            return res.json({message: "codigo invalido"})
        }

       
        const paciente = await PacientesModel.findOne({correo});
        paciente.isVerified = true;
        await paciente.save();

        res.clearCookie("verificationToken");

        res.json({message : "Email verificado con exito"})

    } catch (error) {
        
        console.log(error);
        res.json({message: "Error al verificar"})
    };

};


export default registerPacientesController;
