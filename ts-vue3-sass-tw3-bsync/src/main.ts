// Styles
import './scss/main.scss'
// Vue
import { createApp } from 'vue';
// Images
require.context('./images', true, /.*/);

// Create vue app
const App = createApp({});

// Autoload vue components globally
const ComponentContext = require.context('./components', true, /\.vue$/i);
ComponentContext.keys().forEach(componentFilePath => {
    const componentName = componentFilePath.split('/').pop().split('.')[0];
    App.component(componentName, ComponentContext(componentFilePath).default);
});

// Mount vue app
App.mount('#app');