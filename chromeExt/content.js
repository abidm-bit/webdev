(function siteModifications() {
  const host = location.hostname;

  // Color schemes for different colorways (Hacker News only)
  const colorSchemes = {
    blue: {
      hackerNews: {
        mainBg: '#eff6ff',
        cellBg: '#adeeef',
        textColor: '#1e40af'
      }
    },
    green: {
      hackerNews: {
        mainBg: '#f0fdf4',
        cellBg: '#bbf7d0',
        textColor: '#166534'
      }
    },
    purple: {
      hackerNews: {
        mainBg: '#faf5ff',
        cellBg: '#d8b4fe',
        textColor: '#7c3aed'
      }
    },
    dark: {
      hackerNews: {
        mainBg: '#1e293b',
        cellBg: '#334155',
        textColor: '#f1f5f9'
      }
    }
  };

  // Get current colorway from storage
  function getCurrentColorway() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['selectedColorway'], function(result) {
        resolve(result.selectedColorway || 'blue');
      });
    });
  }

  // Apply colorway to Hacker News
  function styleHackerNews(colorway = 'blue') {
    const scheme = colorSchemes[colorway].hackerNews;
    
    const mainTable = document.querySelector('table#hnmain');
    if (mainTable) {
      mainTable.style.backgroundColor = scheme.mainBg;
    }

    const bgcolorTds = document.querySelectorAll('table#hnmain td[bgcolor]');
    bgcolorTds.forEach(td => {
      td.style.backgroundColor = scheme.cellBg;
    });

    // Apply text color to links and text
    const links = document.querySelectorAll('table#hnmain a');
    links.forEach(link => {
      link.style.color = scheme.textColor;
    });

    const textElements = document.querySelectorAll('table#hnmain td');
    textElements.forEach(td => {
      if (colorway === 'dark') {
        td.style.color = scheme.textColor;
      }
    });

    // Style comments on item pages
    const comments = document.querySelectorAll('.comment .commtext.c00');
    comments.forEach(comment => {
      if (colorway === 'dark') {
        comment.style.color = '#ffffff'; // White for dark mode
      } else {
        comment.style.color = ''; // Reset to default color for other colorways
      }
    });

    // Remove favicon
    const favicon = document.querySelector('img[src="y18.svg"]');
    if (favicon && favicon.parentNode) {
      favicon.parentNode.removeChild(favicon);
    }
  }


  // Stack Overflow: Remove cookie banner
  function removeCookieBanner() {
    const banner = document.querySelector('div#onetrust-banner-sdk');
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }
  }

  // Apply styles based on current colorway
  async function applyStyles() {
    if (host === 'stackoverflow.com') {
      removeCookieBanner();
    } else if (host === 'news.ycombinator.com') {
      const colorway = await getCurrentColorway();
      styleHackerNews(colorway);
    }
  }

  // Listen for colorway change messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeColorway') {
      const colorway = request.colorway;
      
      if (host === 'news.ycombinator.com') {
        styleHackerNews(colorway);
      }
      
      sendResponse({ success: true });
    }
  });

  // Apply initial changes
  applyStyles();

  // Watch for DOM changes
  const observer = new MutationObserver(async (mutations) => {
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
            if (node.id === 'hnmain' || node.querySelector?.('#hnmain') || node.querySelector?.('td[bgcolor]') || node.querySelector?.('.comment')) {
              const colorway = await getCurrentColorway();
              styleHackerNews(colorway);
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