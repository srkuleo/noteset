export const slideX = {
  "right-hidden": {
    opacity: 0,
    x: 16,
  },
  "slide-from-right": {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
  "slide-to-left": {
    opacity: 0,
    x: -16,
    transition: {
      duration: 0.15,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
};

export const biggerSlideX = {
  "right-hidden": {
    opacity: 0,
    x: 24,
  },
  "slide-from-right": {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
  "slide-to-left": {
    opacity: 0,
    x: -24,
    transition: {
      duration: 0.15,
      ease: [0.36, 0.66, 0.04, 1],
    },
  },
};
