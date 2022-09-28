require.context('./images', true, /.*/);
import $ from 'jquery';
import { createApp,  } from 'vue'
const ComponentContext = require.context('./components', true, /\.vue$/i);

// Create vue app
const app = createApp({});

// Add components globally
ComponentContext.keys().forEach(componentFilePath => {
    const componentName = componentFilePath.split('/').pop().split('.')[0];
    app.component(componentName, ComponentContext(componentFilePath).default);
});

// Mount vue app
app.mount('#app');
