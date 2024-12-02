"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const readline_1 = __importDefault(require("readline"));
function gitCommand(command) {
    try {
        return (0, child_process_1.execSync)(`git ${command}`, { encoding: 'utf8' }).trim();
    }
    catch (error) {
        console.error(`Error executing git ${command}: ${error.message}`);
        process.exit(1);
    }
}
try {
    gitCommand('rev-parse --is-inside-work-tree');
}
catch (_a) {
    console.error('Error: Not inside a git repository.');
    process.exit(1);
}
const args = process.argv.slice(2);
if (args.length === 0 || args.length > 2) {
    console.error('Usage: git-binary <good_commit_hash> [bad_commit_hash]');
    process.exit(1);
}
const GOOD_COMMIT = args[0];
let BAD_COMMIT = args[1];
if (!BAD_COMMIT) {
    BAD_COMMIT = gitCommand('rev-parse HEAD');
}
try {
    gitCommand(`cat-file -e ${GOOD_COMMIT}^{commit}`);
}
catch (_b) {
    console.error(`Error: Good commit '${GOOD_COMMIT}' does not exist.`);
    process.exit(1);
}
try {
    gitCommand(`cat-file -e ${BAD_COMMIT}^{commit}`);
}
catch (_c) {
    console.error(`Error: Bad commit '${BAD_COMMIT}' does not exist.`);
    process.exit(1);
}
console.log(`Starting binary search between good commit ${GOOD_COMMIT} and bad commit ${BAD_COMMIT}`);
gitCommand('bisect start');
gitCommand(`bisect bad ${BAD_COMMIT}`);
gitCommand(`bisect good ${GOOD_COMMIT}`);
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function promptUser() {
    const CURRENT_COMMIT = gitCommand('rev-parse HEAD');
    console.log('--------------------------------------------------');
    console.log(`Testing commit ${CURRENT_COMMIT}`);
    console.log('Options:');
    console.log('  [g] Good commit (bug not present)');
    console.log('  [b] Bad commit (bug present)');
    console.log('  [f] Found bad commit (exit and show info)');
    rl.question('Enter your choice [g/b/f]: ', (answer) => {
        const RESULT = answer.trim();
        if (RESULT === 'g') {
            gitCommand('bisect good');
        }
        else if (RESULT === 'b') {
            gitCommand('bisect bad');
        }
        else if (RESULT === 'f') {
            console.log("You have indicated that you've found the bad commit.");
            console.log(`Bad commit: ${CURRENT_COMMIT}`);
            try {
                let REPO_URL = gitCommand('remote get-url origin');
                REPO_URL = REPO_URL.replace(/\.git$/, '').replace(/^git:/, 'https:').replace(/^ssh:\/\/git@/, 'https://');
                console.log(`Commit link: ${REPO_URL}/commit/${CURRENT_COMMIT}`);
            }
            catch (_a) {
                console.log('Could not determine repository URL.');
            }
            gitCommand('bisect reset');
            rl.close();
            process.exit(0);
        }
        else {
            console.log("Invalid input. Please enter 'g' for good, 'b' for bad, or 'f' to indicate you've found the bad commit.");
            promptUser();
            return;
        }
        const bisectLog = gitCommand('bisect log');
        if (bisectLog.includes('first bad commit')) {
            const BAD_COMMIT_FOUND = gitCommand('rev-parse HEAD');
            console.log(`First bad commit identified: ${BAD_COMMIT_FOUND}`);
            try {
                let REPO_URL = gitCommand('remote get-url origin');
                REPO_URL = REPO_URL.replace(/\.git$/, '').replace(/^git:/, 'https:').replace(/^ssh:\/\/git@/, 'https://');
                console.log(`Commit link: ${REPO_URL}/commit/${BAD_COMMIT_FOUND}`);
            }
            catch (_b) {
                console.log('Could not determine repository URL.');
            }
            gitCommand('bisect reset');
            rl.close();
            process.exit(0);
        }
        else {
            promptUser();
        }
    });
}
promptUser();
