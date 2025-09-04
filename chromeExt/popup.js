document.addEventListener('DOMContentLoaded', function() {
  const colorwayButtons = document.querySelectorAll('.colorway-btn');
  
  // Load saved colorway on popup open
  chrome.storage.sync.get(['selectedColorway'], function(result) {
    const savedColorway = result.selectedColorway || 'blue';
    updateActiveButton(savedColorway);
  });
  
  // Add click listeners to colorway buttons
  colorwayButtons.forEach(button => {
    button.addEventListener('click', function() {
      const colorway = this.dataset.colorway;
      
      // Save the selected colorway
      chrome.storage.sync.set({ selectedColorway: colorway }, function() {
        console.log('Colorway saved:', colorway);
      });
      
      // Update active button
      updateActiveButton(colorway);
      
      // Send message to content script to apply new colorway
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: 'changeColorway', 
            colorway: colorway 
          }, function(response) {
            if (chrome.runtime.lastError) {
              console.log('Content script not ready, will apply on next page load');
            }
          });
        }
      });
    });
  });
  
  function updateActiveButton(colorway) {
    colorwayButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.colorway === colorway) {
        btn.classList.add('active');
      }
    });
  }
});
