const doctoresController = {};

import doctoresModel from "../models/Doctores.js";


doctoresController.getDoctores = async (req, res) =>{
    const doctores = doctoresModel.find();
    res.json({doctores})
};

doctoresController.deleteDoctores = async (req,res)=>{
    await doctoresModel.findByIdAndDelete(req.params.id);
    res.json({message : "doctor eliminado"})

};

doctoresController.updateDoctores = async (req, res) =>{

    const {nombre, especialidad, correo, contraseña} = req.body;
    const updateDoctor = await doctoresModel.findByIdAndUpdate(
        req.params.id,
        {nombre, especialidad, correo, contraseña},
        {new: true}
    );
    res.json({message: "doctor actualizado"});

};

export default doctoresController;