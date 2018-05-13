const variables = {
    lightBlue: '#00A0DB',
    darkBlue: '#362A83',
    violet: '#A01F80',
    magenta: '#E40274',
    red: '#E31E2F',
    orange: '#EC7B23',
    yellow: '#FFE900',
    lightGreen: '#9ABD36',
    green: '#009547',
};
const prefixedVariables = {};
for (const key in variables) {
    prefixedVariables[`--${key}`] = variables[key];
}

module.exports = prefixedVariables;