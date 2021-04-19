import { SyntheticEvent, useState } from 'react'

import {
    Box,
    Text,
    Flex,
    Button,
    Input,
    createStandaloneToast
} from '@chakra-ui/react'

import AcceptedFileTypesModal from './AcceptedFileTypesModal'
import { validateFileSize, validateFileType } from '../service/fileValidatorService'
import FileService from '../service/fileService'

function FileUpload() {
    const [isFileTypesModalOpen, setIsFilesTypeModalOpen] = useState<boolean>(false)
    const [uploadFormError, setUploadFormError] = useState<string>('')

    const handleFileUpload = async (element: HTMLInputElement) => {
        const file = element.files

        if (!file) {
            return
        }
        
        const validFileSize = await validateFileSize(file[0].size)
        const validFileType = await validateFileType(FileService.getFileExtension(file[0].name))

        if (!validFileSize.isValid) {
            setUploadFormError(validFileSize.errorMessage)
            return
        }

        if (!validFileType.isValid) {
            setUploadFormError(validFileType.errorMessage)
            return
        }
        
        if (uploadFormError && validFileSize.isValid) {
            setUploadFormError('')
        }

        const fileService = new FileService(file[0])
        const fileUploadResponse = await fileService.uploadFile()

        element.value = ''

        const toast = createStandaloneToast()

        toast({
            title: fileUploadResponse.success ? 'File Uploaded' : 'Upload Failed',
            description: fileUploadResponse.message,
            status: fileUploadResponse.success ? 'success' : 'error',
            duration: 3000,
            isClosable: true
        })
    }

    return (
        <Box
            width="50%"
            m="100px auto"
            padding="2"
            shadow="base"
        >
            <Flex
                direction="column"
                alignItems="center"
                mb="5"
            >
                <Text fontSize="2xl" mb="4">Upload a Document</Text>
                <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => setIsFilesTypeModalOpen(true)}
                >
                    Accepted File Types
                </Button>
                {
                    uploadFormError &&
                    <Text mt="5" color="red">{uploadFormError}</Text>
                }
                <Box
                    mt="10"
                    ml="24"
                >
                    <Input
                        type="file"
                        variant="unstyled"
                        onChange={(e: SyntheticEvent) => handleFileUpload(e.currentTarget as HTMLInputElement)}
                    />
                </Box>
            </Flex>
            <AcceptedFileTypesModal 
                isOpen={isFileTypesModalOpen}
                onClose={() => setIsFilesTypeModalOpen(false)}
            />
        </Box>
    )
}

export default FileUpload