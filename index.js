const PORT = process.env.port || 9000
const server = require('./api/server')

server.listen(PORT, () => {
    console.log(`Amazing things happening on localhost:${PORT}`)
})