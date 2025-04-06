/* eslint-disable eol-last */
module.exports = {
  // Trigger cleanup command kalau ada file tertentu diubah
  '**/*': () => {
    const { execSync } = require('child_process');

    try {
      execSync('rm -rf .cache dist');
      console.log('🔥 Removed .cache and dist');
    } catch (err) {
      console.error('Failed to remove folders/files:', err);
    }

    return [];
  },
  '**/*.{js,jsx,ts,tsx}': (files) => {
  const filtered = files.filter(file => !file.includes('public/') && !file.includes('src/env.d.ts'));
  console.log('✨ Files to lint:', filtered);
  if (filtered.length === 0) return [];
  return filtered.map(file => `eslint --fix "${file}"`);
},
  '**/*.ts': 'tsc --noEmit --pretty',
  '*.json': ['prettier --write']
}