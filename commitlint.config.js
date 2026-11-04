const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'style', 'test', 'docs', 'chore', 'refactor'],
    ],
    'subject-case': [0],
  },
};

export default commitlintConfig;