import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true
    })
  ],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter({
      fallback: 'index.html',
      pages: 'build',
      assets: 'build'
    })
  }
}

export default config
