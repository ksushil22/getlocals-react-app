# Archived Files

This directory contains files from the original React/Webpack setup that have been replaced by Next.js.

## Files Archived

### Entry Points (Replaced by Next.js App Router)
- `src/GetLocalsFrontend.jsx` - Original React entry point (replaced by `app/`)
- `src/GetLocalsFrontend.html` - Original HTML template (replaced by Next.js `app/layout.jsx`)

### Original Webpack Configuration
- `webpack.config.js` - Webpack configuration (Next.js handles this internally)

## Migration Status

✅ **Completed:**
- Next.js App Router setup
- Route migration
- Redux store migration
- Provider setup
- Build configuration

⚠️ **Note:** 
These files are kept for reference during the migration period. They can be safely removed once all components have been fully migrated and tested.

## Cleanup

To remove archived files (after confirming everything works):

```bash
# Remove old entry points
rm src/GetLocalsFrontend.jsx
rm src/GetLocalsFrontend.html

# Remove webpack config (if not needed)
rm webpack.config.js
```

