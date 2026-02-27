// Load version information
window.electron.getVersion().then(version => {
  document.getElementById('version').textContent = version;
  document.getElementById('version-page2').textContent = version;
  document.getElementById('footer-version').textContent = version;
});

// Load platform information
document.getElementById('platform').textContent = navigator.platform;

// Navigation between pages
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    
    // Update active button
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update active page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
  });
});

// Update status for update events
window.electron.onUpdateAvailable(() => {
  showUpdateStatus('Update available and downloading...', 'info');
});

window.electron.onUpdateDownloaded(() => {
  showUpdateStatus('Update downloaded! Click "Install Update" to apply changes.', 'success');
  showInstallButton();
});

window.electron.onUpdateError((message) => {
  showUpdateStatus('Update error: ' + message, 'error');
});

function showUpdateStatus(message, type) {
  const statusBox = document.getElementById('update-status');
  statusBox.textContent = message;
  statusBox.className = 'status-box ' + type;
  statusBox.style.display = 'block';
}

function showInstallButton() {
  // Create install button if it doesn't exist
  const statusBox = document.getElementById('update-status');
  if (!statusBox.querySelector('button')) {
    const button = document.createElement('button');
    button.textContent = 'Install Update Now';
    button.onclick = () => window.electron.installUpdate();
    button.style.marginTop = '10px';
    statusBox.appendChild(button);
  }
}

// Check for updates on page load
window.addEventListener('load', () => {
  console.log('Application loaded. Checking for updates...');
});
