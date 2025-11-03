# WoyageTask - Responsive Image Gallery

A modern, responsive image gallery built with Next.js 16, TypeScript, and Tailwind CSS. Features a modal slider for full-size image viewing and demonstrates various JavaScript looping methods.

## Features

✨ **Responsive Grid Layout** - Adapts from 1 to 5 columns based on screen size  
🖼️ **Modal Image Viewer** - Full-size image viewing with navigation  
🎯 **Dual API Integration** - Fetches images from both JSONPlaceholder and Picsum APIs  
🔍 **Filtering** - Filter images by source (All/JSONPlaceholder/Picsum)  
⌨️ **Keyboard Navigation** - Arrow keys for navigation, Escape to close  
📱 **Mobile Friendly** - Fully responsive design  
🎨 **Modern UI** - Clean design with hover effects and smooth transitions  
🔄 **Loading States** - Elegant loading spinner while fetching data  
⚠️ **Error Handling** - Graceful fallback to mock data when APIs are unavailable  

## Tech Stack

- **Next.js 16** - React framework with Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **React 19** - Latest React features

## JavaScript Looping Demonstrations

This project showcases various JavaScript looping methods:

- **Array.map()** - Used for rendering gallery grid items and filter buttons
- **Array.filter()** - Used for filtering images by source
- **for...of loop** - Used in API functions for logging
- **Traditional for loop** - Used in Fisher-Yates shuffle algorithm
- **Promise.all()** - Used for parallel API fetching

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/rhit-weinrea/WoyageTask.git
cd WoyageTask

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
WoyageTask/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ImageGallery.tsx    # Main gallery component
│   └── ImageModal.tsx      # Modal slider component
├── lib/
│   └── api.ts              # API fetching functions
├── types/
│   └── image.ts            # TypeScript interfaces
└── public/                 # Static assets
```

## API Integration

The gallery fetches images from two public APIs:

1. **JSONPlaceholder Photos API**
   - URL: `https://jsonplaceholder.typicode.com/photos`
   - Provides 15 sample photos

2. **Picsum Photos API**
   - URL: `https://picsum.photos/v2/list`
   - Provides 15 sample photos with author information

### Fallback Mechanism

If the APIs are unavailable (blocked or offline), the application automatically falls back to mock data with colorful placeholder images, ensuring the gallery always displays content.

## Features in Detail

### Responsive Gallery Grid
- 1 column on mobile (< 640px)
- 2 columns on small tablets (640px - 768px)
- 3 columns on tablets (768px - 1024px)
- 4 columns on laptops (1024px - 1280px)
- 5 columns on desktops (1280px+)

### Modal Slider
- Click any image to open full-size view
- Navigate with arrow buttons or keyboard
- Thumbnail strip at bottom for quick navigation
- Displays image information (title, author, source)
- Circular navigation (wraps around)

### Filtering
- Filter by "All Sources", "JSONPlaceholder", or "Picsum"
- Dynamic image count display
- Maintains state during navigation

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Screenshots

### Main Gallery View
![Gallery Main View](https://github.com/user-attachments/assets/7df9a454-b841-400a-84ba-d56b519d51fd)

### Modal Image Viewer
![Modal Viewer](https://github.com/user-attachments/assets/82c15385-11ba-4c3e-82a7-bb72427bf1f2)

### Filtered View
![Filtered Gallery](https://github.com/user-attachments/assets/37a978b9-dff3-4de4-864f-0107ba0e7943)

---

This project demonstrates modern web development practices with Next.js, TypeScript, and responsive design principles.
