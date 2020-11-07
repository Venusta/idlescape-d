module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
	  node: true,
	  es6: true,
	},
	extends: [
	  "airbnb-typescript",
	  "plugin:@typescript-eslint/recommended",
	  "plugin:@typescript-eslint/recommended-requiring-type-checking"
	],
	parserOptions: {
	  project: './tsconfig.json',
	},
	plugins: [
	  '@typescript-eslint',
	],
	rules: {
	  "@typescript-eslint/lines-between-class-members": "off",
	  "@typescript-eslint/quotes": [
		"error",
		"double"
	  ],
	  "quotes": [
		"error",
		"double",
	  ],
	  "linebreak-style": [
		"error",
		"windows",
	  ],
	  "arrow-body-style": "warn",
	  "lines-between-class-members": "off",
	  "no-console": "off",
	  "import/prefer-default-export": "off"  
	},
};