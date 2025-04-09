import express from "express";
import pacientesController from "../controllers/pacientesController.js";

const router = express.Router();

router
.route("/")
.get(pacientesController.getPacientes);

router
.route("/:id")
.put(pacientesController.putPacientes)
.delete(pacientesController.deletePacientes);

export default router;