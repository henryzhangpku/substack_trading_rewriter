document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("rewrite").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: rewriteBlog
      });
    });
  });
});