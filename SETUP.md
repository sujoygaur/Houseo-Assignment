# Setup Steps - Houseo Assignment

## Quick Start Guide

Follow these steps to set up and run the Houseo Assignment project on your local machine.

## Prerequisites Check

Before starting, verify you have the required software installed:

```bash
# Check Node.js version (should be ^20.19.0 or >=22.12.0)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

If any of these are not installed, download and install them first:

- **Node.js**: https://nodejs.org/
- **Git**: https://git-scm.com/

## Step-by-Step Setup

### Step 1: Clone or Download the Repository

**Option A: Using Git (Recommended)**

```bash
git clone <repository-url>
cd Houseo-Assignment/Houseo-Assignment
```

**Option B: Download ZIP**

1. Download the project ZIP file
2. Extract it to your desired location
3. Open terminal in the extracted folder
4. Navigate to `Houseo-Assignment/Houseo-Assignment`

### Step 2: Install Dependencies

```bash
npm install
```

This command will:

- Read `package.json` to identify all dependencies
- Download and install all required packages
- Create `node_modules` folder with all dependencies
- Create `package-lock.json` for dependency locking

**Expected Output:**

```
added 494 packages, and audited 494 packages in 10s
found 0 vulnerabilities
```

**If you encounter errors:**

- Make sure you're in the correct directory
- Try deleting `node_modules` and `package-lock.json` and run `npm install` again
- Check your internet connection

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed
npm list --depth=0

# Run type checking to verify TypeScript setup
npm run type-check
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected Output:**

```
  VITE v7.1.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Open in Browser

1. Open your web browser
2. Navigate to `http://localhost:5173`
3. You should see the form application

### Step 6: Test the Application

1. **Test Form Validation:**
   - Try submitting the form without filling any fields
   - Verify error messages appear for required fields

2. **Test Group Fields:**
   - Fill in the two default group fields
   - Click "+ Add More" to add additional fields
   - Try removing fields (should allow removal if more than 2 exist)

3. **Test File Upload:**
   - Click or drag files to upload
   - Try uploading non-JPEG/PDF files (should show error)
   - Upload valid files

4. **Test Form Submission:**
   - Fill all required fields
   - Submit the form
   - Verify data appears in the table below

## Building for Production

### Step 1: Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 2: Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Development Commands Reference

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Build for production                     |
| `npm run preview`    | Preview production build                 |
| `npm run type-check` | Run TypeScript type checking             |
| `npm run lint`       | Run ESLint and auto-fix issues           |
| `npm run format`     | Format code with Prettier                |

## Project Structure Overview

```
Houseo-Assignment/
├── src/
│   ├── components/      # Reusable Vue components
│   ├── views/          # Page components
│   ├── utils/          # Utility functions
│   ├── services/       # API/data services
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Static data files
│   └── assets/         # CSS and static assets
├── public/             # Public assets
├── package.json        # Dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## Common Issues and Solutions

### Issue 1: Port Already in Use

**Error:** `Port 5173 is already in use`

**Solution:**

```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue 2: Module Not Found Errors

**Error:** `Cannot find module 'xxx'`

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: TypeScript Errors

**Error:** Type checking fails

**Solution:**

```bash
# Run type check to see specific errors
npm run type-check

# Make sure all imports are correct
# Check tsconfig.json configuration
```

### Issue 4: Build Fails

**Error:** Build process fails

**Solution:**

```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build
```

### Issue 5: Styles Not Loading

**Error:** Bootstrap styles not applied

**Solution:**

- Verify `src/assets/main.css` exists
- Check that `main.css` is imported in `main.ts`
- Clear browser cache

## Browser Compatibility

This application is tested and works on:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Environment Variables

No environment variables are required for this project. All configuration is done through:

- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Data Storage

The application uses **localStorage** to persist form submissions. Data will:

- ✅ Persist across browser sessions
- ✅ Persist across page refreshes
- ❌ Be cleared if browser data is cleared
- ❌ Not sync across different browsers/devices

## Next Steps After Setup

1. ✅ Verify the application runs successfully
2. ✅ Test all form fields and validation
3. ✅ Test form submission and data display
4. ✅ Review the code structure
5. ✅ Customize as needed

## Getting Help

If you encounter issues:

1. Check the error message in the terminal
2. Review the troubleshooting section above
3. Check browser console for runtime errors
4. Verify all prerequisites are installed correctly

## Video Recording Guide

When creating a video explanation, cover:

1. **Project Overview** (1-2 min)
   - Show the running application
   - Explain the main features

2. **Setup Process** (2-3 min)
   - Show cloning/installation steps
   - Run `npm install`
   - Start dev server
   - Show it running

3. **Code Walkthrough** (5-10 min)
   - Project structure
   - Key components (Main.vue, GroupFieldForm.vue)
   - Validation setup (validation.ts)
   - API service (api.ts)
   - Styling approach

4. **Features Demo** (3-5 min)
   - Form validation
   - Dynamic group fields
   - File upload
   - Form submission
   - Data display

5. **Technical Highlights** (2-3 min)
   - Vue 3 Composition API usage
   - Yup validation schemas
   - Error handling
   - Data persistence

**Total Video Length:** 15-25 minutes recommended

---

**Happy Coding! 🚀**
