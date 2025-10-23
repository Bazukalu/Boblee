// ==========================
//  Global DOM Elements
// ==========================
const hubDiv = document.getElementById('hub');
const pagesDiv = document.getElementById('pages');

// ==========================
//  Page Templates
// ==========================
const pageTemplates = {
    encryption: `
    <div class="hero"><h2>Encrypt / Decrypt Text</h2><p>Securely encode or decode your text</p></div>
    <section class="section">
      <div class="card">
        <textarea id="input" placeholder="Enter text..." rows="5"></textarea>
        <div>
          <button onclick="encryptText()">Encrypt</button>
          <button onclick="decryptText()">Decrypt</button>
        </div>
        <pre id="output" class="output"></pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    password: `
    <div class="hero"><h2>Password Generator</h2><p>Create a random, strong password</p></div>
    <section class="section">
      <div class="card">
        <input id="length" type="number" min="4" max="64" value="12" />
        <button onclick="generatePassword()">Generate</button>
        <pre id="output" class="output"></pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    base64: `
    <div class="hero"><h2>Base64 Encode / Decode</h2><p>Convert text to and from Base64</p></div>
    <section class="section">
      <div class="card">
        <textarea id="input" placeholder="Enter text..." rows="5"></textarea>
        <div>
          <button onclick="base64Encode()">Encode</button>
          <button onclick="base64Decode()">Decode</button>
        </div>
        <pre id="output" class="output"></pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    random: `
    <div class="hero"><h2>Random Number Generator</h2><p>Generate random numbers between two values</p></div>
    <section class="section">
      <div class="card">
        <input id="min" type="number" placeholder="Min" />
        <input id="max" type="number" placeholder="Max" />
        <button onclick="randomNumber()">Generate</button>
        <pre id="output" class="output"></pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    colorpicker: `
    <div class="hero"><h2>Color Picker</h2><p>Select a color and see its value</p></div>
    <section class="section">
      <div class="card">
        <input id="color" type="color" value="#00aaff" onchange="pickColor()" />
        <pre id="output" class="output">#00aaff</pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    markdown: `
    <div class="hero"><h2>Markdown Previewer</h2><p>Write markdown and preview it live</p></div>
    <section class="section">
      <div class="card">
        <textarea id="input" placeholder="**Bold**, *Italic*, \`code\`..." rows="5" oninput="previewMarkdown()"></textarea>
        <div id="output" class="output"></div>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    calculator: `
    <div class="hero"><h2>Calculator</h2><p>Simple expression calculator</p></div>
    <section class="section">
      <div class="card">
        <input id="input" type="text" placeholder="e.g. (3 + 5) * 2" />
        <button onclick="calculate()">Calculate</button>
        <pre id="output" class="output"></pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    todo: `
    <div class="hero"><h2>To-Do List</h2><p>Keep track of tasks and remove them when done</p></div>
    <section class="section">
      <div class="card">
        <input id="todoInput" type="text" placeholder="New task..." />
        <button onclick="addTodo()">Add</button>
        <ul id="todoList"></ul>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    json: `
    <div class="hero"><h2>JSON Formatter</h2><p>Validate and pretty print your JSON</p></div>
    <section class="section">
      <div class="card">
        <textarea id="input" placeholder='{"name":"Bob"}' rows="5"></textarea>
        <button onclick="formatJSON()">Format</button>
        <pre id="output" class="output"></pre>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    qrcode: `
    <div class="hero"><h2>QR Code Generator</h2><p>Generate QR codes from text</p></div>
    <section class="section">
      <div class="card">
        <textarea id="input" placeholder="Enter text to encode..." rows="3"></textarea>
        <button onclick="generateQRCode()">Generate</button>
        <div id="output" class="output"></div>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    support: `
    <div class="hero"><h2>Support</h2><p>Need help? Reach out anytime.</p></div>
    <section class="section">
      <div class="card">
        <p>Email: support@example.com</p>
        <p>Phone: +123456789</p>
        <a href="#" class="exit" onclick="showPage('hub')">Exit</a>
      </div>
    </section>
  `,
    downloads: `
    <div class="hero"><h2>Downloads</h2><p>Get tools and resources</p></div>
    <section class="section">
      <div class="card">
        <a href="#" class="exit" onclick="showPage('hub')">Back</a>
      </div>
    </section>
  `
};

// ==========================
//  Page Switching
// ==========================
function showPage(page) {
    if (page === 'hub') {
        hubDiv.style.display = 'block';
        pagesDiv.style.display = 'none';
    } else {
        hubDiv.style.display = 'none';
        pagesDiv.style.display = 'block';
        pagesDiv.innerHTML =
            pageTemplates[page] ||
            `<h2>Page not found</h2><a href="#" class="exit" onclick="showPage('hub')">Exit</a>`;
    }
}

// ==========================
//  Tool Functions
// ==========================
function encryptText() {
    const text = document.getElementById('input').value;
    document.getElementById('output').innerText = btoa(text);
}

function decryptText() {
    try {
        const text = document.getElementById('input').value;
        document.getElementById('output').innerText = atob(text);
    } catch {
        document.getElementById('output').innerText = 'Invalid input!';
    }
}

function generatePassword() {
    const len = parseInt(document.getElementById('length').value, 10) || 12;
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < len; i += 1) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('output').innerText = password;
}

function base64Encode() {
    document.getElementById('output').innerText = btoa(
        document.getElementById('input').value
    );
}

function base64Decode() {
    try {
        document.getElementById('output').innerText = atob(
            document.getElementById('input').value
        );
    } catch {
        document.getElementById('output').innerText = 'Invalid Base64!';
    }
}

function randomNumber() {
    const min = parseInt(document.getElementById('min').value, 10) || 0;
    const max = parseInt(document.getElementById('max').value, 10) || 100;
    document.getElementById('output').innerText =
        Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickColor() {
    const c = document.getElementById('color').value;
    const o = document.getElementById('output');
    o.innerText = c;
    o.style.background = c;
}

function previewMarkdown() {
    let t = document.getElementById('input').value;
    t = t
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
    document.getElementById('output').innerHTML = t;
}

function calculate() {
    try {
        const r = eval(document.getElementById('input').value); // eslint-disable-line no-eval
        document.getElementById('output').innerText = r;
    } catch {
        document.getElementById('output').innerText = 'Invalid expression!';
    }
}

function addTodo() {
    const val = document.getElementById('todoInput').value;
    if (!val) return;
    const li = document.createElement('li');
    li.textContent = val;
    li.onclick = () => li.remove();
    document.getElementById('todoList').appendChild(li);
    document.getElementById('todoInput').value = '';
}

function formatJSON() {
    try {
        const obj = JSON.parse(document.getElementById('input').value);
        document.getElementById('output').innerText = JSON.stringify(obj, null, 2);
    } catch {
        document.getElementById('output').innerText = 'Invalid JSON!';
    }
}

function generateQRCode() {
    const text = encodeURIComponent(document.getElementById('input').value);
    const url = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${text}`;
    document.getElementById('output').innerHTML = `<img src="${url}" alt="QR Code">`;
}
