const bt = document.getElementById('image-el');
const turb = document.querySelector('#noise feTurbulence');

// Initial turbulence value
let turbVal = 0.000001;

// Animation duration in milliseconds
const duration = 400;

// Function to animate the turbulence
function animateTurbulence(startVal, endVal, duration, callback) {
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // Normalize progress (0 to 1)

    // Calculate the current turbulence value
    const currentVal = startVal + progress * (endVal - startVal);
    console.log(currentVal,progress,elapsed,currentTime,startTime)
    turb.setAttribute('baseFrequency', `0 ${currentVal}`);

    if (progress < 1) {
      requestAnimationFrame(step); // Continue the animation
    } else if (callback) {
      callback(); // Call the callback if provided
    }
  }

  requestAnimationFrame(step);
}

// Add a click event listener to the button
bt.addEventListener('click', function () {
  // Animate turbulence to 0.2, then back to 0.000001
  animateTurbulence(turbVal, 0.3, duration / 2, () => {
    animateTurbulence(0.3, 0.000001, duration / 2);
  });
});
