/// <reference types="react" />
/// <reference types="react-dom" />

// Позволяет импортировать SCSS модули без ошибок типов

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
