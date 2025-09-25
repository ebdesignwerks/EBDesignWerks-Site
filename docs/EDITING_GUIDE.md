# Editing Guide

This guide explains how to make common edits and updates to the EB Design Werks website.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Common Edits](#common-edits)
  - [Updating Text Content](#updating-text-content)
  - [Modifying Services](#modifying-services)
  - [Changing Contact Information](#changing-contact-information)
  - [Updating Styling](#updating-styling)
  - [Adding Images](#adding-images)
- [Advanced Modifications](#advanced-modifications)
- [Testing Changes](#testing-changes)
- [Deploying Updates](#deploying-updates)

## Prerequisites

1. **Code Editor**: VS Code, Cursor, or similar
2. **Node.js**: Version 16 or higher
3. **Git**: For version control
4. **Basic Knowledge**: HTML, CSS, JavaScript/React

## Common Edits

### Updating Text Content

#### Home Page Hero Section
**File**: `src/pages/Home.tsx`

```tsx
// Find and edit these sections:
<h1>EB Design Werks</h1>
<h2>Custom 3D Scanning, Printing & Light Manufacturing</h2>
<p className="hero-description">
  Your text here...
</p>
```

#### About Page Content
**File**: `src/pages/About.tsx`

Update company description, mission, values, and process information directly in the JSX.

### Modifying Services

**File**: `src/utils/servicesData.ts`

```typescript
// To add a new service:
{
  id: 'new-service',
  name: 'New Service Name',
  icon: '🔧',
  shortDescription: 'Brief description for cards',
  description: 'Full description for service page',
  features: [
    'Feature 1',
    'Feature 2'
  ],
  pricing: {
    starting: '$XXX',
    factors: ['Factor 1', 'Factor 2']
  }
}
```

#### Service Icons
- Use emojis for quick icons: `'🔧'`, `'🎯'`, etc.
- Or use icon libraries by installing them:
  ```bash
  npm install react-icons
  ```

### Changing Contact Information

**File**: `src/utils/config.ts`

```typescript
export const config = {
  company: {
    name: 'EB Design Werks',
    email: 'ebdesignwerks@gmail.com',
    phone: '(320) 266-9091',
    location: 'Your Location'
  },
  // Other settings...
}
```

#### Footer Information
**File**: `src/components/Layout.tsx`

Find the footer section and update:
- Address
- Phone numbers
- Email addresses
- Social media links

### Updating Styling

#### Global Styles
**File**: `src/index.css`

```css
/* Color scheme */
:root {
  --primary-color: #007bff;  /* Main brand color */
  --primary-dark: #0056b3;   /* Darker variant */
  --secondary-color: #6c757d;
  /* Add or modify colors */
}
```

#### Component-Specific Styles
Each page has its own CSS file:
- `src/pages/Home.css`
- `src/pages/Services.css`
- `src/pages/About.css`
- etc.

#### Common Style Changes

1. **Button Colors**:
   ```css
   .btn-primary {
     background: var(--primary-color);
   }
   ```

2. **Font Sizes**:
   ```css
   h1 { font-size: 2.5rem; }
   h2 { font-size: 2rem; }
   ```

3. **Spacing**:
   ```css
   section {
     padding: 3rem 0;
   }
   ```

### Adding Images

1. **Add image to public folder**:
   - Place in `public/images/`
   - Example: `public/images/new-product.jpg`

2. **Reference in code**:
   ```tsx
   <img src="/images/new-product.jpg" alt="Description" />
   ```

3. **Or import in src**:
   ```tsx
   import productImage from '../assets/product.jpg'
   <img src={productImage} alt="Description" />
   ```

## Advanced Modifications

### Adding a New Page

1. **Create page component**:
   ```bash
   touch src/pages/NewPage.tsx
   touch src/pages/NewPage.css
   ```

2. **Create the component**:
   ```tsx
   // src/pages/NewPage.tsx
   import './NewPage.css'

   export default function NewPage() {
     return (
       <div className="new-page">
         <div className="container">
           <h1>New Page Title</h1>
           {/* Your content */}
         </div>
       </div>
     )
   }
   ```

3. **Add route in App.tsx**:
   ```tsx
   import NewPage from './pages/NewPage'

   // In the Routes section:
   <Route path="/new-page" element={<NewPage />} />
   ```

4. **Add navigation link**:
   ```tsx
   // In Layout.tsx navigation:
   <Link to="/new-page">New Page</Link>
   ```

### Modifying the Quote Form

**File**: `src/pages/QuoteRequest.tsx`

To add new form fields:
```tsx
// Add to the form data interface
interface QuoteFormData {
  // existing fields...
  newField: string
}

// Add the input field
<div className="form-group">
  <label htmlFor="newField">New Field Label</label>
  <input
    type="text"
    id="newField"
    {...register('newField', { required: 'This field is required' })}
  />
</div>
```

### Updating EmailJS Template

1. Log into EmailJS dashboard
2. Update your email template to include new variables:
   ```
   New Field: {{newField}}
   ```
3. No code changes needed if variable names match

### Environment Variables

**For local development**:
Create `.env.local`:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CUSTOM_VAR=your_value
```

**Access in code**:
```typescript
const customVar = import.meta.env.VITE_CUSTOM_VAR
```

## Testing Changes

### Local Development

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **View at**: http://localhost:5173

3. **Test on different devices**:
   - Use browser dev tools
   - Test responsive breakpoints
   - Check mobile menu

### Pre-deployment Checklist

- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] Images load correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser compatibility

## Deploying Updates

### Automatic Deployment

Any push to the `main` branch triggers deployment:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Manual Build Test

Test the production build locally:
```bash
npm run build
npm run preview
```

### Monitoring Deployment

1. Check [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. View build logs
3. Verify deployment status
4. Test live site

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Check for TypeScript errors: `npm run build`
   - Verify all imports are correct
   - Ensure no missing dependencies

2. **Styling Issues**:
   - Clear browser cache
   - Check CSS specificity
   - Verify media queries

3. **Form Not Working**:
   - Check EmailJS credentials
   - Verify environment variables
   - Test in EmailJS dashboard

### Getting Help

- Check error messages in browser console
- Review AWS Amplify build logs
- Test locally first
- Keep backups of working code

## Best Practices

1. **Make small, focused changes**
2. **Test locally before deploying**
3. **Write descriptive commit messages**
4. **Keep consistent code style**
5. **Comment complex logic**
6. **Optimize images before adding**
7. **Test on multiple devices**
