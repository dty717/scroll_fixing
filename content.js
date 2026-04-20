// Only run on macOS
if (!navigator.userAgent.includes('Mac')) {
  console.log('Not on macOS, extension disabled');
  process.exit();
}

let lastScrollTime = 0;
const SCROLL_DEBOUNCE_TIME = 100; // milliseconds

// Detect if scroll is from mouse wheel (not trackpad)
// On Mac, trackpad scrolls have high frequency and smooth deltaY
// Mouse wheel scrolls have lower frequency and larger deltaY values
function isMouseWheelScroll(event) {
  const currentTime = Date.now();
  const timeSinceLastScroll = currentTime - lastScrollTime;
  lastScrollTime = currentTime;
  
  if (Math.abs(event.deltaY) < 100 && timeSinceLastScroll < 50) {
    return false; // trackpad scroll
  }
  
  return true;
}

document.addEventListener('wheel', (event) => {
  if (!isMouseWheelScroll(event)) {
    return; // Allow trackpad scrolling as-is
  }
  
  const target = event.target;
  const scrollableElement = getScrollableParent(target);
  
  if (event.deltaY > 0) {
    event.preventDefault();
    performPageDown(scrollableElement);
  } else if (event.deltaY < 0) {
    event.preventDefault();
    performPageUp(scrollableElement);
  }
}, { passive: false }); // passive: false allows preventDefault()

function getScrollableParent(element) {
  let el = element;
  
  while (el && el !== document.documentElement) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    
    if (overflowY === 'auto' || overflowY === 'scroll') {
      if (el.scrollHeight > el.clientHeight) {
        return el;
      }
    }
    
    el = el.parentElement;
  }
  
  return window;
}

function performPageDown(scrollableElement) {
  if (scrollableElement === window) {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  } else {
    scrollableElement.scrollBy({
      top: scrollableElement.clientHeight * 0.8,
      behavior: 'smooth'
    });
  }
}

function performPageUp(scrollableElement) {
  if (scrollableElement === window) {
    window.scrollBy({
      top: -window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  } else {
    scrollableElement.scrollBy({
      top: -scrollableElement.clientHeight * 0.8,
      behavior: 'smooth'
    });
  }
}

console.log('Mac Scroll Fixer extension loaded');
