// `core-js` and `regenerator-runtime` would've been imported here
// in case of using `useBuiltIns: 'entry'` option of `@babel/preset-env`
// https://stackoverflow.com/questions/52625979/confused-about-usebuiltins-option-of-babel-preset-env-using-browserslist-integ
// https://babeljs.io/docs/en/babel-preset-env
//
// When using `useBuiltIns: 'auto'`, importing `core-js` and `regenerator-runtime`
// explicitly is not required, and Babel adds those automatically.
//
// // ES6 polyfill.
// import 'core-js/stable'
// // `async/await` support.
// import 'regenerator-runtime/runtime'

// Maintain CSS styles order.
import './styles/style.css'

// Run the application.
import render from './render.js'

render().catch((error) => console.error(error))