₹# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Typecheck**: `npm run typecheck`
- **Preview**: `npm run preview`

## Architecture & Structure
The project is a Vite-powered React application using TypeScript and Tailwind CSS.

### Core Architecture
- **Dynamic Catalog**: A Supabase-driven system manages categories and navigation links, allowing for real-time updates via the Admin Management Suite.
- **Global State**: Managed via React Context for core features:
    - `CartContext`: Handles the "Bloom Bag" (shopping cart) and enquiry logic.
    - `WishlistContext`: Manages saved items.
    - `QuickViewContext`: Controls the product quick-view modal.
    - `ProductContext`: Manages product catalog and lookup logic.
- **Routing**: Single Page Application (SPA) architecture using `react-router-dom`.

### Component Hierarchy
- `src/components`: Shared UI building blocks (e.g., `ProductCard`, `Navbar`, `Footer`).
- `src/pages`: Top-level view components.
- `src/hooks`: Custom logic (e.g., `useReveal` for scroll-triggered animations, `useRecentlyViewed`).
- `src/utils`: Helper functions for WhatsApp link generation and analytics.

### Visual Identity (The Botanical Studio)
The project implements a "Sophisticated Minimalist" luxury experience:
- **Palette**: Linen White base, Deep Slate Green text, with Muted Blush and Silver Sage accents.
- **Typography**: High-contrast Serif for display headings, Geometric Sans for body text.
- **UX Pattern**: Focused on a "Gallery" experience with curated narrative flows and minimal, intentional animations.

## Current Roadmap (Studio Evolution)
- [x] **Stability**: Fixing routing, product rendering, and asset paths.
- [x] **Dynamic Infrastructure**: Moving nav/categories to Supabase.
- [x] **Visual Overhaul**: Implementing the "High-End Atelier" minimalist design.
- [ ] **Studio Experience**: (Skipped) Gift Concierge Quiz, Studio Secrets, and Mood Discovery.
