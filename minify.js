const UglifyJS = require('uglify-js');
const fs = require('fs');

const file = fs.readFileSync('./bundle.js', "utf-8");
const code = {
    "file.js": file,
};

const result = UglifyJS.minify(code, {
	mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true,
        drop_debugger: true,
        properties: true,
        comparisons: true,
        evaluate: true,
        loops: true,
        hoist_funs: true,
        hoist_vars: true,
        negate_iife: true,
        pure_getters:true,
	}
});

console.log(result);

fs.writeFileSync('bundle.min.js', result.code);