import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import fileRepo from '../repository/FileRepo'

class FileUploadService
{
    private file: Express.Multer.File

    constructor(file: Express.Multer.File) {
        this.file = file
    }

    private getFileExtension(): string {
        return path.extname(this.file.originalname)
    }

    async createFileUpload(): Promise<number> {
        const uniqueFileName = this.createUniqueFileName()
        const fileId = await this.createFileRecord(uniqueFileName)
        
        this.writeToFileStream(uniqueFileName)

        return fileId
    }

    private createUniqueFileName(): string {
        const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, "")
        return `${uuidv4()}_${timeStamp}${this.getFileExtension()}`
    }

    private async createFileRecord(uniqueFileName: string): Promise<number> {
        return await fileRepo.createFileRecord({
            originalFileName: this.file.originalname,
            uniqueFileName,
            fileSize: this.file.size,
            fileExtension: this.getFileExtension(),
        })
    }

    private writeToFileStream(uniqueFileName: string) {
        const fileStream = fs.createWriteStream(`${__dirname}/../img/${uniqueFileName}`)

        fileStream.write(this.file.buffer, 'base64')

        fileStream.on('error', () => {
            console.log('error occurred while writing to stream')
        })
        
        fileStream.end()
    }
}

export default FileUploadService