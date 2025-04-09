import { Schema, model } from "mongoose";

const doctoresSchema = new Schema({

    nombre: {
        type: String,
        require: true,
    },

    especialidad:{
        type: String,
        require: true,
    },

    correo:{
        type: String,
        require: true,
    },

    contraseña:{
        type: String,
        require: true,
    },


},
{
    timestamps: true,
    strict: false,
}
);

export default model("doctores", doctoresSchema);