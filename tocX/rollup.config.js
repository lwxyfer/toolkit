import babel from 'rollup-plugin-babel';
export default {
    entry: './src/toc.es6.js',
    format: 'iife',
    plugins: [babel()],
    moduleName: 'tocx',
    dest: 'bundle.js'
};
