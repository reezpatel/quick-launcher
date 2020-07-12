import electron from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { MenuConfig } from '../model/models';

const path = join(electron.remote.app.getPath('appData'), 'config-v1.json');

if (!existsSync(path)) {
  writeFileSync(path, '{}');
}

const getConfig = () => {
  return JSON.parse(readFileSync(path).toString('utf-8')) as MenuConfig;
};
const storeConfig = (config: MenuConfig) => {
  writeFileSync(path, JSON.stringify(config));
};

export { getConfig, storeConfig };
