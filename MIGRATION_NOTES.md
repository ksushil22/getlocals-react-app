# Next.js Migration Notes

## Phase 6: Component Migration Status

### Components Still Using React Router

The following components still use React Router and will need to be migrated to Next.js navigation:

#### Home Components
- `src/components/home/GetLocalsHome.jsx` - Uses `Link`, `useNavigate`
- `src/components/home/Navigator.jsx` - Uses `useNavigate`

#### Authentication Components
- `src/components/authentication/Login.jsx` - Uses `useLocation`, `useNavigate`
- `src/components/authentication/RequireAuth.jsx` - Uses `Navigate`, `Outlet`, `useLocation`
- `src/components/authentication/RequireUnAuth.jsx` - Uses `Navigate`, `Outlet`, `useNavigate`
- `src/components/authentication/RegisterUser.jsx` - Uses `useNavigate`
- `src/components/authentication/RegistrationSuccessModal.jsx` - Uses `useNavigate`

#### Business Admin Components
- `src/components/business/layout/MainNavigation.jsx` - Uses `Link`, `useNavigate`

#### Template Components
- `src/components/template1/layout/Template1NavBar.jsx` - Uses `Link`, `Navigate`, `useLocation`, `useNavigate`
- `src/components/template1/layout/Template1Footer.jsx` - Uses `useLocation`, `useNavigate`
- `src/components/template1/Template1Home.jsx` - Uses `useLocation`
- `src/components/template1/menu/order/Cart.jsx` - Uses `useNavigate`

#### Other Components
- `src/components/util/Commons.jsx` - Uses `useLocation`
- `src/screens/BusinessNavigator.jsx` - Uses `useLocation`, `useNavigate`, `useParams`
- `src/screens/OrderStatusScreen.jsx` - Uses `useParams`

### Migration Strategy

1. **React Router → Next.js Navigation:**
   - Replace `Link` from `react-router-dom` with `Link` from `next/link`
   - Replace `useNavigate()` with `useRouter()` from `next/navigation`
   - Replace `useParams()` from `react-router-dom` with `useParams()` from `next/navigation`
   - Replace `useLocation()` with `usePathname()` and `useSearchParams()` from `next/navigation`
   - Remove `Outlet`, `Navigate`, `Routes`, `Route`, `BrowserRouter` (handled by Next.js routing)

2. **Component Structure:**
   - Components remain in `src/components/` for now
   - All components used in Next.js routes are imported as-is
   - Components work because they're imported into client components (`'use client'`)

3. **Asset Imports:**
   - Components using `require()` for images work in Next.js
   - Consider migrating to Next.js `Image` component in future phases

### Current Status

- ✅ All Next.js route pages are client components
- ✅ Route structure matches Next.js App Router
- ⚠️ Components still use React Router (will cause errors if navigation is triggered)
- ⚠️ `react-router-dom` still in dependencies (needed until components are migrated)

### Next Steps

Components can be migrated incrementally. Priority order:
1. Components used in public routes (home, authentication)
2. Components used in protected routes (business admin)
3. Template components

