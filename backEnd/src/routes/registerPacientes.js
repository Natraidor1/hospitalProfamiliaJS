import express from "express";
import registerPacientesController from "../controllers/registerPacientesController.js";

const router = express.Router();


router
.route("/").post(registerPacientesController.postPacientes)


export default router;