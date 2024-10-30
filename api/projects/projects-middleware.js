// add middlewares here related to projects
const express = require('express')
const server = express()
server.use(express.json())

function validateBody(req, res, next){
    try {
        const {name, description, completed} = req.body
        const {id} = req.params
  
        if(!name || !description || !completed){
         return res.status(400).json({
              message: "All fields required"
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
}