import fileIcon from 'file-icon';
import electron from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync, fstat } from 'fs';

const getPath = (id) =>
  join(electron.remote.app.getPath('appData'), `${id}.png`);

const getIconFor = async (path) => {
  const buffer = await fileIcon.buffer(path);
  return `data:image/png;base64,${buffer.toString('base64')}`;
};

const saveIcon = (id: string, data: string) => {
  const buffer = Buffer.from(data, 'base64');
  const path = getPath(id);
  writeFileSync(path, buffer);

  return path;
};

export { getIconFor, saveIcon };
