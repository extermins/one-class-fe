// 커밋 컨벤션은 AGENTS.md 참고
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'style',
        'docs',
        'chore',
        'test',
        'design',
        'rename',
        'remove',
      ],
    ],
    'subject-max-length': [2, 'always', 50],
    // 한글·영문 고유명사(JWT 등) 제목이 대문자 규칙에 걸리지 않도록 끔
    'subject-case': [0],
    // Issue 번호는 커밋이 아니라 PR 본문에 적음
    'references-empty': [2, 'always'],
  },
};

export default commitlintConfig;
