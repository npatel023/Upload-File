import { ChakraProvider } from '@chakra-ui/react' 

import FileUpload from './FileUpload'

function Main() {
    return (
        <ChakraProvider>
            <FileUpload />
        </ChakraProvider>
    )
}

export default Main