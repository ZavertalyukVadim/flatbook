const OFF = 0;
const WARNING = 1;
const ERROR = 2;
module.exports = {
    parser: 'babel-eslint',
    extends: './node_modules/fbjs-scripts/eslint/.eslintrc.js',
    plugins: [
        'react'
    ],
    ecmaFeatures: {
        modules: false
    },
    // We're stricter than the default config, mostly. We'll override a few rules
    // and then enable some React specific ones.
    rules: {
        'accessor-pairs': OFF,
        'brace-style': [ERROR, '1tbs'],
        'comma-dangle': [ERROR, 'never'],
        'consistent-return': ERROR,
        'dot-location': [ERROR, 'property'],
        'dot-notation': ERROR,
        'eol-last': ERROR,
        'eqeqeq': [ERROR, 'allow-null'],
        'indent': [ERROR, 4, {SwitchCase: 1}],
        'jsx-quotes': [ERROR, 'prefer-double'],
        'no-bitwise': OFF,
        'no-inner-declarations': [ERROR, 'functions'],
        'no-multi-spaces': ERROR,
        'no-restricted-syntax': [ERROR, 'WithStatement'],
        'no-shadow': ERROR,
        'no-unused-expressions': ERROR,
        'no-unused-vars': [ERROR, {args: 'none'}],
        'quotes': [ERROR, 'single', 'avoid-escape'],
        'keyword-spacing': ERROR,
        'space-before-blocks': ERROR,
        'space-before-function-paren': [ERROR, {anonymous: 'always', named: 'never'}],
        'strict': [ERROR, 'global'],
        "radix": OFF,
        "no-console": ERROR,
        // React & JSX
        // Our transforms set this automatically
        'react/display-name': OFF,
        'react/jsx-boolean-value': [ERROR, 'always'],
        'react/jsx-no-undef': ERROR,
        // We don't care to do this
        'react/jsx-sort-prop-types': OFF,
        'react/jsx-sort-props': OFF,
        'react/jsx-uses-react': ERROR,
        'react/jsx-uses-vars': ERROR,
        // It's easier to test some things this way
        'react/no-did-mount-set-state': OFF,
        'react/no-did-update-set-state': OFF,
        // We define multiple components in test files
        'react/no-multi-comp': OFF,
        'react/no-unknown-property': OFF,
        // This isn't useful in our test code
        'react/prop-types': OFF,
        'react/react-in-jsx-scope': ERROR,
        'react/self-closing-comp': ERROR,
        // We don't care to do this
        'react/sort-comp': [WARNING, {
            order: [
                'type-annotations',
                'static-methods',
                'lifecycle',
                'everything-else',
                'render'
            ]
        }],
        'react/jsx-closing-bracket-location': WARNING,
        'react/prefer-es6-class': ERROR,
        'react/jsx-pascal-case': ERROR,
        'react/jsx-curly-spacing': WARNING,
        'react/no-is-mounted': ERROR,
        'react/jsx-wrap-multilines': [ERROR, {declaration: false, assignment: false}]
    }
};