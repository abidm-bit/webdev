(function siteModifications() {
  const host = location.hostname;

  // Stack Overflow: Remove cookie banner
  function removeCookieBanner() {
    const banner = document.querySelector('div#onetrust-banner-sdk');
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }
  }

  // Hacker News: Style table#hnmain and td[bgcolor] elements, remove favicon
  function styleHackerNews() {
    const mainTable = document.querySelector('table#hnmain');
    if (mainTable) {
      mainTable.style.backgroundColor = '#eff6ff';
    }

    const bgcolorTds = document.querySelectorAll('table#hnmain td[bgcolor]');
    bgcolorTds.forEach(td => {
      td.style.backgroundColor = '#adeeef';
    });

    // Remove favicon
    const favicon = document.querySelector('link[rel=icon]');
    if (favicon && favicon.parentNode) {
      favicon.parentNode.removeChild(favicon);
    }
  }

  // Apply initial changes
  if (host === 'stackoverflow.com') {
    removeCookieBanner();
  } else if (host === 'news.ycombinator.com') {
    styleHackerNews();
  }

  // Watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    let needsUpdate = false;
    
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          
          if (host === 'stackoverflow.com') {
            if (node.id === 'onetrust-banner-sdk' || node.querySelector?.('#onetrust-banner-sdk')) {
              removeCookieBanner();
              needsUpdate = true;
            }
          } else if (host === 'news.ycombinator.com') {
            if (node.id === 'hnmain' || node.querySelector?.('#hnmain') || node.querySelector?.('td[bgcolor]')) {
              styleHackerNews();
              needsUpdate = true;
            }
          }
        }
      }
    }

    if (needsUpdate && host === 'stackoverflow.com') {
      // Remove additional CMP elements
      const overlay = document.getElementById('onetrust-pc-sdk');
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      const dimmer = document.getElementById('ot-sdk-cookie-policy');
      if (dimmer && dimmer.parentNode) dimmer.parentNode.removeChild(dimmer);
    }
  });

  try {
    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });
  } catch (e) {
    // no-op
  }
})();


