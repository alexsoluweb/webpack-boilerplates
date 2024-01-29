// Styles
import '../scss/_frontend.scss'

// Import all modules in the folder ./frontend
const ComponentContext = require.context('./frontend', true, /\.js$/i);
ComponentContext.keys().forEach(componentFilePath => {
    const filename = componentFilePath.split('/').pop().split('.')[0];
    require('./frontend/' + filename);
});