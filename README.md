# GetLocals - Next.js Application

GetLocals is a modern web application built with Next.js 14, React, Redux Toolkit, and Ant Design. This application has been migrated from a React/Webpack setup to Next.js for improved performance, SEO, and developer experience.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd getlocals-react-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:
```env
BASE_API_URL=http://your-api-url/api/
WS_URL=ws://your-websocket-url/ws
NEXT_PUBLIC_BASE_API_URL=http://your-api-url/api/
NEXT_PUBLIC_WS_URL=ws://your-websocket-url/ws
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Testing with Custom Domains

You can test business routes using custom domains:
```
http://restaurant-name.localhost:3000
http://myrestaurant.localhost:3000
```

The `.localhost` domain automatically resolves to `127.0.0.1` on Windows 10/11, so no configuration needed!

For detailed testing instructions, see [LOCAL_TESTING_SETUP.md](./LOCAL_TESTING_SETUP.md).

### Production Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

## 📁 Project Structure

```
getlocals-react-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication route group
│   ├── (protected)/       # Protected route group
│   ├── [slug]/            # Dynamic routes (business/template)
│   ├── order-status/      # Order status routes
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # Client-side component wrappers
│   └── client/            # Client providers
├── lib/                   # Shared utilities and Redux
│   ├── redux/            # Redux store, slices, and APIs
│   └── utils/            # Utility functions
├── public/                # Static assets
│   └── fonts/            # Font files
└── src/                   # Source components and assets
    ├── components/       # React components
    ├── context/         # React contexts
    ├── redux/           # Legacy Redux (being migrated to lib/redux)
    └── screens/         # Screen components
```

## 🛣️ Routes

### Public Routes
- `/` - Home page
- `/authenticate` - Login page
- `/authenticate/registration` - Registration page
- `/[businessUsername]` - Business navigation (redirects to template)
- `/[templateId]/home` - Template home page
- `/[templateId]/menu` - Template menu page
- `/order-status/[orderNumber]` - Order status page

### Protected Routes (Require Authentication)
- `/business-admin/home` - Business admin dashboard
- `/business-admin/orders` - Orders management
- `/business-admin/menu-items` - Menu items management
- `/business-admin/reviews` - Reviews management
- `/business-admin/contact-request` - Contact requests
- `/business-admin/employee-info` - Employee information

## 🏗️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **State Management**: Redux Toolkit
- **UI Components**: Ant Design
- **Styling**: CSS Modules, Styled Components
- **WebSocket**: SockJS, STOMP.js
- **Image Handling**: Next.js Image Optimization
- **Animations**: Framer Motion, Animate.css

## 🔧 Configuration

### Environment Variables

- `BASE_API_URL` - Backend API URL (server-side only)
- `WS_URL` - WebSocket URL (server-side only)
- `NEXT_PUBLIC_BASE_API_URL` - Backend API URL (client-side accessible)
- `NEXT_PUBLIC_WS_URL` - WebSocket URL (client-side accessible)

### Next.js Configuration

See `next.config.js` for:
- Webpack configuration
- Path aliases
- Image optimization settings

## 📦 Key Features

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Client-Side Routing
- ✅ Redux State Management
- ✅ WebSocket Real-time Updates
- ✅ Image Optimization
- ✅ Responsive Design
- ✅ Authentication & Authorization
- ✅ Protected Routes

## 🧪 Testing

### Manual Testing Checklist

1. **Authentication Flow**
   - [ ] Login with valid credentials
   - [ ] Registration (user and business)
   - [ ] Logout functionality
   - [ ] Protected route access control

2. **Public Routes**
   - [ ] Home page loads correctly
   - [ ] Business navigation redirects properly
   - [ ] Template pages render correctly
   - [ ] Order status page displays correctly

3. **Business Admin Routes**
   - [ ] Dashboard loads
   - [ ] Orders page functionality
   - [ ] Menu items management
   - [ ] Reviews management
   - [ ] Contact requests
   - [ ] Employee information

4. **Performance**
   - [ ] Page load times
   - [ ] Image optimization
   - [ ] WebSocket connections
   - [ ] State management

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Setup

Ensure all environment variables are set in your deployment platform:
- Vercel: Add to Environment Variables in project settings
- Other platforms: Configure according to their documentation

## 📝 Migration Notes

This application was migrated from React/Webpack to Next.js. Some components may still reference React Router patterns but are wrapped in Next.js client components.

For migration details, see `MIGRATION_NOTES.md`.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

ISC

## 👥 Authors

GetLocals Team

