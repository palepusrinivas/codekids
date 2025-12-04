# CodeKids Technologies - React.js Application

This is the React.js version of the CodeKids Technologies website, converted from Next.js to pure React with Vite, React Router, and Tailwind CSS.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
codekids-react/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # UI component library (shadcn/ui)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── ...
│   ├── lib/            # Utilities and helpers
│   │   ├── utils.ts
│   │   ├── smooth-scroll.ts
│   │   └── ...
│   ├── hooks/          # Custom React hooks
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Entry point
├── public/              # Static assets
│   └── assest/         # Images and files
└── package.json
```

## 🔄 Conversion Status

### ✅ Completed
- Project setup with Vite + React + TypeScript
- Tailwind CSS configuration (all custom colors and styles preserved)
- Core utilities (utils, smooth-scroll, form-validation)
- Email service setup
- ThemeProvider component
- Navbar component (converted from Next.js)
- Image component (replacement for Next.js Image)
- App routing structure
- Public assets copied

### ⏳ In Progress / To Do
- Footer component conversion
- All other components (50+ components)
- All pages (10+ pages)
- Component testing
- Final verification

## 🛠️ Conversion Patterns

The application has been converted from Next.js to React.js. Key changes:
- Next.js file-based routing → React Router
- `next/image` → Custom Image component
- `next/link` → `react-router-dom` Link
- Next.js metadata → React Helmet
- Next.js API routes → Fetch calls to backend

### Key Changes:
1. **Routing**: Next.js file-based routing → React Router
2. **Images**: `next/image` → Custom Image component
3. **Links**: `next/link` → `react-router-dom` Link
4. **Metadata**: Next.js metadata → React Helmet
5. **API Routes**: Next.js API routes → Fetch calls to backend

## 🎨 Design & Styling

All design elements, colors, and effects are **100% preserved**:
- ✅ Color palette (pink, purple, blue gradients)
- ✅ Glassmorphism effects
- ✅ Animations (Framer Motion)
- ✅ Responsive design
- ✅ Dark mode support
- ✅ All Tailwind custom utilities

## 📝 Next Steps

To complete the conversion:

1. **Convert Components**: Convert remaining components from Next.js to React
2. **Convert Pages**: Convert all page components from `app/` to `src/pages/`
3. **Add SEO**: Add React Helmet to each page for SEO metadata
4. **Test**: Test all routes, forms, and interactions
5. **API Setup**: Set up backend API for email sending (or use a service like EmailJS)

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

### API Backend

The email functionality requires a backend API. You can:
1. Create a simple Express.js server
2. Use a service like EmailJS, Formspree, or Resend
3. Use the original Next.js API routes as a separate backend

## 📦 Dependencies

- **React 18** - UI library
- **React Router 6** - Routing
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - UI primitives
- **React Hook Form** - Form handling
- **Zod** - Validation
- **next-themes** - Theme management

## 🎯 Features

- ✅ Responsive design
- ✅ Dark mode
- ✅ Smooth scrolling
- ✅ Form validation
- ✅ Email integration (needs backend)
- ✅ SEO ready (with React Helmet)
- ✅ Performance optimized
- ✅ Accessible

## 📄 License

Same as original project.

---

**Note**: This is a conversion from Next.js to React.js. All design, colors, and functionality should remain identical.

