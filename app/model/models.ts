import { type } from 'os';

type View = 'LAUNCHER' | 'SETTINGS' | 'MENU';

interface Application {
  name: string;
  path: string;
  args: string;
  icon: string;
  id?: string;
}

interface MenuConfig {
  grid: string;
  icon: string;
  label: string;
}

// eslint-disable-next-line import/prefer-default-export
export { View, Application, MenuConfig };
