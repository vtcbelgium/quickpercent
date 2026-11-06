// Sovereign Toast Notification Utility

let toastContainer: HTMLElement | null = null;

function ensureContainer(): HTMLElement {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'sovereign-toast-container';
    toastContainer.setAttribute('role', 'region');
    toastContainer.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message: string, duration = 2800): void {
  const container = ensureContainer();
  const toast = document.createElement('div');
  toast.className = 'sovereign-toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;

  container.appendChild(toast);

  // Force reflow for CSS entry animation
  void toast.offsetWidth;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
        toastContainer = null;
      }
    }, 200);
  }, duration);
}
