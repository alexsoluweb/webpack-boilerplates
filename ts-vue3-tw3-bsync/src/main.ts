// Misc
import './sass/style.scss'
// Vue
import { createApp } from 'vue';

// Create vue app
const app = createApp({});

// Add vue components globally
const ComponentContext = require.context('./components', true, /\.vue$/i);
ComponentContext.keys().forEach(componentFilePath => {
    const componentName = componentFilePath.split('/').pop().split('.')[0];
    app.component(componentName, ComponentContext(componentFilePath).default);
});

// Mount vue app
app.mount('#app');

// Require all images
require.context('./images', true, /.*/);