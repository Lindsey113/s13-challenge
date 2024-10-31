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

module.exports = router
