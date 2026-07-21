function comp(title, method, url, jsontxt){
  return `
  <div class="doc-box">
    <div class="doc-head">
      <h5 class="text-md">${title}</h5>
    </div>
    <div class="doc-content">
      <label>Method</label>
      <span class="method-badge">${method}</span>

      <label>Endpoint</label>
      <div class="code-wrapper">
        <code id="endpoint-${url.replace(/[^a-zA-Z0-9]/g, '')}">${url}</code>
        <button class="copy-btn" onclick="copyText('endpoint-${url.replace(/[^a-zA-Z0-9]/g, '')}')">Copy</button>
      </div>
      
      <p>Example Response:</p>
      <pre>${JSON.stringify(jsontxt, null, 2)}</pre>
    </div>
  </div>`
}

async function LoadDoc(){
  try {
    const res = await fetch('/doc.json');
    const data = await res.json();
    console.log(data);

    const container = document.querySelector('section#doc-card');
    data.forEach(item => {
      container.innerHTML += comp(item.title, item.method, item.url, item.response);
    });

  } catch(err) {
    console.error("Doc load error:", err);
  }
}

function copyText(id){
  let text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  let btn = event.target;
  btn.innerText = "Copied ✓";
  setTimeout(()=> btn.innerText = "Copy", 1500);
}

document.addEventListener('DOMContentLoaded', LoadDoc);