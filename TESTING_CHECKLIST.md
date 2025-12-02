# Testing Checklist

This document provides a comprehensive testing checklist for the Next.js migration.

## Pre-Testing Setup

- [ ] Environment variables are configured in `.env.local`
- [ ] Backend API is running and accessible
- [ ] WebSocket server is running
- [ ] Development server starts without errors: `npm run dev`
- [ ] Production build completes successfully: `npm run build`

## 1. Authentication Flow

### Login
- [ ] Navigate to `/authenticate`
- [ ] Enter valid credentials
- [ ] Successfully log in
- [ ] Redirected to appropriate page after login
- [ ] Session token stored correctly

### Registration
- [ ] Navigate to `/authenticate/registration`
- [ ] Complete user registration form
- [ ] Complete business registration form
- [ ] Registration succeeds
- [ ] Redirects to login or appropriate page

### Logout
- [ ] Logout button/functionality works
- [ ] Session cleared on logout
- [ ] Redirected to home page
- [ ] Cannot access protected routes after logout

### Protected Route Access
- [ ] Unauthenticated users redirected from protected routes
- [ ] Authenticated users can access protected routes
- [ ] Token validation works correctly

## 2. Public Routes

### Home Page (`/`)
- [ ] Home page loads correctly
- [ ] All sections render properly
- [ ] Navigation works
- [ ] Images load correctly
- [ ] No console errors

### Business Navigation (`/[businessUsername]`)
- [ ] Navigate to a business username route
- [ ] Business information loads
- [ ] Redirects to template route correctly
- [ ] Loading state displays appropriately
- [ ] Error handling works for invalid businesses

### Template Routes (`/[templateId]/home`, `/[templateId]/menu`)
- [ ] Template home page loads
- [ ] Template menu page loads
- [ ] Navigation between template pages works
- [ ] Template layout renders correctly
- [ ] All template components function properly

### Order Status (`/order-status/[orderNumber]`)
- [ ] Order status page loads with valid order number
- [ ] Order information displays correctly
- [ ] Error handling for invalid order numbers

## 3. Protected Business Admin Routes

### Dashboard (`/business-admin/home`)
- [ ] Dashboard loads after authentication
- [ ] All dashboard components render
- [ ] Data fetches correctly
- [ ] Navigation menu works

### Orders (`/business-admin/orders`)
- [ ] Orders list displays
- [ ] Order management functions work
- [ ] Real-time updates via WebSocket (if applicable)

### Menu Items (`/business-admin/menu-items`)
- [ ] Menu items list displays
- [ ] Add/edit/delete menu items works
- [ ] Image uploads work
- [ ] Form validation works

### Reviews (`/business-admin/reviews`)
- [ ] Reviews list displays
- [ ] Review management functions work
- [ ] Review moderation works

### Contact Requests (`/business-admin/contact-request`)
- [ ] Contact requests list displays
- [ ] Request management functions work
- [ ] Mark as read/unread works

### Employee Info (`/business-admin/employee-info`)
- [ ] Employee list displays
- [ ] Employee management functions work
- [ ] Add/edit/delete employees works

## 4. WebSocket Functionality

- [ ] WebSocket connects on protected routes
- [ ] Real-time updates receive correctly
- [ ] Connection reconnects after disconnection
- [ ] WebSocket errors handled gracefully

## 5. Redux State Management

- [ ] Redux store initializes correctly
- [ ] State persists across navigation
- [ ] Actions dispatch correctly
- [ ] Reducers update state correctly
- [ ] RTK Query queries work
- [ ] RTK Query mutations work

## 6. Performance

- [ ] Page load times are acceptable
- [ ] Images optimize correctly
- [ ] Code splitting works
- [ ] No memory leaks
- [ ] Bundle size is reasonable

## 7. Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## 8. Responsive Design

- [ ] Desktop view works correctly
- [ ] Tablet view works correctly
- [ ] Mobile view works correctly
- [ ] Navigation adapts to screen size
- [ ] Images scale appropriately

## 9. Error Handling

- [ ] 404 errors handled correctly
- [ ] API errors display appropriate messages
- [ ] Network errors handled gracefully
- [ ] Console errors addressed

## 10. Console & Network

- [ ] No critical console errors
- [ ] No critical console warnings
- [ ] Network requests successful
- [ ] API calls return expected data
- [ ] Failed requests handled appropriately

## 11. Production Build

- [ ] Production build completes: `npm run build`
- [ ] Production server starts: `npm run start`
- [ ] All routes work in production
- [ ] No build warnings (except expected SSR warnings)
- [ ] Static assets load correctly

## Issues Found

Document any issues found during testing:

1. **Issue Description**: 
   - Steps to reproduce:
   - Expected behavior:
   - Actual behavior:
   - Priority:

---

**Tested By**: _________________  
**Date**: _________________  
**Build Version**: _________________

