import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import defaultIcon from '../assets/code.svg';
import { View, Application } from '../model/models';
import CloseButton from '../components/close';
import { saveApplication, removeApplication } from '../utils/app';

interface ContainerProps {
  offset: string;
}

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  padding: 30px;
  display: flex;
  flex-direction: column;
  left: ${(props: ContainerProps) => props.offset};
  transition: all 0.3s ease-in-out;
`;

const IconContainer = styled.div`
  text-align: center;
`;
const AppIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const Title = styled.input`
  font-weight: 400;
  font-size: 24px;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  margin: 18px 0;
`;

const InputContainer = styled.div`
  margin-bottom: 28px;
`;
const InputLabel = styled.p`
  font-size: 12px;
  color: #818181;
  margin-bottom: 4px;
`;
const Input = styled.input`
  width: 100%;
  font-family: 'Source Code Pro';
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  color: #535353;
  outline-color: #5a5a5a;
`;

const ActionContainer = styled.div`
  text-align: right;
`;

const Button = styled.button`
  margin-left: 10px;
  display: inline-block;
  font-size: 12px;
  padding: 8px 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SaveButton = styled(Button)`
  background-color: #5f63d6;
  color: white;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const getOffset = (view: View) => {
  switch (view) {
    case 'SETTINGS': {
      return '0px';
    }
    default: {
      return '-100vw';
    }
  }
};

interface SettingsProps {
  view: View;
  onClose: () => void;
  app: Application;
}

const Settings: (props: SettingsProps) => JSX.Element = ({
  view,
  onClose,
  app,
}) => {
  const [activeApp, setActiveApp] = useState(app);

  useEffect(() => {
    setActiveApp(app);
  }, [app]);

  const handleSaveButton = () => {
    saveApplication(activeApp);
    onClose();
  };
  const handleDeleteButton = () => {
    removeApplication(activeApp);
    onClose();
  };
  const handleInput = (key) => (e) => {
    setActiveApp({
      ...activeApp,
      [key]: e.target.value,
    });
  };

  return (
    <Container offset={getOffset(view)}>
      <CloseButton onClick={onClose} />
      <IconContainer>
        <AppIcon
          src={activeApp ? activeApp.icon : defaultIcon}
          alt="Default App"
        />
      </IconContainer>
      <Title
        value={activeApp ? activeApp.name : ''}
        onChange={handleInput('name')}
        placeholder="Application Name"
      />

      <InputContainer>
        <InputLabel>Program</InputLabel>
        <Input
          value={activeApp ? activeApp.path : ''}
          onChange={handleInput('path')}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Arguments</InputLabel>
        <Input
          value={activeApp ? activeApp.args : ''}
          onChange={handleInput('args')}
        />
      </InputContainer>
      <Spacer />
      <ActionContainer>
        {activeApp && <Button onClick={handleDeleteButton}>Delete</Button>}
        <SaveButton onClick={handleSaveButton}>Save</SaveButton>
      </ActionContainer>
    </Container>
  );
};

export default Settings;
