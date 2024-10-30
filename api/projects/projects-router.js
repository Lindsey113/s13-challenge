const express = require('express')
const router = express.Router()
const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')


router.get('/api/projects', (req, res, next) => {
    Projects.get()
        .then(proj => {
            console.log(proj)
            res.json(proj)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
})

router.get('/api/projects/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: "Project not found"
                });
            } else {
                res.json(project);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving project",
                error: err.message
            });
        })

})



module.exports = router