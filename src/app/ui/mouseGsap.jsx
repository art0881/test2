// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import '../globals.css';

// const MouseFollowAnimation = () => {
//   const containerRef = useRef(null);
//   const [lastMouseX, setLastMouseX] = useState(0);
//   const [lastMouseY, setLastMouseY] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const { clientX, clientY } = event;

//       // Calculate distance moved since last mouse move
//       const dx = clientX - lastMouseX;
//       const dy = clientY - lastMouseY;
//       const distanceMoved = Math.sqrt(dx * dx + dy * dy);

//       // Check if distance moved is greater than or equal to 50 pixels
//       if (distanceMoved >= 50) {
//         // Update last mouse position
//         setLastMouseX(clientX);
//         setLastMouseY(clientY);
//         const offsetX = 100;
//         // Add new image to container
//         const newImage = document.createElement('img');
//         newImage.src = `./${(Date.now() % 4) + 1}.png`; // Cycle through images 1.png to 5.png
//         newImage.style.position = 'absolute';
//         newImage.style.left = `${clientX - containerRef.current.getBoundingClientRect().left + offsetX}px`;
//         newImage.style.top = `${clientY - containerRef.current.getBoundingClientRect().top}px`;
//         newImage.style.width = '100px';
//         newImage.style.height = '150px';
//         newImage.style.borderRadius = '20px';
//         newImage.style.opacity = 1;
//         newImage.style.pointerEvents = 'none'; // Ignore mouse events
//         containerRef.current.appendChild(newImage);

//         gsap.to(newImage, {
//           opacity: 1,
//           duration: 0.5,
//           x: '-=30', // Move image 10 pixels to the right
//           y: '-=30', // Move image 10 pixels down
//           ease: 'power2.out',
//           onComplete: () => {
//             gsap.to(newImage, {
//               opacity: 0,
//               y: '+=250', // Move image 20 pixels down while fading out
//               duration: 0.5, // Duration of the fade-out
//               delay: 0.1, // Wait 1 second before starting the fade-out
//               ease: 'power2.out',
//               onComplete: () => {
//                 if (containerRef.current) {
//                   containerRef.current.removeChild(newImage);
//                 }
//               },
//             });
//           },
//         });
//       }
//     };

//     const targetElement = containerRef.current;

//     if (targetElement) {
//       targetElement.addEventListener('mousemove', handleMouseMove);

//       return () => {
//         targetElement.removeEventListener('mousemove', handleMouseMove);
//       };
//     }
//   }, [lastMouseX, lastMouseY]);

//   return (
//     <div ref={containerRef} className="mouse-follow-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
//     </div>
//   );
// };

// export default MouseFollowAnimation;


'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../globals.css';

const MouseFollowAnimation = () => {
  const containerRef = useRef(null);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      // Calculate distance moved since last mouse move
      const dx = clientX - lastMouseX;
      const dy = clientY - lastMouseY;
      const distanceMoved = Math.sqrt(dx * dx + dy * dy);

      // Check if distance moved is greater than or equal to 10 pixels
      if (distanceMoved >= 40) {
        // Update last mouse position
        setLastMouseX(clientX);
        setLastMouseY(clientY);

        // Add new image to container
        const newImage = document.createElement('img');
        newImage.src = `./${(Date.now() % 4) + 1}.png`; // Cycle through images 1.png to 5.png
        newImage.style.position = 'absolute';
        newImage.style.left = `${clientX - containerRef.current.getBoundingClientRect().left + 100}px`; // 200 pixels to the right
        newImage.style.top = `${clientY - containerRef.current.getBoundingClientRect().top}px`; // 50 pixels down
        newImage.style.width = '100px';
        newImage.style.height = '150px';
        newImage.style.borderRadius = '20px';
        newImage.style.opacity = 1;
        newImage.style.pointerEvents = 'none'; // Ignore mouse events
        containerRef.current.appendChild(newImage);

        gsap.to(newImage, {
          duration: 0.6,
          x: dx > 0 ? `+=${Math.abs(dx)}` : `-=${Math.abs(dx)}`, // Move image in the direction of mouse movement horizontally
          y: dy > 0 ? `+=${Math.abs(dy)}` : `-=${Math.abs(dy)}`, // Move image in the direction of mouse movement vertically
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(newImage, {
              opacity: 0,
              y: '+=250', // Move image 250 pixels down while fading out
              duration: 0.8, // Duration of the fade-out
              delay: 0.1, // Wait 0.1 second before starting the fade-out
              ease: 'power2.out',
              onComplete: () => {
                if (containerRef.current) {
                  containerRef.current.removeChild(newImage);
                }
              },
            });
          },
        });
      }
    };

    const targetElement = containerRef.current;

    if (targetElement) {
      targetElement.addEventListener('mousemove', handleMouseMove);

      return () => {
        targetElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [lastMouseX, lastMouseY]);

  return (
    <div ref={containerRef} className="mouse-follow-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
    </div>
  );
};

export default MouseFollowAnimation;
