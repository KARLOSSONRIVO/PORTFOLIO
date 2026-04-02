/**
 * Builds the styled HTML email body sent to the portfolio owner
 * whenever someone submits the contact form.
 *
 * Design: "Crimson Curator" — light background, white card, crimson header gradient,
 * labeled FROM / EMAIL / MESSAGE fields, inset message box, reply button, branded footer.
 *
 * All user-supplied values are HTML-escaped to prevent injection.
 */
export function buildContactEmailHtml(
  name: string,
  email: string,
  message: string
): string {
  const date = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Escape HTML to prevent injection
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio Message Notification</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f3f3;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f3f3;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#7a0019 0%,#DC143C 100%);border-radius:12px 12px 0 0;padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Manrope',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.6);">Portfolio Notification</p>
                    <h1 style="margin:4px 0 0;font-family:'Manrope',Arial,sans-serif;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">KARLOS RIVO</h1>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:999px;padding:6px 14px;font-size:11px;font-weight:600;color:#fff;letter-spacing:0.05em;">New Message</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Card body ── -->
          <tr>
            <td style="background:#ffffff;padding:36px 36px 28px;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

              <h2 style="margin:0 0 6px;font-family:'Manrope',Arial,sans-serif;font-size:24px;font-weight:800;color:#1a1c1c;letter-spacing:-0.02em;">You&rsquo;ve received a new message!</h2>
              <p style="margin:0 0 28px;font-size:14px;color:#888;line-height:1.5;">An inquiry has been submitted through your professional contact portal.</p>

              <!-- FROM + EMAIL row -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="vertical-align:top;padding-right:16px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9e8585;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#1a1c1c;">${esc(name)}</p>
                  </td>
                  <td width="50%" style="vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9e8585;">Email</p>
                    <a href="mailto:${esc(email)}" style="margin:0;font-size:15px;color:#DC143C;text-decoration:none;font-weight:500;">${esc(email)}</a>
                  </td>
                </tr>
              </table>

              <!-- MESSAGE -->
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9e8585;">Message</p>
              <div style="background:#f5f5f5;border-radius:10px;padding:20px 22px;margin-bottom:28px;">
                <p style="margin:0;font-size:15px;line-height:1.75;color:#2d2d2d;white-space:pre-wrap;">${esc(message)}</p>
              </div>

              <!-- Reply button -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:999px;background:linear-gradient(135deg,#9a0020 0%,#DC143C 100%);">
                    <a href="mailto:${esc(email)}?subject=Re: Your message to Karlos Rivo" style="display:inline-block;padding:13px 28px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">Reply to Message &rarr;</a>
                  </td>
                </tr>
              </table>

              <!-- Timestamp -->
              <p style="margin:24px 0 0;font-size:12px;color:#bbb;">Received: ${date}</p>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#ebebeb;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;color:#999;letter-spacing:0.08em;text-transform:uppercase;">Sent via Portfolio Contact Form</p>
              <p style="margin:0;font-size:11px;color:#bbb;">&copy; ${new Date().getFullYear()} Karlos Rivo. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
