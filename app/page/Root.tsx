import React, { useState, useEffect } from 'react';
import AppLauncher from '../containers/AppLauncher';
import Menu from '../containers/Menu';
import Settings from '../containers/Settings';
import { View, Application } from '../model/models';
import Config from '../constants/constants';
import { getIconFor } from '../utils/icon';
import { getApplications } from '../utils/app';
import { getConfig } from '../utils/config';

const Root = () => {
  const [view, setView] = useState<View>('LAUNCHER');
  const [selectedApp, setSelectedApp] = useState<Application>(null);
  const [config, setConfig] = useState(Config.DEFAULT_SETTINGS);
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    setApps(getApplications());
    setConfig({
      ...Config.DEFAULT_SETTINGS,
      ...getConfig(),
    });
  }, []);

  useEffect(() => {
    setApps(getApplications());
  }, [view]);

  const handleOnClose = () => {
    setView('LAUNCHER');
  };

  const onApplicationSelection = (
    event: 'click' | 'edit',
    app: Application
  ) => {
    setSelectedApp(app);
    switch (event) {
      case 'edit': {
        setView('SETTINGS');
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { name, path } = e.dataTransfer.files[0] as {
      name: string;
      path: string;
    };

    const i = name.lastIndexOf('.');
    const appName = name.substring(0, i);

    const icon = await getIconFor(path);

    onApplicationSelection('edit', {
      name: appName,
      path,
      args: '',
      icon,
    });
  };

  const cancelEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={cancelEvent}
      onDragOver={cancelEvent}
      onDragLeave={cancelEvent}
    >
      <Menu
        view={view}
        setView={setView}
        config={config}
        setConfig={setConfig}
        onClose={handleOnClose}
      />
      <AppLauncher
        apps={apps}
        config={config}
        onSelection={onApplicationSelection}
      />
      <Settings app={selectedApp} view={view} onClose={handleOnClose} />
    </div>
  );
};

export default Root;
