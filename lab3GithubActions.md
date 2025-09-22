# Lab 3 Github Actions : Deploy to GitHub Pages

## Exercise 1

Learn how to automatically deploy a static site to **GitHub Pages** using GitHub Actions.  
 
GitHub Pages allows you to host static websites (HTML, CSS, JavaScript) directly from a GitHub repository.  

## Steps  

### 1. Enable GitHub Pages on your repository  
1. Go to your repo → **Settings** → **Pages**.  
2. Under *Build and deployment*, set **Source** to **GitHub Actions**.  
   (This tells GitHub you’ll use Actions instead of serving a branch like `gh-pages` directly.)  

### 2. Create a static site project (if not already)  
- If you already have a static site (React, Vue, Svelte, Vite, or plain HTML), you can use it.  
- Otherwise, create a simple one.

### 3. Add a build script (for JS frameworks)  
If you’re using React/Vite/Next.js/etc., ensure `package.json` has a build command, e.g.:  

```json
"scripts": {
  "build": "vite build"
}
```

This will output to a `dist/` folder by default.  
If you’re just using plain HTML/CSS, you can skip the build step.  

### 4. Create the GitHub Actions workflow  
Create `.github/workflows/deploy.yml` with the following:  

### 5. Commit & Push  
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### 6. Verify Deployment  
- Go back to **Settings → Pages** in GitHub.  
- A link will appear, usually:  
  ```
  https://YOUR-USERNAME.github.io/YOUR-REPO
  ```
- It may take 1–2 minutes for the site to go live after the workflow finishes.  

## Deliverables 
- A working GitHub repo with:  
  - A static site (`index.html` or framework app).  
  - `.github/workflows/deploy.yml` workflow.  
- A live GitHub Pages site accessible via the provided URL.  

## Exercise 2 Speed Up CI with Caching (Node.js `node_modules`)
 Learn how to use caching in GitHub Actions to speed up workflows by reusing dependencies.  

Every time a workflow runs, GitHub Actions installs dependencies from scratch.  
Caching allows us to **store and reuse `node_modules` or other dependencies** between runs, making builds much faster.  

## Steps

### 1. Start from a Node.js Project  
Make sure your project has a `package.json` and `package-lock.json` (or `yarn.lock`).  

Example:  
```bash
npm init -y
npm install express
```

### 2. Create Workflow with Caching  
Inside `.github/workflows/`, create a new workflow file named `cache.yml`.  
This workflow should:  
- Run on pushes and pull requests to `main`.  
- Use Node.js version 18.  
- Add a caching step to store `node_modules` using the hash of `package-lock.json`.  
- Install dependencies and run tests.  

### 3. Push the Workflow  

### 4. Observe the Effect  
- On the **first run**, dependencies will be installed normally and cached.  
- On **subsequent runs**, the workflow should restore `node_modules` from cache (faster).  
- If `package-lock.json` changes, the cache will be refreshed automatically.  

## Deliverables 
- A Node.js project with a workflow that:  
  - Uses caching for `node_modules`.  