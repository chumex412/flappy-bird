# Flappy Bird Mobile Game

This is a solution to the Flappy bird. I took on this challenge to improve my mobile application animation skills by building the project with TypeScript, React Native, Expo and Skia, and implementing clean architecture.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Tap anywhere on the screen to start the game once it's loaded
- Tap anywhere on the screen to keep the bird floating
- See their current scores and best scores on the game over screen after hitting an obstacle

### Screenshot

![Bare Layout setup](https://res.cloudinary.com/da8vqkdmt/image/upload/v1767437729/WhatsApp_Image_2026-01-03_at_11.53.20_vi84vp.jpg)
![Full Layout Setup](https://res.cloudinary.com/da8vqkdmt/image/upload/v1767437729/WhatsApp_Image_2026-01-03_at_11.53.20_1_b9fmjz.jpg)

### Links

- Solution URL: [https://github.com/chumex412/flappy-bird](https://github.com/chumex412/flappy-bird)
- ![A video showing the game in play](https://res.cloudinary.com/da8vqkdmt/video/upload/v1767437760/WhatsApp_Video_2026-01-03_at_11.53.23_1_hog7ps.mp4)
- ![A video showing the full game flow](https://res.cloudinary.com/da8vqkdmt/video/upload/v1767437762/WhatsApp_Video_2026-01-03_at_11.53.23_kgbum1.mp4)

## My process

When I discovered the Flappy Bird design in the Figma Community, I had no idea how to approach the implementation because I only had basic knowledge of React Native animations. I searched for guidance on YouTube and came across a Flappy Bird tutorial by notJust.dev. The tutorial gave me a solid understanding of how to use React Native Reanimated, after which I figured out the rest on my own.

At one point, the animation became buggy. The same approach that worked in the tutorial resulted in jerky animations in my project, largely because several updates had been made since the live stream was recorded and my current implementation. I was able to resolve these issues by carefully referencing the documentation.

I also managed to animate the entire background, not just the poles. Essentially, everything on the screen is viewed through a camera lens. When the camera focuses on the bird, it appears as though the bird is moving, when in reality it’s the background that’s in motion. This concept became the foundation of the Flappy Bird animation.

### Built with

- [React Native](https://reactnative.dev/docs/environment-setup) - JS library built on React for Native App development
- [Expo Cli](https://docs.expo.dev/get-started/introduction/) - a framework that makes developing Android and iOS apps easier
- [TypeScript](https://www.typescriptlang.org/) - For type checking and safety
- [React Native Skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation) - It brings advanced graphics to React Native.
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)

### What I learned

I learnt how to utilize React Native Reanimated to build an animated layout.

I also learnt build a game layout with React Native Skia.

### Continued development

I would like to liven the game by increasing the speed, fixing the background jerky movements and improving my native app animation skills.

### Useful resources

- [React Native Skia Documentation](https://shopify.github.io/react-native-skia/docs/getting-started/installation) - This helped me understand how to use it's component to build the game layout.
- [NotJust.Dev](https://www.youtube.com/watch?v=9F4aICEisVI&list=PPSV) - This gave a comprehensive explanation of building the flappy bird.

## Author

- TCM - [@chumex412](https://github.com/chumex412/)
- Twitter - [@kode_navigator](https://www.twitter.com/kode_navigator)
