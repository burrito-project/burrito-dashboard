# Despliegue del Dashboard

El dashboard es una simple aplicación de React Vite, por lo que debería
ser fácil de desplegar.

## Cloudflare Pages

Con la ayuda de GitHub Actions, el despliegue está mayormente automatizado.
Asegúrate de tener lo siguiente configurado:

1. **Configurar GitHub Secrets:** Añade tu `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` en los secretos de tu repositorio de GitHub.

2. **Verificar el flujo de trabajo de GitHub Actions:** Asegúrate de que el archivo de flujo de trabajo esté configurado correctamente para construir y desplegar la aplicación. La configuración está en
`.github/workflows/cloudflare-deploy.yml`

Desplegado en <https://burrito-dashboard.pages.dev/>
