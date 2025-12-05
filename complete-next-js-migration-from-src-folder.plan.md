# Complete Next.js Migration Plan - Verified & Enhanced

## Overview
Migrate all code from `src/` folder to Next.js conventions, consolidating with existing `lib/` and `components/` folders, and converting React SPA patterns to Next.js patterns. This plan includes build verification after each phase to ensure stability.

## Pre-Migration Verification
- [x] Assets already exist in `public/img/` - no move needed, just verify references
- [x] Fonts already in `public/fonts/` - remove duplicate `src/fonts/`
- [x] `lib/redux/` uses `next-redux-wrapper` (correct for Next.js)
- [x] `src/redux/` is a duplicate (needs consolidation)
- [x] Many components import from `src/redux/` via relative paths (need updating)

## Migration Strategy

### Phase 1: Folder Structure Reorganization

#### 1.1 Move Components to Root `components/` Directory
- Move `src/components/` → `components/` (merge with existing `components/client/`)
- Structure: `components/` will contain all reusable components
- **Action**: Copy all subdirectories from `src/components/` to `components/`
- **Note**: Keep `components/client/` structure intact

#### 1.2 Update jsconfig.json Path Aliases
- Update `jsconfig.json` to point to new locations:
  - Change `"@/*": ["./src/*"]` → `"@/*": ["./*"]` or remove if not needed
  - Change `"@/components/*": ["./src/components/*"]` → `"@/components/*": ["./components/*"]`
  - Keep `"@/lib/*": ["./lib/*"]`
- **Action**: Update path mappings in `jsconfig.json`

#### 1.3 Consolidate Redux
- **Verify differences** between `src/redux/` and `lib/redux/`:
  - `store.js`: `lib/redux/store.js` uses `next-redux-wrapper` (KEEP THIS)
  - `api_url.jsx`: Both identical (KEEP `lib/redux/api_url.jsx`)
  - Services and slicers: Check for differences, keep `lib/redux/` versions
- **Action**: Delete `src/redux/` after verifying `lib/redux/` has all needed code
- **Update**: All component imports from `../../redux/` or `../../../redux/` → `@/lib/redux/` or `../../lib/redux/`

#### 1.4 Move Contexts
- Move `src/context/ActiveNavigationProvider.jsx` → `lib/context/ActiveNavigationProvider.jsx`
- Move `src/context/WebSocketContext.js` → `lib/context/WebSocketContext.js`
- **Action**: Create `lib/context/` directory and move files
- **Update**: `components/client/Providers.jsx` import path

#### 1.5 Move Utilities
- Move `src/utils/imageUtils.js` → `lib/utils/imageUtils.js` (merge with existing `lib/utils/storage.js`)
- **Action**: Move file and update all imports

#### 1.6 Move Constants
- Move `src/constants/imageTypes.js` → `lib/constants/imageTypes.js`
- Move `src/components/util/Constants.jsx` → `lib/constants/componentConstants.jsx` OR keep in `components/util/Constants.jsx` (decide based on usage)
- **Action**: Create `lib/constants/` and move files

#### 1.7 Handle Assets
- **Verify**: Assets already in `public/img/` (no move needed)
- **Action**: Update all image references:
  - `require('../../assets/img/...')` → `/img/...` (public path) OR Next.js `Image` component
  - Verify all image paths use `/img/` prefix
- Remove `src/fonts/` (duplicate of `public/fonts/`)
- Remove `src/assets/` directory if empty after image reference updates

#### 1.8 Build Verification - Phase 1
- Run `npm run build`
- **Expected**: Build may fail due to import path issues (expected)
- **Action**: Note any critical errors, but proceed to Phase 2 for import updates

---

### Phase 2: Update All Imports

#### 2.1 Update App Directory Imports (13 files)
Update all `app/` pages to import from new locations:
- `app/(protected)/business-admin/home/page.jsx`
- `app/(protected)/business-admin/orders/page.jsx`
- `app/(protected)/business-admin/menu-items/page.jsx`
- `app/(protected)/business-admin/reviews/page.jsx`
- `app/(protected)/business-admin/contact-request/page.jsx`
- `app/(protected)/business-admin/employee-info/page.jsx`
- `app/(protected)/business-admin/layout.jsx`
- `app/(protected)/layout.jsx`
- `app/(auth)/layout.jsx`
- `app/(auth)/authenticate/registration/page.jsx`
- `app/[slug]/layout.jsx`
- `app/[slug]/[[...path]]/page.jsx`
- `app/order-status/[orderNumber]/page.jsx`
- `app/page.jsx`

**Import path changes:**
- `from '../../../src/components/...'` → `from '@/components/...'` or relative `from '../../../components/...'`
- `from '../../../../src/context/...'` → `from '@/lib/context/...'`
- `from '../../../../src/components/util/...'` → `from '@/components/util/...'`
- `from '../../../../src/redux/...'` → `from '@/lib/redux/...'`

#### 2.2 Update Component Internal Imports
Update imports within moved components:
- **Redux imports**: `from "../../redux/..."` → `from "@/lib/redux/..."` or `from "../../../lib/redux/..."`
- **Context imports**: `from "../../../context/..."` → `from "@/lib/context/..."` or relative paths
- **Util imports**: `from "../util/..."` → Keep relative or use `@/components/util/...`
- **Constants imports**: `from "../constants/..."` → `from "@/lib/constants/..."` or relative

**Files requiring Redux import updates (27+ files):**
- All files in `src/components/` that import from `../../redux/` or `../../../redux/`
- Update to use `@/lib/redux/` or relative paths to `lib/redux/`

#### 2.3 Update Providers.jsx
- Update `components/client/Providers.jsx`:
  - `from "../../src/context/ActiveNavigationProvider"` → `from "@/lib/context/ActiveNavigationProvider"`

#### 2.4 Build Verification - Phase 2
- Run `npm run build`
- **Expected**: Should resolve most import errors
- **Action**: Fix any remaining import path issues before proceeding

---

### Phase 3: Remove Screen Wrappers and Legacy Components

#### 3.1 Delete Screen Components
- Delete `src/screens/` directory (functionality already in app pages)
- **Verify**: No remaining imports reference `src/screens/`

#### 3.2 Remove Legacy Auth Components
- Delete `src/components/authentication/RequireAuth.jsx` (auth handled by Next.js layouts)
- Delete `src/components/authentication/RequireUnAuth.jsx` (auth handled by Next.js layouts)
- **Verify**: No imports reference these files

#### 3.3 Remove Legacy Layout Components
- Delete `src/components/business/layout/GetLayout.jsx` (replaced by Next.js layouts)
- Delete `src/components/template1/layout/Template1Layout.jsx` (replaced by Next.js layouts)
- **Verify**: No imports reference these files

#### 3.4 Remove Duplicate Directories
- Delete `src/fonts/` (duplicate of `public/fonts/`)
- Delete `src/assets/` if empty after image updates
- Delete `src/index.css` if styles are in `app/globals.css`

#### 3.5 Build Verification - Phase 3
- Run `npm run build`
- **Expected**: Build should succeed, may have warnings about unused files
- **Action**: Verify no broken imports from deleted files

---

### Phase 4: Convert to Next.js Patterns

#### 4.1 Update Component Imports
- Remove unnecessary `import React from 'react'` (React 18+ doesn't require it)
- Ensure all components use default exports where appropriate
- Add `'use client'` directive to all client components that:
  - Use hooks (`useState`, `useEffect`, etc.)
  - Use browser APIs
  - Use context
  - Handle events

#### 4.2 Convert Image Handling
- Replace `require()` for images with:
  - Next.js `Image` component from `next/image` for optimized images
  - OR public paths like `/img/logo.png` for simple cases
- **Files to update:**
  - `components/home/GetLocalsHome.jsx` (if still using require)
  - `components/home/Navigator.jsx` (verify image paths)
  - Any other components using `require()` for images

#### 4.3 Update Asset References
- Verify all image references use `/img/...` (public folder path)
- Update any remaining `require('../../assets/img/...')` to `/img/...`
- Use Next.js `Image` component for better optimization where appropriate

#### 4.4 Update CSS Imports
- Ensure CSS files are properly imported in components
- Verify `app/globals.css` contains all global styles
- Check if `src/index.css` has unique styles that need to be merged

#### 4.5 Add Metadata to Pages
- Add metadata exports to page components where applicable:
  - Use Next.js metadata API for SEO
  - Add titles and descriptions to pages

#### 4.6 Build Verification - Phase 4
- Run `npm run build`
- **Expected**: Build should succeed
- **Action**: Verify images load correctly, check for any runtime warnings

---

### Phase 5: Final Cleanup and Optimization

#### 5.1 Remove src/redux Directory
- After verifying all imports updated, delete `src/redux/` directory
- **Verify**: No files reference `src/redux/` anymore

#### 5.2 Update Next.js Config (if needed)
- Verify `next.config.js` path aliases match `jsconfig.json`
- Ensure webpack aliases are correct

#### 5.3 Remove React Router Dependency
- Check `package.json` for `react-router-dom`
- Remove if no longer used (after verifying all components migrated)
- **Note**: Only remove after confirming no imports remain

#### 5.4 Final Import Audit
- Search for any remaining `from '../src/` or `from '../../src/` imports
- Update to use new paths or path aliases
- Search for any `from 'src/` imports

#### 5.5 Build Verification - Phase 5 (Final)
- Run `npm run build`
- **Expected**: Clean build with no errors or warnings
- **Action**: Test application in dev mode (`npm run dev`)
- Verify:
  - [ ] All pages load correctly
  - [ ] Images display properly
  - [ ] API calls work
  - [ ] Navigation works
  - [ ] Subdomain routing works (`restaurant-ame.localhost:3000`)
  - [ ] Redux state management works
  - [ ] Context providers work
  - [ ] WebSocket connections work

---

## Detailed File Migration Map

### Components Migration
```
src/components/authentication/          → components/authentication/
src/components/business/                → components/business/
src/components/home/                    → components/home/
src/components/orderStatus/             → components/orderStatus/
src/components/template1/               → components/template1/
src/components/util/                    → components/util/
```

### Contexts Migration
```
src/context/ActiveNavigationProvider.jsx → lib/context/ActiveNavigationProvider.jsx
src/context/WebSocketContext.js          → lib/context/WebSocketContext.js
```

### Utils Migration
```
src/utils/imageUtils.js → lib/utils/imageUtils.js
```

### Constants Migration
```
src/constants/imageTypes.js                    → lib/constants/imageTypes.js
src/components/util/Constants.jsx             → lib/constants/componentConstants.jsx (or keep in components/util/)
```

### Redux Consolidation
```
src/redux/ → DELETE (use lib/redux/ instead)
- Verify lib/redux/ has all needed code
- Update all imports from src/redux/ to lib/redux/
```

### Assets (Already in place)
```
src/assets/img/ → Already in public/img/ (just verify references)
src/fonts/ → DELETE (duplicate of public/fonts/)
```

## Import Path Update Patterns

### Before → After Examples

**App Directory:**
- `from '../../../src/components/...'` → `from '@/components/...'`
- `from '../../../../src/context/...'` → `from '@/lib/context/...'`
- `from '../../../../src/redux/...'` → `from '@/lib/redux/...'`

**Component Internal:**
- `from "../../redux/..."` → `from "@/lib/redux/..."`
- `from "../../../redux/..."` → `from "@/lib/redux/..."`
- `from "../../../context/..."` → `from "@/lib/context/..."`
- `from "../../../utils/..."` → `from "@/lib/utils/..."`

## Key Conversions Checklist

1. **Image Handling**: 
   - [ ] Replace `require('../../assets/img/logo.png')` with `/img/logo.png` or Next.js Image
   - [ ] Update all image src attributes
   
2. **Default Exports**: 
   - [ ] Ensure components use default exports
   - [ ] Update any named exports if needed
   
3. **Client Directives**: 
   - [ ] Add `'use client'` to all interactive components
   - [ ] Verify server components don't have client directive
   
4. **Path Aliases**: 
   - [ ] Update `jsconfig.json` paths
   - [ ] Use `@/components`, `@/lib` consistently
   - [ ] Verify `next.config.js` webpack aliases match

5. **React Imports**: 
   - [ ] Remove unnecessary `import React from 'react'` where possible
   - [ ] Keep only when JSX transform requires it

## Files to Delete

- `src/screens/` (entire directory)
- `src/components/authentication/RequireAuth.jsx`
- `src/components/authentication/RequireUnAuth.jsx`
- `src/components/business/layout/GetLayout.jsx`
- `src/components/template1/layout/Template1Layout.jsx`
- `src/fonts/` (duplicate)
- `src/assets/` (if empty after image updates)
- `src/index.css` (if styles in app/globals.css)
- `src/redux/` (after consolidation)
- `src/context/` (after move)
- `src/utils/` (after move)
- `src/constants/` (after move)

## Critical Verification Points

1. **Redux Store**: Keep `lib/redux/store.js` (uses next-redux-wrapper)
2. **Path Aliases**: Update `jsconfig.json` before updating imports
3. **Build After Each Phase**: Essential to catch issues early
4. **Image Paths**: Verify all use `/img/` or Next.js Image component
5. **Context Providers**: Ensure `lib/context/` files are properly imported

## Testing Checklist (Final)

- [ ] Build succeeds (`npm run build`)
- [ ] Dev server starts (`npm run dev`)
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] API calls work (check network tab)
- [ ] Navigation works (all links functional)
- [ ] Subdomain routing works (`restaurant-ame.localhost:3000` routes correctly)
- [ ] Redux state management works (check Redux DevTools)
- [ ] Context providers work (ActiveNavigation, WebSocket)
- [ ] WebSocket connections work
- [ ] Authentication flows work
- [ ] Protected routes work
- [ ] No console errors or warnings

## Additional Notes

- **Incremental Approach**: Each phase has a build verification to catch issues early
- **Path Aliases**: Using `@/` prefix for cleaner imports
- **Backward Compatibility**: Keep relative imports working during transition
- **Asset Optimization**: Consider using Next.js Image component for better performance
- **Type Safety**: If TypeScript is added later, path aliases will help

