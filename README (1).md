# Pulsar Analytics — Netlify Deployment

## Folder structure

```
index.html                  — The dashboard (served as the homepage)
netlify.toml                — Netlify config (routes /trac and /data to functions)
netlify/
  functions/
    trac.js                 — Proxies to trac.pulsarplatform.com/graphql
    data.js                 — Proxies to data.pulsarplatform.com/graphql/trac
```

## Deploy to Netlify (free, ~3 minutes)

### Option A — Drag and drop (no GitHub needed)

1. Go to https://app.netlify.com and sign in
2. From the dashboard click **Add new site → Deploy manually**
3. Drag the entire project folder onto the upload area
4. Netlify deploys instantly — you get a URL like `https://luminous-strudel-abc123.netlify.app`
5. (Optional) Go to **Site settings → Domain management** to set a custom name

### Option B — GitHub (auto-deploys on every update)

1. Push this folder to a GitHub repository
2. Go to https://app.netlify.com → **Add new site → Import an existing project**
3. Connect GitHub and select your repository
4. Leave build settings blank — Netlify reads `netlify.toml` automatically
5. Click **Deploy site**

## Share with clients

Just send them the Netlify URL. They open it, paste their Pulsar API token, and use it.
No installation needed on their end.

## Run locally (for testing)

Install the Netlify CLI once:
```bash
npm install -g netlify-cli
```

Then from this folder:
```bash
netlify dev
```

This runs the functions and serves `index.html` at http://localhost:8888.
