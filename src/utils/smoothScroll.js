/**
 * Ultra-Smooth Momentum Scrolling Utility for Forest-AL
 * Provides buttery Framer-grade inertia and damped wheel interpolation
 */

export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let isRunning = false;
  let rafId = null;

  // Damping factor (0.09 - 0.12 gives luxury weighted momentum)
  const EASE = 0.095;
  const SPEED_FACTOR = 0.88;

  function update() {
    const diff = targetY - currentY;
    currentY += diff * EASE;

    window.scrollTo({
      top: Math.round(currentY * 10) / 10,
      behavior: 'auto',
    });

    if (Math.abs(diff) > 0.4) {
      rafId = requestAnimationFrame(update);
    } else {
      currentY = targetY;
      window.scrollTo({ top: targetY, behavior: 'auto' });
      isRunning = false;
    }
  }

  function onWheel(e) {
    // Never hijack when user holds Ctrl/Cmd (pinch to zoom) or Alt
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // Check if scrolling inside a scrollable container (modals, drawers, code blocks)
    const target = e.target;
    if (target && target.closest) {
      const scrollable = target.closest(
        '.modal-content, .menu-drawer, textarea, input, select, .scrollable-area'
      );
      if (scrollable) {
        // Let container scroll natively
        return;
      }
    }

    e.preventDefault();

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    targetY += e.deltaY * SPEED_FACTOR;
    targetY = Math.max(0, Math.min(targetY, maxScroll));

    if (!isRunning) {
      currentY = window.scrollY;
      isRunning = true;
      rafId = requestAnimationFrame(update);
    }
  }

  function onWindowScroll() {
    // If user scrolled via keyboard, scrollbar drag or hash, sync target
    if (!isRunning) {
      targetY = window.scrollY;
      currentY = window.scrollY;
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onWindowScroll, { passive: true });

  return () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('scroll', onWindowScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}
