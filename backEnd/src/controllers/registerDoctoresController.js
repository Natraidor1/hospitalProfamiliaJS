import DoctoresModel from "../models/Doctores.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";

const registerDoctoresController = {};

registerDoctoresController.register = async(req,res) =>{

    const {nombre, especialidad, correo, contraseña} = req.body;

    try {
        const DoctorExist = await DoctoresModel.findOne({correo})

        if(DoctorExist){
            return res.json({message: "el Doctor ya existe"})
        }

        const contrasenahash = await bcrypt.hash(contraseña , 10);

        const nuevoDoctor = new DoctoresModel({nombre, especialidad, correo, contraseña:contrasenahash});
        await nuevoDoctor.save();

        jsonwebtoken.sign(
            {id:nuevoDoctor._id},

            config.jsontoken.SECRETO,

            {expiresIn: config.jsontoken.EXPIRESIN},

            (error, token) =>{
                if (error) console.log(error)
                res.cookie("authToken", token)
                res.json({message: "Doctor"})   
                
            }

        )

    } catch (error) {
        console.log(error)
        res.json({mesage: "error al registrar el doctor"})
    }
};


export default registerDoctoresController;