import express from "express";
import DoctoresRoutes from "./src/routes/Doctores.js"
import doctoresRegisterRoutes from "./src/routes/registerDoctores.js"
import PacientesRoutes from "./src/routes/Pacientes.js";
import registerPacientesRoutes from "./src/routes/registerPacientes.js";
import loginRoute from "./src/routes/logIn.js";
import logOut from "./src/routes/logOut.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/Doctores", DoctoresRoutes);
app.use("/api/DoctoresRegister", doctoresRegisterRoutes);
app.use("/api/Pacientes", PacientesRoutes);
app.use("/api/registerPacientes", registerPacientesRoutes);
app.use("/api/login",loginRoute);
app.use("/api/logOut",logOut);



export default app;