// Styles
import '../scss/_elementor.scss'

// Import all modules in the folder ./gutenberg
const ComponentContext = require.context('./gutenberg', true, /\.js$/i);
ComponentContext.keys().forEach(componentFilePath => {
	const filename = componentFilePath.split('/').pop().split('.')[0];
	require('./gutenberg/' + filename);
});