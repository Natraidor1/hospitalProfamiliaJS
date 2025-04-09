import dotenv from "dotenv";    

dotenv.config();

export const config = {
    db:{
        URI: process.env.DB_URI
    },

    server:{
        PORT: process.env.PORT
    },

    jsontoken:{
        SECRETO: process.env.SECRET,
        EXPIRESIN: process.env.EXPIRESIN
    },

    email:{
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS
    },

    adminCredentials:{

        USEREMAIL: process.env.ADMIN_EMAIL,
        USERPASS: process.env.ADMIN_PASSWORD
    },

};