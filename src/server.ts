import express from 'express'
import { sequelize } from './database'
import { router } from './routes'
import { adminJs, adminJsRouter } from './adminjs'

const app = express()

app.use(express.static('public'))

app.use(express.json())

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await sequelize.authenticate().then(() => {
        console.log('DB connection successfull.')
    })

    console.log(`Server started successfuly at port ${PORT}.`)
})