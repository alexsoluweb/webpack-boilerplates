// Imports
import { createApp } from 'vue'
import './sass/main.scss'

// Create vue app
const app = createApp({});

// Add vue components globally
const ComponentContext = require.context('./components', true, /\.vue$/i);
ComponentContext.keys().forEach(componentFilePath => {
    const componentName = componentFilePath.split('/').pop().split('.')[0];
    app.component(componentName, ComponentContext(componentFilePath).default);
});

// Vue Plugins


// Mount vue app
app.mount('#app');

// Require all images
require.context('./images', true, /.*/);