import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'

interface Modal {
    title: string,
    isOpen: boolean,
    onClose: () => void,
    body: JSX.Element | string,
    footer?: JSX.Element | string
}

function Modal({
    title,
    onClose,
    isOpen,
    body,
    footer
}: Modal) {
    return (
        <ChakraModal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{body}</ModalBody>
                <ModalFooter>{footer}</ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}

export default Modal