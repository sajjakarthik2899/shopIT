To tell “Hey Git, when I say origin, I’m referring to this GitHub URL — that’s where I want to push or pull code from.”
git remote add origin https://github.com/sajjakarthik2899/shopIT.git
git add .
git commit -m "Initial push of Shopit-V2 project"
git push -u origin main
git pull origin main


rebase:
git pull origin main --rebase
A--B--C
A--B--D--E (D, E --> local commits)
Git will:
Fetch changes from GitHub
Temporarily remove your commits (D and E).
Add the new commits from GitHub (C).
Re-apply your commits (D and E) on top of C.
so now ill have the changes pulled into mine and the local changes still exist

revert commit:
git reset --soft HEAD~1
✅ This undoes the last commit,
✅ Your changes go back into staged area,
✅ You can now fix the code and re-commit.