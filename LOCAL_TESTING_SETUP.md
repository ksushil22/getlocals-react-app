# Local Testing Setup Guide

This guide shows how to test the application using custom local domains like `restaurant-name.localhost`.

## Option 1: Using .localhost Domain (Recommended)

`.localhost` domains automatically resolve to `127.0.0.1` on most modern systems, so no hosts file editing is needed!

### Step 1: Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Step 2: Access Using Custom Domain

Open your browser and navigate to:
```
http://restaurant-name.localhost:3000
```

This will match the dynamic route `/[slug]` where `slug` is `restaurant-name`.

### Examples:

- Business username route: `http://myrestaurant.localhost:3000`
- Template route: `http://067b7d1e-eb92-42e9-9ba0-1021933f6b83.localhost:3000/home`
- Order status: `http://localhost:3000/order-status/12345`
- Admin routes: `http://localhost:3000/business-admin/home`

## Option 2: Configure Hosts File (If .localhost doesn't work)

If `.localhost` doesn't work on your system, you can manually configure the hosts file.

### Windows

1. Open Notepad as Administrator:
   - Search for "Notepad" in Start menu
   - Right-click → "Run as administrator"

2. Open the hosts file:
   - File → Open
   - Navigate to: `C:\Windows\System32\drivers\etc\`
   - Change file filter to "All Files (*.*)"
   - Open `hosts` file

3. Add your custom domains:
   ```
   127.0.0.1    restaurant-name.localhost
   127.0.0.1    myrestaurant.localhost
   127.0.0.1    test-business.localhost
   ```

4. Save the file

5. Clear DNS cache (in Administrator Command Prompt):
   ```powershell
   ipconfig /flushdns
   ```

### Mac/Linux

1. Open terminal

2. Edit hosts file:
   ```bash
   sudo nano /etc/hosts
   ```

3. Add your custom domains:
   ```
   127.0.0.1    restaurant-name.localhost
   127.0.0.1    myrestaurant.localhost
   127.0.0.1    test-business.localhost
   ```

4. Save and exit (Ctrl+X, then Y, then Enter)

5. Clear DNS cache (if needed):
   ```bash
   sudo dscacheutil -flushcache  # Mac
   sudo systemd-resolve --flush-caches  # Linux
   ```

## Testing Different Routes

### 1. Home Page
```
http://localhost:3000
```

### 2. Login/Registration
```
http://localhost:3000/authenticate
http://localhost:3000/authenticate/registration
```

### 3. Business Public Page (via username)
```
http://restaurant-name.localhost:3000
```
This will:
- Match the `/[slug]` route
- Fetch business information using the slug as `businessUsername`
- Redirect to the template route

### 4. Template Routes
```
http://template-id.localhost:3000/home
http://template-id.localhost:3000/menu
```
Replace `template-id` with an actual UUID template ID.

### 5. Order Status
```
http://localhost:3000/order-status/ORDER123
```

### 6. Business Admin (requires authentication)
```
http://localhost:3000/business-admin/home
http://localhost:3000/business-admin/orders
http://localhost:3000/business-admin/menu-items
http://localhost:3000/business-admin/reviews
http://localhost:3000/business-admin/contact-request
http://localhost:3000/business-admin/employee-info
```

## Troubleshooting

### Issue: Domain not resolving

**Solution 1**: Make sure you include the port number:
```
http://restaurant-name.localhost:3000  ✅
http://restaurant-name.localhost      ❌
```

**Solution 2**: Try using `.local` instead:
```
http://restaurant-name.local:3000
```

**Solution 3**: Use localhost with query parameter:
```
http://localhost:3000?business=restaurant-name
```
(Would require code changes to handle this)

### Issue: CORS errors

Make sure your backend API allows requests from `restaurant-name.localhost:3000`. You may need to update CORS settings on your backend.

### Issue: WebSocket connection fails

Update your `.env.local` file to use the custom domain:
```env
WS_URL=ws://restaurant-name.localhost:8080/ws
NEXT_PUBLIC_WS_URL=ws://restaurant-name.localhost:8080/ws
```

### Issue: API calls failing

Ensure your API base URL in `.env.local` is correctly configured:
```env
BASE_API_URL=http://localhost:8080/api/
NEXT_PUBLIC_BASE_API_URL=http://localhost:8080/api/
```

Or if your API is on the same custom domain:
```env
BASE_API_URL=http://restaurant-name.localhost:8080/api/
NEXT_PUBLIC_BASE_API_URL=http://restaurant-name.localhost:8080/api/
```

## Quick Test Script

You can use this PowerShell script (Windows) to quickly add test domains:

```powershell
# Run as Administrator
$hostsPath = "$env:windir\System32\drivers\etc\hosts"
$domains = @(
    "restaurant-name.localhost",
    "myrestaurant.localhost",
    "test-business.localhost"
)

foreach ($domain in $domains) {
    $entry = "127.0.0.1    $domain"
    if (Select-String -Path $hostsPath -Pattern $domain -Quiet) {
        Write-Host "$domain already exists in hosts file"
    } else {
        Add-Content -Path $hostsPath -Value $entry
        Write-Host "Added $domain to hosts file"
    }
}

ipconfig /flushdns
Write-Host "DNS cache flushed"
```

## Browser Testing

### Recommended Browsers for Testing
- Chrome/Edge
- Firefox
- Safari

### Browser Extensions (Optional)
- **Host Switch Plus** (Chrome) - Easily switch between host configurations
- **Host Admin** (Firefox) - Manage local hosts

## Example Testing Scenario

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test business route:**
   ```
   http://myrestaurant.localhost:3000
   ```

3. **Expected behavior:**
   - Page shows loading spinner
   - Fetches business info using "myrestaurant" as username
   - Redirects to template route: `/template-id/home`

4. **Test template route directly:**
   ```
   http://template-id.localhost:3000/home
   ```

## Production-Like Testing

For more production-like testing, you can use tools like:
- **ngrok** - Create public tunnels to your localhost
- **localtest.me** - Free wildcard DNS for local development
- **xip.io** - Wildcard DNS for any IP address

Example with xip.io:
```
http://restaurant-name.127.0.0.1.xip.io:3000
```

---

**Note**: The `.localhost` TLD is reserved and automatically resolves to `127.0.0.1` on most modern operating systems, so you typically don't need to edit the hosts file.

