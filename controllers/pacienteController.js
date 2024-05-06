import Paciente from '../models/Paciente.js'

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteAlmecenado = await paciente.save()
        res.json(pacienteAlmecenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)

    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    const {id} = req.params
    const paciente = await Paciente.findById(id)

    if(!paciente){
        return  res.satatus(404).json({msg: "Mensaje no encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json({msg: 'Accion no valida'})
    }

    res.json(paciente)

}

const actualizarPaciente = async (req, res) => {
    const {id} = req.params
    const paciente = await Paciente.findById(id)
    
    console.log(paciente.veterinario._id)
    console.log(req.veterinario._id)

    if(!paciente){
        return  res.satatus(404).json({msg: "Mensaje no encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json({msg: "Accion no valida"})
    }

    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.date = req.body.date || paciente.date
    paciente.sintomas = req.body.sintomas || paciente.sintomas
    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente = async (req, res) => {
    const {id} = req.params
    const paciente = await Paciente.findById(id)
    
    console.log(paciente.veterinario._id)
    console.log(req.veterinario._id)

    if(!paciente){
        return  res.satatus(404).json({msg: "Mensaje no encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.status(401).json({msg: "Accion no valida"})
    }

    try {
        await paciente.deleteOne()
        res.json({msg: "Paciente eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}