const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')

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


module.exports = router
