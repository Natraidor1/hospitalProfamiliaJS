import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../config.js";
import PacientesModel from "../models/Pacientes.js"