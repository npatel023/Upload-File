import express from 'express'
import path from 'path'
import { validateFileSize, validateFileType } from '../service/fileValidatorService'
import FileUploadService from '../service/fileUploadService'

let instance: null | FileController = null

class FileController
{
    static getInstance(): FileController {
        if (instance === null) {
            instance = new FileController()
            return instance
        }

        return instance
    }

    async uploadFile(request: express.Request, response: express.Response) {
        try {
            const file = request.file

            const validFileType = await validateFileType(path.extname(file.originalname))
            const validFileSize = await validateFileSize(file.size)

            if (!validFileType.isValid || !validFileSize.isValid) {
                return response.status(400).json({
                    success: false,
                    message: 'Invalid Request'
                })
            }

            const fileUploadService = new FileUploadService(file)
            const fileId = await fileUploadService.createFileUpload()

            if (fileId === 0) {
                return response.status(500).json({
                    success: false,
                    message: 'Error uploading file'
                })
            }

            response.json({
                success: true,
                fileId
            })
        } catch (error) {
            response.json({
                success: false,
                message: 'Error uploading file'
            })
        }
    }
}

export default FileController.getInstance()