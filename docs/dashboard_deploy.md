# Deployment of the dashboard

## 1. Select a Deployment Platform

Choose a platform that best fits your needs for deploying the dashboard,
ensuring it aligns with your performance, scalability, and budget requirements.

## 2. Set Up CI/CD

To streamline development, implement a Continuous Integration/Continuous Deployment (CI/CD) pipeline. This will automate testing and deployment,
allowing you to focus on building features and improving the dashboard without manual deployment steps.

## 3. Or... just deploy on Cloudflare

With the help of GitHub Actions, the deployment is mostly automated. Ensure you have the following in place:

1. **Set up GitHub Secrets:** Add your `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your GitHub repository secrets.
2. **Verify the GitHub Actions Workflow:** Ensure the workflow file is properly configured to build and deploy the application. The configuration is in
`/dashboard/.github/workflows/cloudflare-deploy.yml`
