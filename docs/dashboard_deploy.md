# Dashboard deployment

The dashboard is a simple React Vite application so it should
be straightforward to deploy.

## Cloudflare Pages

With the help of GitHub Actions, the deployment is mostly automated.
Ensure you have the following in place:

1. **Set up GitHub Secrets:** Add your `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your GitHub repository secrets.

2. **Verify the GitHub Actions Workflow:** Ensure the workflow file is properly configured to build and deploy the application. The configuration is in
`.github/workflows/cloudflare-deploy.yml`

Deployed at <https://burrito-dashboard.pages.dev/>
