export const moveAnimation = (flyParams: { x: number; y: number; time: number }) => {
    return {
      0: {
        translateX: 0,
        translateY: 0,
      },
      0.1: {
        translateX: 10 * flyParams.x,
        translateY: 10 * flyParams.y,
      },
      0.2: {
        translateX: 25 * flyParams.x,
        translateY: 30 * flyParams.y,
      },
      0.3: {
        translateX: 35 * flyParams.x,
        translateY: 45 * flyParams.y,
      },
      0.4: {
        translateX: 45 * flyParams.x,
        translateY: 70 * flyParams.y,
      },
      0.5: {
        translateX: 60 * flyParams.x,
        translateY: 80 * flyParams.y,
      },
      0.6: {
        translateX: 65 * flyParams.x,
        translateY: 70 * flyParams.y,
      },
  
      0.7: {
        translateX: 50 * flyParams.x,
        translateY: 45 * flyParams.y,
      },
      0.8: {
        translateX: 35 * flyParams.x,
        translateY: 30 * flyParams.y,
      },
      0.9: {
        translateX: 10 * flyParams.x,
        translateY: 15 * flyParams.y,
      },
      1: {
        translateX: 0 * flyParams.x,
        translateY: 0 * flyParams.y,
      },
    };
  };