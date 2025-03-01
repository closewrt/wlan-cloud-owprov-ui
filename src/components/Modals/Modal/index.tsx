import * as React from 'react';
import { Modal as ChakraModal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import CloseButton from 'components/Buttons/CloseButton';
import ModalHeader from '../ModalHeader';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  topRightButtons?: React.ReactNode;
  options?: {
    modalSize?: 'sm' | 'md' | 'lg';
  };
  children: React.ReactElement;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const _Modal = ({ isOpen, onClose, title, topRightButtons, options, children }: ModalProps) => {
  const maxWidth = React.useMemo(() => {
    if (options?.modalSize === 'sm') return undefined;
    if (options?.modalSize === 'lg') {
      return { sm: '90%', md: '900px', lg: '1000px', xl: '80%' };
    }

    return { sm: '600px', md: '700px', lg: '800px', xl: '50%' };
  }, []);

  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} size={options?.modalSize === 'sm' ? 'sm' : 'xl'}>
      <ModalOverlay />
      <ModalContent maxWidth={maxWidth}>
        <ModalHeader
          title={title}
          right={
            <>
              {topRightButtons}
              <CloseButton onClick={onClose} />
            </>
          }
        />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export const Modal = React.memo(_Modal);
