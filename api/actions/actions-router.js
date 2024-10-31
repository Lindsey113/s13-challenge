const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')
const {
    validateBody,
    validateId
} = require('./actions-middlware')

router.get('/api/actions', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed"
            })
        })
})

router.get('/api/actions/:id', (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: "Action not found"
                });
            } else {
                res.json(action);
            }
        })
        .catch(err => {
            next(err)
        })

})

router.post('/api/actions', validateBody, async (req, res, next) => {
    try {
        const { 
            project_id, 
            description, 
            notes, 
            completed } = req.body
        const createAction = await Actions.insert({
            project_id, 
            description, 
            notes, 
            completed
        })
        if(createAction){
            res.status(201).json(createAction)
        } else {
            res.status(500).json({
                message: "Failed"
            })
        }
    } catch(err){
        next(err)
    }
})

router.put('/api/actions/:id', validateId, validateBody, (req, res, next) => {
    const changes = req.body
    const { id } = req.params
    Actions.update(id, changes)
        .then(updateAction => {
            if(updateAction){
                res.status(200).json(updateAction)
                
            } else {
                res.status(404).json({
                    message: "aaaaaaaaa"
                })
            }
        })
        .catch(next)
})

router.delete('/api/actions/:id', validateId, async (req, res, next) => {
    try {
        const deleted = await Actions.remove(req.params.id)
        res.json(deleted)
    } catch(err) {
        next(err)
    }
})

module.exports = router
