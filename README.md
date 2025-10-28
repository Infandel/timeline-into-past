# React + TypeScript + Webpack Pet Project

A modern frontend application built with React, TypeScript, and Webpack, following Components And Modules architecture principles. The project demonstrates different animation visualization and approaches with usage of data Mocking. And some leverage of `Swiper.js` ready to use swipers for flexible swiping component.

## Features

- **Timeline**: Interactive timeline circle, where you can choose a major and read timeline descriptions and main events which were happened there.
  - Data source: Data stubb
  - Built with GSAP and JSX
- **Event slider**: Data representation of chosen timeline events
  - Data source: Data stubb
  - Built with `Slider.js` and JSX
  - Animated with GSAP

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Webpack
- **Styling**: SCSS modules
- **Animations**: GSAP + gsap/react
- **Components**: Swiper.js
- **Architecture**: Module

# Installation

## Prerequisitions

- node `20.0+` version
- `npm` for installing deps

## Install dependencies

`npm install`

# Development

## Start development server

`npm run dev`

The application will be available at `http://localhost:3000`

## Build for production

`npm run build`

## Deployment to GitHub Pages

## API Sources

- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/
  - Used for posts and users data
- **Rick and Morty API**: https://rickandmortyapi.com/
  - Used for character analytics and visualization
