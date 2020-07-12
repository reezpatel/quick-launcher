import { v4 as uuidv4 } from 'uuid';
import electron from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { Application } from '../model/models';
import { saveIcon } from './icon';

const path = join(electron.remote.app.getPath('appData'), 'apps-v1.json');

if (!existsSync(path)) {
  writeFileSync(path, '[]');
}

const getApplications = () => {
  return JSON.parse(
    readFileSync(path).toString('utf-8') || '[]'
  ) as Application[];
};

const saveApplication = (app: Application) => {
  const apps = getApplications();
  const index = apps.findIndex((a) => a.id === app.id);
  const prefix = 'data:image/png;base64,';

  const isNewApp = !app.id || index === -1;

  if (isNewApp) {
    app.id = uuidv4();
  }

  if (app.icon.startsWith(prefix)) {
    app.icon = saveIcon(app.id, app.icon.substr(prefix.length));
  }

  if (isNewApp) {
    apps.push(app);
  } else {
    apps[index] = app;
  }

  writeFileSync(path, JSON.stringify(apps));
};

const removeApplication = (app: Application) => {
  const apps = getApplications();
  const index = apps.findIndex((a) => a.id === app.id);

  apps.splice(index);

  writeFileSync(path, JSON.stringify(apps));
};

export { getApplications, saveApplication, removeApplication };
