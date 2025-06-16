# Rick and Morty Episode Viewer

A Next.js application that displays Rick and Morty episodes and their characters using the Rick and Morty API.

## Features

- **Episode List**: Browse through all Rick and Morty episodes with infinite scroll
- **Character Grid**: View characters that appear in each episode with 100x100 images
- **Interactive UI**: Click episodes to view details, click again to deselect
- **Modern Styling**: Built with Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component
- **API**: Rick and Morty API (https://rickandmortyapi.com/)

## Getting Started

### Prerequisites

- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend-assessment-walmart
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Components

### EpisodesList

- Displays episodes in a scrollable sidebar
- Implements infinite scroll for pagination
- Shows episode number, name, and air date
- Highlights selected episode with blue background

### CharacterList

- Fetches and displays characters for selected episode
- Shows character images in a responsive grid
- Images are 100x100px squares with character names below
- Handles text wrapping for long character names

## Configuration

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the new import syntax:

```css
/* globals.css */
@import "tailwindcss";
```

### Next.js Image Domains

Configure allowed image domains in `next.config.js`:

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};
```

## API Integration

The app integrates with the Rick and Morty API:

- **Episodes**: `https://rickandmortyapi.com/api/episode`
- **Characters**: Individual character URLs from episode data

## Usage

1. **Browse Episodes**: Scroll through the episode list on the left sidebar
2. **Select Episode**: Click any episode to view its details and characters
3. **View Characters**: Characters appear in a grid on the right side
4. **Deselect**: Click the same episode again to clear the selection
5. **Infinite Scroll**: More episodes load automatically as you scroll down

## Development

### Code Structure

- Components use TypeScript for type safety
- Functional components with React hooks
- Props interfaces for component contracts
- Error handling for API calls

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```
