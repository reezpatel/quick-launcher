import React, { useState } from 'react';
import styled from 'styled-components';
import Config from '../constants/constants';

import placeholder from '../assets/app.svg';
import { Application, MenuConfig } from '../model/models';

const { SEARCH_BAR_HEIGHT } = Config;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  padding: ${SEARCH_BAR_HEIGHT + 20}px 25px 20px;
  overflow: scroll;
`;

interface AppListProps {
  grid: string;
}

const AppList = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p: AppListProps) => p.grid}, 1fr);
  grid-row-gap: 35px;
  grid-column-gap: 15px;
`;

const AppItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

interface AppIconProps {
  size: string;
}

const AppIcon = styled.img`
  height: ${(p: AppIconProps) => p.size}px;
  width: ${(p: AppIconProps) => p.size}px;
`;

const AppLabel = styled.p`
  font-size: 10px;
  margin-top: 5px;
  text-align: center;
  word-break: break-word;
`;

interface AppLauncherProps {
  onSelection: (event: string, app: Application) => void;
  apps: Application[];
  config: MenuConfig;
}

const AppLauncher: (props: AppLauncherProps) => JSX.Element = ({
  onSelection,
  apps,
  config,
}) => {
  const handleApplicationClick = (event, app) => (e) => {
    e.preventDefault();
    onSelection(event, app);
  };

  return (
    <Container>
      <AppList grid={config.grid.split('x')[0]}>
        {apps.map((app) => (
          <AppItem
            key={app.id}
            onClick={handleApplicationClick('open', app)}
            onContextMenu={handleApplicationClick('edit', app)}
          >
            <AppIcon
              size={config.icon}
              src={app.icon || placeholder}
              alt="placeholder"
            />
            {config.label === 'true' && (
              <AppLabel>{app.name || 'Unknown'}</AppLabel>
            )}
          </AppItem>
        ))}
        <AppItem
          key="add-new"
          onClick={handleApplicationClick('edit', null)}
          onContextMenu={handleApplicationClick('edit', null)}
        >
          <AppIcon size={config.icon} src={placeholder} alt="placeholder" />
          {config.label === 'true' && <AppLabel>Add New</AppLabel>}
        </AppItem>
      </AppList>
    </Container>
  );
};

export default AppLauncher;
