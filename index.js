import 'react-native-gesture-handler';
import React from 'react'
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './src/redux/stores'
import {name as appName} from './app.json';

const Root =() =>(
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
    <App/>
    </PersistGate>
</Provider>
);
AppRegistry.registerComponent('emarketmain', () => Root);
