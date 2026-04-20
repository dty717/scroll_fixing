const statusEl = document.getElementById('status');

if (navigator.userAgent.includes('Mac')) {
  statusEl.textContent = '✓ Running on macOS';
  statusEl.style.backgroundColor = '#e8f5e9';
} else {
  statusEl.textContent = '✗ Not on macOS (extension disabled)';
  statusEl.style.backgroundColor = '#ffebee';
}