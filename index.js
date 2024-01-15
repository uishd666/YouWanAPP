/* eslint-disable prettier/prettier */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import APP from './AppPages/index';
import APTest from './APTest';
import ZZTest from './ZZTest';

AppRegistry.registerComponent(appName, () => APTest);
