module.exports = {
  '!(lint-staged.config)*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'tsc --noEmit --pretty',
  '*.json': ['prettier --write']
}