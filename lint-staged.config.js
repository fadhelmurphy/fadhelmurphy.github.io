/* eslint-disable eol-last */
module.exports = {
  '!(./lint-staged.config)*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts': 'tsc --noEmit --pretty',
  '*.json': ['prettier --write']
}
