const express = require('express')
const router = express.Router()
const Projects = require('./projects-model')
const {
    validateBody,
    validateId
} = require('./projects-middleware')


router.get('/api/projects', (req, res, next) => {
    Projects.get()
        .then(proj => {
            res.json(proj)
        })
        .catch(err => {
            next(err)
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
            next(err)
        })

})

router.post('/api/projects', validateBody, async (req, res, next) => {
    try {
        const { name, description, completed } = req.body
        const createdProj = await Projects.insert({ name, description, completed })

        if (createdProj) {
            res.status(201).json(createdProj)
        } else {
            res.status(500).json({
                message: "Failed"
            })
        }
    } catch (err) {
        next(err)
    }
})

router.put('/api/projects/:id', validateId, validateBody, (req, res, next) => {
    const changes = req.body
    const { id } = req.params
    Projects.update(id, changes)
        .then(updateProj => {
            if (updateProj) {
                res.status(200).json(updateProj)

            } else {
                res.status(404).json({
                    message: "aaaaaaaaa"
                })
            }
        })
        .catch(next)
})

router.delete('/api/projects/:id', validateId, async (req, res, next) => {
    try {
        const deleted = await Projects.remove(req.params.id)
        res.json(deleted)
    } catch (err) {
        next(err)
    }
})

router.get('/api/projects/:id/actions', validateId, async (req, res, next) => {
    try {
        const projActions = await Projects.getProjectActions(req.params.id)
        res.json(projActions)
    } catch (err) {
        next(err)
    }
})


module.exports = router