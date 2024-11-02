import { NextResponse } from 'next/server';
import swaggerSpec from '../../../swagger.config';

export async function GET() {
  const swaggerUiHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Swagger UI</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css" />
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.min.js"></script>
      <script>
        const spec = ${JSON.stringify(swaggerSpec)};
        SwaggerUIBundle({
          spec: spec,
          dom_id: '#swagger-ui',
        });
      </script>
    </body>
    </html>
  `;

  return new NextResponse(swaggerUiHTML, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
