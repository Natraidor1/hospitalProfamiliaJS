import express from "express";
import DoctoresRoutes from "./src/routes/Doctores.js"
import doctoresRegisterRoutes from "./src/routes/registerDoctores.js"
import PacientesRoutes from "./src/routes/Pacientes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/Doctores", DoctoresRoutes);
app.use("/api/DoctoresRegister", doctoresRegisterRoutes);
app.use("/api/Pacientes", PacientesRoutes);



export default app;