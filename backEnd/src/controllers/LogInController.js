import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"
import PacientesModel from "../models/Pacientes.js"
import DoctoresModel from "../models/Doctores.js"

const LoginController = {};


LoginController.login = async(req,res) =>{
    const {correo, contraseña} = req.body;

    try {
        let userFound; 
        let userType;   

        if(correo === config.adminCredentials.USEREMAIL && contraseña === config.adminCredentials.USERPASS){

            userType = "Admin";
            userFound ={_id: "admin"}

        }else{
            userFound = await DoctoresModel.findOne({correo})
            userType = "doctores"

            if(!userFound)  {
                userFound = await PacientesModel.findOne({correo})
                userType = "paciente"
            }
        }

        if(!userFound){
            console.log("el usuario no existe")
            return res.json({message: "usuario no encontrado"})
        }


        //validar la contraseña
        //solo si no es ADMIN

        if(userType !== "Admin"){
            //veamos si la contraseña que estan escribiendo en el login
            //es la misma, que en la base de datos
            const isMatch = await bcryptjs.compare(contraseña, userFound.contraseña)
            if(!isMatch){
                return res.json({message: "contraseña incorrecta"})
            }
        }


        jsonwebtoken.sign(
            //1- que voy a guardar
            {id: userFound._id, userType},

            config.jsontoken.SECRETO,

            {expiresIn: config.jsontoken.EXPIRESIN},

            (error, token) =>{

                if(error) console.log(error)
                
                res.cookie("authToken", token)
                res.json({message : "iniciado de sesion exitoso"})

            }


        )
        
    } catch (error) {
        res.json({message: "error al iniciar sesion"})
    }
};

export default LoginController;