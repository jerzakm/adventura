import App from './App.svelte';
import './styles/main.scss'
// import '../node_modules/mapbox-gl/dist/mapbox-gl.css'

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;