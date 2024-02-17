const express = require('express')
const app = express()
app.use((req, res, next) => {
    console.log("serverForWebTest受到访问")
    next()
})

app.get('/students', (req, res) => {
    const studentsList = [
        { id: 1, name: 'Mike', age: 18 },
        { id: 2, name: 'Tom', age: 19 },
        { id: 3, name: 'Jack', age: 20 },
    ]
    res.send(studentsList)
})

app.listen(5000, (err) => {
    if (!err) {
        console.log("serverForWebTest已经启动")
    }
    else {
        console.error(err)
    }
})