class DocumentFileSizeValidator
{
    private fileSizeInBytes: number
    private maxFileSizeInBytes: number = 20971520

    constructor(fileSize: number) {
        this.fileSizeInBytes = fileSize
    }

    validateFileSize(): boolean {
        return this.fileSizeInBytes <= this.maxFileSizeInBytes
    }

    getErrorMessage(): string {
        return 'Maximum file size accepted is 20MB.'
    }
}

export default DocumentFileSizeValidator