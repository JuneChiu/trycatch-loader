# try-catch wrapper loader for webpack

support both es6 and jsx

## install
```
bash npm install --save trycatch-loader
```

## usage
```
module: {
		preLoaders: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components|vender)/,
			loader: 'trycatch'
		}],
		
```

## catchHandler

pass function string to trycatchHandler porperty

```
module.exports = {
	entry: {
		app: path.join(__dirname, '/app/app.jsx'),
		react: ['react']
	},
	trycatchHandler: 'console.error(e);windowsendError(e)',
		
```