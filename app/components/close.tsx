import React from 'react';
import styled from 'styled-components';

import closeIcon from '../assets/close.svg';

const Button = styled.button`
  position: absolute;
  right: 25px;
  top: 25px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: (props: CloseButtonProps) => JSX.Element = ({ onClick }) => {
  return (
    <Button>
      <Icon onClick={onClick} src={closeIcon} alt="Close" />
    </Button>
  );
};

export default CloseButton;
