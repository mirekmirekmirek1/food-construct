const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        files: ['lab*/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                fetch: 'readonly',
                localStorage: 'readonly',
                FormData: 'readonly',
                setTimeout: 'readonly'
            }
        }
    },
    {
        files: ['eslint.config.js'],
        languageOptions: {
            sourceType: 'commonjs'
        }
    }
];
