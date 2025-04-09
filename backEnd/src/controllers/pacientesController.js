import Modelopacientes from "../models/Pacientes.js";

const pacientesController = {}


pacientesController.getPacientes = async(req, res) =>{
    const pacientes = await Modelopacientes.find();
    res.json({pacientes})
}


pacientesController.putPacientes = async (req, res)=>{
    const {nombre, edad, correo, contraseña, telefono, isVerified} = req.body;

    const update = await Modelopacientes.findByIdAndUpdate(
        req.params.id,

        {
            nombre, 
            edad, 
            correo, 
            contraseña, 
            telefono, 
            isVerified 
        },
        {new: true}
    );

    res.json({message: "paciente actualizado"})
};

pacientesController.deletePacientes = async (req, res) =>{
    await Modelopacientes.findByIdAndDelete(req.params.id);
    res.json({message: "paciente eliminado"});
};

export default pacientesController;