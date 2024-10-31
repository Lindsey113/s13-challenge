// add middlewares here related to actions
const express = require('express')
const server = express()
server.use(express.json())
const Actions = require('./actions-model')

function validateBody(req, res, next) {
    try {
        const { project_id, description, notes, completed } = req.body

        if (!project_id || !notes || !description || completed === undefined) {
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
        const actID = await Actions.get(req.params.id)
        if(!actID){
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
    validateId
}