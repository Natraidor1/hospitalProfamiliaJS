import { Schema, model } from "mongoose";

const citasSchema = new Schema({

    fecha:{
        type: Date,
        require: true,
    },
    hora:{
        type: String,
        require: true
    },

    motivo:{
        type: String,
        require: true
    },

    idDoctor:{
        type: Schema.Types.ObjectId,
        ref: "doctores", 
        require: true,
    },

    idPaciente:{
        type: Schema.Types.ObjectId,
        ref: "pacientes", 
        require: true,
    },
},
    {
        timestamps : true,
        strict: false

    }
)

export default model("citas", citasSchema);