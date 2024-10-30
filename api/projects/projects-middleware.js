// add middlewares here related to projects
const express = require('express')
const server = express()
server.use(express.json())
const Projects = require('./projects-model')

function validateBody(req, res, next) {
    try {
        const { name, description, completed } = req.body

        if (!name || !description || completed === undefined) {
            return res.status(400).json({
                message: "All fields required"
            })
        }
        next()
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function validateId(req, res, next) {
    try {
        const projID = await Projects.get(req.params.id)
        if(!projID){
           return res.status(404).json({
                message: "No project with that ID"
            })
        } 
        next()
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    validateBody,
    validateId,
}