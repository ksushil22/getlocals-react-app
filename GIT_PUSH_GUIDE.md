# Git Push Troubleshooting Guide

This guide helps resolve common issues when pushing changes to GitHub.

## Current Status

**Branch**: `migrate-to-nextjs`  
**Remote**: `origin` → `https://github.com/Get-Locals/getlocals-react-app.git`

## Common Issues & Solutions

### Issue 1: Uncommitted Changes

If you have uncommitted changes, you need to commit them first:

```bash
# Check what files are changed
git status

# Add all changes
git add .

# Commit the changes
git commit -m "Complete Next.js migration - Phase 8"

# Push to remote
git push origin migrate-to-nextjs
```

### Issue 2: Branch Doesn't Exist on Remote

If the branch doesn't exist on remote, use:

```bash
git push -u origin migrate-to-nextjs
```

The `-u` flag sets up tracking between your local and remote branch.

### Issue 3: Large Files or Unwanted Files

If you have large files (like node_modules, .next, etc.), ensure they're in `.gitignore`:

```bash
# Check .gitignore includes these:
# - node_modules/
# - .next/
# - dist/
# - .env.local

# Remove accidentally added files
git rm -r --cached node_modules/
git rm -r --cached .next/
git rm --cached .env.local

# Commit the removal
git commit -m "Remove ignored files from git"

# Push
git push origin migrate-to-nextjs
```

### Issue 4: Authentication Issues

If you get authentication errors:

**Option A: Use HTTPS with Personal Access Token**
1. Generate a token: GitHub → Settings → Developer settings → Personal access tokens
2. Use token as password when pushing

**Option B: Use SSH instead**
```bash
# Change remote to SSH
git remote set-url origin git@github.com:Get-Locals/getlocals-react-app.git

# Push
git push origin migrate-to-nextjs
```

### Issue 5: Remote Branch Has New Commits

If the remote branch has changes you don't have locally:

```bash
# Fetch latest changes
git fetch origin

# Rebase your changes on top of remote
git rebase origin/migrate-to-nextjs

# Or merge
git pull origin migrate-to-nextjs

# Then push
git push origin migrate-to-nextjs
```

### Issue 6: Force Push (Use with Caution)

⚠️ **Warning**: Only use if you're sure you want to overwrite remote changes.

```bash
git push -f origin migrate-to-nextjs
```

## Recommended Push Steps

### Step 1: Prepare Your Changes

```bash
# Ensure .gitignore is up to date
# Check git status
git status
```

### Step 2: Stage and Commit

```bash
# Add all changes
git add .

# Or add specific files
git add app/ lib/ components/ *.md

# Commit with descriptive message
git commit -m "feat: Complete Next.js migration

- Migrated all routes to Next.js App Router
- Set up Redux with SSR compatibility
- Added comprehensive documentation
- Fixed build configuration
- Completed Phase 8 testing and cleanup"
```

### Step 3: Push to Remote

```bash
# Push to remote branch (first time)
git push -u origin migrate-to-nextjs

# Or if branch already exists
git push origin migrate-to-nextjs
```

## Quick Fix Script

Run this PowerShell script to diagnose and fix common issues:

```powershell
Write-Host "Git Push Diagnostic" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host ""

# Check status
Write-Host "1. Checking git status..." -ForegroundColor Yellow
git status --short

# Check if branch exists on remote
Write-Host "`n2. Checking remote branches..." -ForegroundColor Yellow
git branch -r | Select-String "migrate-to-nextjs"

# Check for large files
Write-Host "`n3. Checking for large files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.Length -gt 5MB -and $_.FullName -notmatch "node_modules|\.next" } | 
    Select-Object -First 5 FullName, @{N="SizeMB";E={[math]::Round($_.Length/1MB,2)}}

Write-Host "`n4. Ready to push?" -ForegroundColor Green
Write-Host "   Run: git push -u origin migrate-to-nextjs" -ForegroundColor White
```

## Files That Should NOT Be Committed

Make sure these are in `.gitignore`:
- ✅ `node_modules/`
- ✅ `.next/`
- ✅ `dist/`
- ✅ `.env.local`
- ✅ `.env*.local`
- ✅ `package-lock.json` (optional, check team preference)
- ✅ `archive/` (if you want to exclude it)

## Files That SHOULD Be Committed

- ✅ All source code (`app/`, `src/`, `lib/`)
- ✅ Configuration files (`next.config.js`, `package.json`, `jsconfig.json`)
- ✅ Documentation (`*.md` files)
- ✅ `.gitignore`
- ✅ Public assets (`public/`)

## Next Steps

1. **Review your changes:**
   ```bash
   git status
   git diff
   ```

2. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

3. **Push to remote:**
   ```bash
   git push -u origin migrate-to-nextjs
   ```

4. **Create Pull Request:**
   - Go to GitHub repository
   - Create PR from `migrate-to-nextjs` to `master`
   - Review and merge when ready

## Still Having Issues?

If you're still unable to push, share the exact error message and we can troubleshoot further.

Common error messages:
- "Permission denied" → Authentication issue
- "Updates were rejected" → Need to pull first
- "File too large" → Need to remove from git
- "Branch does not exist" → Use `-u` flag

