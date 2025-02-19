document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("rewrite").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          let editor = document.querySelector('[contenteditable="true"]');
          if (editor) {
            let rawText = editor.innerText;
            let prompt = `Rewrite the following blog post to make it viral for the trading community:\n\n${rawText}`;
            
            fetch("https://api.openai.com/v1/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
              },
              body: JSON.stringify({
                model: "gpt-4",
                prompt: prompt,
                max_tokens: 500
              })
            })
            .then(response => response.json())
            .then(data => {
              editor.innerText = data.choices[0].text;
            })
            .catch(error => console.error("Error:", error));
          }
        }
      });
    });
  });
});