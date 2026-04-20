// test-scroll.js

// Log scroll events to differentiate between trackpad and mouse wheel scrolls

let lastScrollTime = 0;

window.addEventListener('scroll', (event) => {
    const currentTime = Date.now();
    const deltaY = window.scrollY - (lastScrollTop || 0);

    // Log scroll delta and timing
    console.log(`Scroll Detected: deltaY = ${deltaY}, time = ${currentTime}`);

    lastScrollTop = window.scrollY;
    lastScrollTime = currentTime;
});

let lastScrollTop = 0;
