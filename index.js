import express from 'express'
import cors from 'cors'
import conectarDB from './config/db.js'
import veterinariosRauters from './routes/veterinariosRautes.js'
import pacienteRoutes from './routes/pacienteRautes.js'

const app = express()
app.use(express.json())

conectarDB()

const dominiosPermitidos = [process.env.FRONTEND_URL]

// const corsOptions = {
//     origin: function(origin, callback){
//         if(dominiosPermitidos.indexOf(origin) !== -1){
//             // El origen del Request esta permitido
//             callback(null, true)
//         }else{
//             callback(new Error('No permitido por CORS'))
//         }
//     }
// }

app.use(cors({
    origin: 'https://apv-frontend-j7pm15ep0-sebastian-casallas-arias-projects.vercel.app'
  }));

app.use('/api/veterinarios', veterinariosRauters)
app.use('/api/pacientes', pacienteRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})