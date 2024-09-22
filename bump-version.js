const {execSync} = require('child_process');

try {
    // Bump the version using npm version patch with a custom commit message
    const newVersion = execSync('npm version patch --message "Bump version to %s\n\nskip-checks: true"', {encoding: 'utf8'}).trim();
    console.log(`New version: ${newVersion}`);

    // Git status for debugging
    const statusOutput = execSync('git status', {encoding: 'utf8'});
    console.log(`Git status: ${statusOutput}`);

    console.log(`Version bumped to ${newVersion}`);
} catch (error) {
    console.error('Failed to bump version:', error);
    process.exit(1);
}