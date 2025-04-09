import { Schema, model } from "mongoose";

const pacientesSchema = new Schema({
    nombre:{
        type: String,
        require: true
    },
    
    edad:{
        type: Number,
        require: true
    },

    correo:{
        type: String,
        require: true
    },  

    contraseña:{
        type: String,
        require: true
    },

    telefono:{
        type: Number,
        require: true,
    },

    isVerified:{
        type: Boolean,
    }
},

    {
        timestamps: true,
        strict: false
    }
);


export default model("pacientes", pacientesSchema);