# Zeal8 - Particle Animation Portfolio

## Overview

A modern portfolio website for Zeal8 featuring an interactive particle animation powered by React and Three.js. The application showcases a beautiful flowering particle system as the central visual element, with clean typography and minimal navigation. Built as a full-stack application with Express backend and React frontend, the project demonstrates advanced animation techniques and responsive design principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and component-based development
- **Build Tool**: Vite for fast development server and optimized production builds
- **Routing**: Wouter for lightweight client-side routing (Home and MoreInfo pages)
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface elements
- **State Management**: TanStack Query for server state management and caching

### Animation System
- **3D Graphics**: Three.js for WebGL-based particle rendering and animations
- **Canvas Animation**: Custom HTML5 Canvas implementation for the ParticleFlower component
- **Performance**: Optimized particle systems with 70,000+ particles using efficient rendering techniques
- **Interactivity**: Mouse interaction handlers for responsive particle behavior

### Backend Architecture
- **Runtime**: Node.js with Express framework for server-side routing
- **Development**: TSX for TypeScript execution in development mode
- **Storage**: In-memory storage with interface pattern for future database integration
- **Build Process**: ESBuild for production bundling with external package handling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured for production (Neon Database serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Validation**: Zod schemas for runtime type validation and data integrity

### Development Tooling
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Code Quality**: ESLint and TypeScript compiler for code consistency
- **Hot Reload**: Vite HMR integration with Express development server
- **Path Resolution**: Absolute imports using @ prefix for client code and @shared for shared utilities

### Responsive Design
- **Approach**: Mobile-first responsive design with Tailwind breakpoint system
- **Typography**: Courier Prime monospace font for technical aesthetic
- **Layout**: CSS Grid and Flexbox for complex layouts with proper viewport handling
- **Performance**: Optimized asset loading and efficient rendering for smooth animations

## External Dependencies

### Core Frameworks & Runtime
- **React**: Frontend framework with hooks and TypeScript support
- **Express**: Node.js web framework for API and static file serving
- **Three.js**: 3D graphics library for WebGL particle animations
- **Vite**: Build tool and development server with HMR capabilities

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database service
- **Drizzle ORM**: Type-safe ORM with PostgreSQL adapter
- **Drizzle Kit**: Database migration and schema management tools

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Radix UI**: Headless UI components for accessibility and interaction patterns
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

### Development & Build Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **TSX**: TypeScript execution for development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

### Additional Libraries
- **TanStack Query**: Server state management and caching solution
- **React Hook Form**: Form handling with validation support
- **Wouter**: Lightweight routing library for client-side navigation
- **Date-fns**: Date manipulation and formatting utilities
- **Nanoid**: Unique ID generation for component keys and identifiers