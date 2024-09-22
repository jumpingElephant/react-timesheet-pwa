const {execSync} = require('child_process');

try {
    // Bump the version using npm version patch
    const newVersion = execSync('npm version patch', {encoding: 'utf8'}).trim();
    console.log(`New version: ${newVersion}`);

    // Ensure files are added
    execSync('git add package.json package-lock.json');
    console.log('Staged package.json and package-lock.json');

    // Check Git status for debugging
    const statusOutput = execSync('git status', {encoding: 'utf8'});
    console.log(`Git status: ${statusOutput}`);

    // Commit and tag the new version
    execSync(`git commit -m "chore(release): bump to ${newVersion.replace(/^v/, '')}"`);
    console.log('Committed the new version');

    execSync(`git tag ${newVersion}`);
    console.log('Tagged the new version');

    console.log(`Version bumped to ${newVersion}`);
} catch (error) {
    console.error('Failed to bump version:', error);
    process.exit(1);
}