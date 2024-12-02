# Git Binary Search CLI Tool

A platform-independent Command Line Interface (CLI) tool for performing a binary search on Git commits to identify the commit that introduced a bug.

## Table of Contents

-   [Git Binary Search CLI Tool](#git-binary-search-cli-tool)
    -   [Table of Contents](#table-of-contents)
    -   [Introduction](#introduction)
    -   [Features](#features)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
        -   [Global Installation](#global-installation)
        -   [Using npx](#using-npx)
    -   [Usage](#usage)
        -   [Basic Command](#basic-command)
        -   [Options During Binary Search](#options-during-binary-search)
    -   [Examples](#examples)
        -   [Example 1: Specifying Both Good and Bad Commits](#example-1-specifying-both-good-and-bad-commits)
        -   [Example 2: Specifying Only the Good Commit](#example-2-specifying-only-the-good-commit)
        -   [Following the Prompts](#following-the-prompts)
    -   [How It Works](#how-it-works)
    -   [Handling Repository URLs](#handling-repository-urls)
    -   [Contributing](#contributing)
    -   [License](#license)
    -   [Contact](#contact)

---

## Introduction

**Git Binary Search CLI Tool** is a utility that automates the process of finding the specific Git commit that introduced a bug or issue. By leveraging Git's built-in bisect functionality, this tool provides a user-friendly interface for developers to quickly identify problematic commits in their repositories.

---

## Features

-   **Binary Search**: Automates the process of identifying the commit that introduced a bug.
-   **Platform-Independent**: Built with TypeScript and Node.js, it works on Windows, macOS, and Linux.
-   **Simplified Input**: Use single-letter commands (`g`, `b`, `f`) to mark commits during the search.
-   **Commit Links**: Generates a URL to the bad commit in your remote repository (GitHub, GitLab, etc.).

---

## Prerequisites

-   **Git**: Ensure Git is installed and accessible from your command line.
-   **Node.js**: Version 12 or higher is recommended.

---

## Installation

### Global Installation

To install the tool globally so you can use the `git-binary` command from anywhere:

```bash
npm install -g git-binary
```

### Using npx

If you prefer not to install globally, you can use `npx` to run the tool without installation:

```bash
npx git-binary <good_commit_hash> [bad_commit_hash]
```

---

## Usage

### Basic Command

Navigate to your Git repository in the terminal and run:

```bash
git-binary <good_commit_hash> [bad_commit_hash]
```

-   `<good_commit_hash>`: SHA of a known good commit where the bug **does not** exist.
-   `[bad_commit_hash]`: (Optional) SHA of a known bad commit where the bug exists. Defaults to the current `HEAD` if not specified.

### Options During Binary Search

After starting the tool, you'll be prompted to test various commits. For each commit, you can enter:

-   **`g`**: Mark the commit as good (bug not present).
-   **`b`**: Mark the commit as bad (bug present).
-   **`f`**: Indicate that you've found the bad commit and exit.

---

## Examples

### Example 1: Specifying Both Good and Bad Commits

```bash
git-binary abc1234 def5678
```

-   Starts the binary search between commit `abc1234` (good) and `def5678` (bad).

### Example 2: Specifying Only the Good Commit

```bash
git-binary abc1234
```

-   Starts the binary search between commit `abc1234` (good) and the current `HEAD` (bad).

### Following the Prompts

```plaintext
Starting binary search between good commit abc1234 and bad commit def5678

---

Testing commit ghijklm
Options:
[g] Good commit (bug not present)
[b] Bad commit (bug present)
[f] Found bad commit (exit and show info)
Enter your choice [g/b/f]:
```

-   After testing the commit, enter `g`, `b`, or `f` as appropriate.

---

## How It Works

1. **Initialization**: The tool initializes a Git bisect session using the specified good and bad commits.
2. **Iterative Testing**: It checks out different commits provided by Git bisect.
3. **User Input**: After each checkout, you test for the bug and mark the commit accordingly.
4. **Identification**: The process continues until the first bad commit is identified.
5. **Output**: Upon finding the bad commit, the tool outputs the commit SHA and a link to the commit in your remote repository.

---

## Handling Repository URLs

The tool attempts to generate a direct link to the bad commit in your remote repository. It handles various URL formats, including:

-   **HTTPS URLs**: `https://github.com/user/repo.git`
-   **SSH URLs**: `git@github.com:user/repo.git` or `ssh://git@github.com/user/repo.git`

If the repository URL cannot be determined, the tool will notify you.

---

## Contributing

Contributions are welcome! If you'd like to contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix.
3. **Commit your changes** with descriptive messages.
4. **Submit a pull request**.

Please ensure your code adheres to the project's coding standards and passes all tests.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

-   **Author**: _Nuszpl Botond_
-   **GitHub**: [nbotond20](https://github.com/nbotond20)

---

**Happy debugging!**

If you have any questions or need assistance, feel free to open an issue or reach out.

---
