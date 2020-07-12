import React from 'react';
import styled from 'styled-components';

import searchIcon from '../assets/search.svg';
import menuIcon from '../assets/more.svg';
import { View, MenuConfig } from '../model/models';
import Config from '../constants/constants';
import Dropdown from '../components/dropdown';
import CloseButton from '../components/close';
import { storeConfig } from '../utils/config';

const { SEARCH_BAR_HEIGHT } = Config;

interface ContainerProps {
  offset: string;
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh + ${SEARCH_BAR_HEIGHT}px);
  background-color: white;
  top: ${(props: ContainerProps) => props.offset};
  position: absolute;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s ease-in-out;
  z-index: 1;
`;

const SettingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 25px;
  height: ${SEARCH_BAR_HEIGHT}px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SearchFiled = styled.input`
  flex-grow: 1;
  margin: 0 15px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #5a5a5a;
  &::placeholder {
    color: #dedede;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 24px;
  color: #3c3c3c;
  margin-bottom: 18px;
`;

const InputContainer = styled.div`
  margin-bottom: 28px;
`;
const InputLabel = styled.p`
  font-size: 12px;
  color: #818181;
  margin-bottom: 4px;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;

const FooterText = styled.p`
  color: #afafaf;
  letter-spacing: 0.7px;
`;

const FooterLink = styled.a`
  color: 5f63d6;
  margin: 0 12px;
`;

const getTopOffset = (view: View) => {
  switch (view) {
    case 'LAUNCHER': {
      return '-100vh';
    }
    case 'MENU': {
      return '0px';
    }
    case 'SETTINGS': {
      return `calc(-100vh - ${SEARCH_BAR_HEIGHT - 8}px)`;
    }
    default: {
      return '0px';
    }
  }
};

interface MenuProps {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  config: MenuConfig;
  setConfig: React.Dispatch<React.SetStateAction<MenuConfig>>;
  onClose: () => void;
}

const Menu: (props: MenuProps) => JSX.Element = ({
  view,
  setView,
  onClose,
  config,
  setConfig,
}) => {
  const handleMenuClicked = () => {
    setView('MENU');
  };

  const changeConfig = (key) => (value) => {
    const newConfig = {
      ...config,
      [key]: value,
    };
    setConfig(newConfig);
    storeConfig(newConfig);
  };

  return (
    <Container offset={getTopOffset(view)}>
      <CloseButton onClick={onClose} />
      <SettingContainer>
        <Title>Settings</Title>
        <InputContainer>
          <InputLabel>Grid Size</InputLabel>
          <Dropdown
            options={[
              { name: '3x3', value: '3x3' },
              { name: '4x4', value: '4x4' },
              { name: '5x5', value: '5x5' },
            ]}
            value={config.grid}
            onValueChange={changeConfig('grid')}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Icon Size</InputLabel>
          <Dropdown
            options={[
              { name: '35px', value: '35' },
              { name: '40px', value: '40' },
              { name: '45px', value: '45' },
              { name: '50px', value: '50' },
              { name: '55px', value: '55' },
              { name: '60px', value: '60' },
            ]}
            value={config.icon}
            onValueChange={changeConfig('icon')}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Show Label</InputLabel>
          <Dropdown
            options={[
              { name: 'Yes', value: 'true' },
              { name: 'No', value: 'false' },
            ]}
            value={config.label}
            onValueChange={changeConfig('label')}
          />
        </InputContainer>
        <Spacer />
        <Footer>
          <FooterText>Quick Launcher</FooterText>
          <FooterText>
            <FooterLink href="#">Changelog</FooterLink>
            (v 0.0.1)
          </FooterText>
        </Footer>
      </SettingContainer>
      <SearchBar>
        <Icon src={searchIcon} alt="Search Icon" />
        <SearchFiled placeholder="Search for Application" />
        <Icon src={menuIcon} alt="Menu Icon" onClick={handleMenuClicked} />
      </SearchBar>
    </Container>
  );
};

export default Menu;
