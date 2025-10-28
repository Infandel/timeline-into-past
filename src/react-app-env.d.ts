/// <reference types="react" />
/// <reference types="react-dom" />

// Letting you import SCSS modules without any Typescript errors

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
