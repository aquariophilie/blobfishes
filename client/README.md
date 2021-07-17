## blobfish frontend

This is frontend is created using [Svelte Kit](https://kit.svelte.dev/)

---

# Note about the development of this project

In next paragraphs some of my personals annotation taken during the development process.I found these annotations will be very usefull for next developments.

## Tailwind CSS

In this project I used the Tailwind CSS (https://tailwindcss.com/) framework.

__Installation__

You need to install following dev dependences:
- tailwindcss
- postcss
- postcss-load-config
- cssnano
- svelte-preprocess
- autoprefixer

```
npm install tailwindcss postcss postcss-load-config cssnano svelte-preprocess autoprefixer --save-dev
```

__Create tailwind.config.cjs__

To create this configuration file use the following command:
```
npx tailwindcss init tailwind.config.cjs
```
this create a default Tailwind configuration file.

__Configure the preprocessor__

Configure the preprocessor by modifying the `svelte.config.js` file, located in the project root, to use `postcss` processing.

```js
import preprocess from 'svelte-preprocess';
...
const config = {
  	preprocess: [
		preprocess({
			postcss: true
		}),
	],
  ...
}

export default config;
```

__Create the PostCss configuration file__

Create the file `postcss.config.cjs`

```js
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: [
		// Some plugins, like postcss-nested, need to run before Tailwind
		tailwindcss,
		// But others, like autoprefixer, need to run after
		autoprefixer,
		
		!dev && cssnano({
			preset: "default",
		}),
	],
};
```
__Include Tailwind in your CSS__

You need to include in a way of your choise this part of code in the main css file

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

In this project I created a `tailwind.css` file in the root od src folder with above code.

Then I included this file in the \<script\> of the `__layout.svelte` file.

```html
<script>
  import '../tailwind.css';
</script>
```

EOF