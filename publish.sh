#!/usr/bin/env bash
set -euo pipefail

# ── Usage ────────────────────────────────────────────────────────────
# Designed to be run by Claude Code.
#
# ./publish.sh <version>
#
# Prerequisites (Claude must do these BEFORE running this script):
#   1. Determine the new version number from the user
#   2. Review git log since the last release to understand what changed
#   3. Update CHANGELOG.md with a "## <version>" section describing changes
#   4. Ensure the working tree is clean (no uncommitted changes besides
#      the CHANGELOG.md edit — the script stages it along with the
#      version bump)
#
# What this script does:
#   1. Validate version argument
#   2. Run tests (abort on failure)
#   3. Bump version in package.json
#   4. Verify CHANGELOG.md has the new version section
#   5. Commit package.json + package-lock.json + CHANGELOG.md
#   6. Build
#   7. Publish to npm
#   8. Git tag (X.Y.Z, not vX.Y.Z) and push
# ─────────────────────────────────────────────────────────────────────

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 0.0.12"
  exit 1
fi

VERSION="$1"

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: version must be in X.Y.Z format (e.g. 0.0.12)"
  exit 1
fi

CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"
echo "New version:     $VERSION"
echo ""

if [[ "$CURRENT_VERSION" == "$VERSION" ]]; then
  echo "Error: new version is the same as the current version ($CURRENT_VERSION)"
  exit 1
fi

# ── 1. Ensure tests pass ────────────────────────────────────────────
echo "==> Running tests..."
npm test
echo ""

# ── 2. Bump version in package.json ─────────────────────────────────
echo "==> Bumping version to $VERSION..."
npm version "$VERSION" --no-git-tag-version
echo ""

# ── 3. Verify CHANGELOG.md ──────────────────────────────────────────
if ! grep -q "## $VERSION" CHANGELOG.md; then
  echo "Error: CHANGELOG.md does not contain a ## $VERSION section."
  echo "Update CHANGELOG.md before running this script."
  exit 1
fi
echo "==> CHANGELOG.md contains ## $VERSION — OK"
echo ""

# ── 4. Commit ────────────────────────────────────────────────────────
echo "==> Committing version bump and changelog..."
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release $VERSION"
echo ""

# ── 5. Build ─────────────────────────────────────────────────────────
echo "==> Building..."
npm run build
echo ""

# ── 6. Publish to npm ────────────────────────────────────────────────
echo "==> Publishing to npm..."
npm publish
echo ""

# ── 7. Tag and push ──────────────────────────────────────────────────
echo "==> Tagging $VERSION and pushing tags..."
git tag "$VERSION"
git push
git push --tags
echo ""

echo "Done! Published nestjs-graphql-swagger-provider@$VERSION"
