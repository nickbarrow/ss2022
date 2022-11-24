import { sveltekit } from '@sveltejs/kit/vite';

function CustomHmr() {
        return {
          name: 'custom-hmr',
          enforce: 'post',
          // HMR
          handleHotUpdate({ file, server }) {
            if (file.endsWith('.css')) {
              console.log('reloading css file...');
      
              server.ws.send({
                type: 'full-reload',          
                path: '*'
              });
            }
          },
        }
    }

/** @type {import('vite').UserConfig} */
const config = {
        plugins: [
                sveltekit(),
                CustomHmr()
        ],
        server: {
                port: 8080
        }
};

export default config;