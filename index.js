/**
 * @format
 */

import '@/utils/extensions';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
