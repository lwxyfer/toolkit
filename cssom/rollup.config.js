import babel from 'rollup-plugin-babel';
export default {
    entry: 'cssom.js',
    format: 'iife',
    plugins: [babel()],
    moduleName: 'cssom',
    dest: 'bundle.js'
};
