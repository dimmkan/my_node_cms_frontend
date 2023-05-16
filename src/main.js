import { createApp } from 'vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import App from './App.vue'

const app = createApp(App);
app.use(WaveUI, {
  theme: 'light',
  css: {
    grid: 24
  }
});
app.config.compilerOptions.whitespace = 'preserve';
app.mount('#app');
