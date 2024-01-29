// Styles
import '../scss/_admin.scss'

// Import all modules in the folder ./admin
const ComponentContext = require.context('./admin', true, /\.js$/i);
ComponentContext.keys().forEach(componentFilePath => {
	const filename = componentFilePath.split('/').pop().split('.')[0];
	require('./admin/' + filename);
});