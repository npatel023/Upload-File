import express from 'express'
import cors from 'cors'
import multer from 'multer'

import fileController from './controllers/FileController'

const app = express()
const upload = multer()

app.use(cors())

app.post('/uploadFile', upload.single('file'), fileController.uploadFile)

app.listen(5000, () => console.log('server is running'))