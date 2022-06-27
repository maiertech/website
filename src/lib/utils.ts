export function createFrame({
  id,
  body,
  script,
}: {
  id: string;
  body: string;
  script: string;
}) {
  // Any error message that occurs in this frame is
  const html = `
    <!DOCTYPE html />
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        ${body}
      </body>
      <script>
        window.onerror = function(message) {
          window.parent.postMessage({
            source: "${id}",
            type: "error",
            message
          }, "*");
        }
      </script>
      <script type="module">${script}</script>    
    </html>
  `;
  return html;
}
