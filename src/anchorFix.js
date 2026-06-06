const anchorMap = {
  services: '.services-section',
  work: '.work-section',
  about: '.about-section',
  contact: '.contact-section',
};

function syncAnchorTargets() {
  Object.entries(anchorMap).forEach(([id, selector]) => {
    const node = document.querySelector(selector);
    if (node && node.id !== id) node.id = id;
  });
}

syncAnchorTargets();
requestAnimationFrame(syncAnchorTargets);
window.addEventListener('load', syncAnchorTargets);

const observer = new MutationObserver(syncAnchorTargets);
observer.observe(document.documentElement, { childList: true, subtree: true });
