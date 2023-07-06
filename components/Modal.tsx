import React, { ReactElement } from "react";
import styled from "styled-components";
import Link from "@components/Link";
import Title, { TitleProps } from "@components/Title";
import { MdClose } from "react-icons/md";

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: ReactElement;
}

const StyledModalBody = styled.div`
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;

const StyledModalTitle = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  font-size: 2rem;
  text-align: left;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 625px;
  height: 600px;
  border-radius: 15px;
  padding: 30px;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const Modal: React.FC<ModalProps> = ({ show, onClose, children, title }) => {
  const handleCloseClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <Link href="#" onClick={handleCloseClick}>
            <MdClose />
          </Link>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  return <div>{modalContent}</div>;
};

export default Modal;
