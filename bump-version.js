const {execSync} = require('child_process');

try {
    // Bump the version using npm version patch
    const newVersion = execSync('npm version patch', {encoding: 'utf8'}).trim();

    // Add, commit, and tag the new version
    execSync('git add package.json package-lock.json');
    execSync(`git commit -m "chore(release): bump to ${newVersion.replace(/^v/, '')}"`);
    execSync(`git tag ${newVersion}`);

    console.log(`Version bumped to ${newVersion}`);
} catch (error) {
    console.error('Failed to bump version:', error);
    process.exit(1);
}