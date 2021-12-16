const express = require('express')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: '77836c7bf2a5450cae1f048c955f9eaf',
    captureUncaught: true,
    captureUnhandledRejections: true
})

let students = [];

app.get('/', (req, res)=>{
    res.sendfile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim();

    students.push(name)

    rollbar.log(`Student added successfully`, {author: "Josh", type: 'manual'})

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, ()=>console.log(`Running on port ${port}`))