// Elements
const htmlEditor = document.getElementById('html-editor');
const cssEditor = document.getElementById('css-editor');
const jsEditor = document.getElementById('js-editor');
const output = document.getElementById('output');

// Initialize CodeMirror for HTML, CSS, JS editors with syntax highlighting
const htmlEditorCM = CodeMirror.fromTextArea(htmlEditor, {
    mode: "htmlmixed",
    lineNumbers: true,
    theme: "monokai",
    tabSize: 2
});

const cssEditorCM = CodeMirror.fromTextArea(cssEditor, {
    mode: "css",
    lineNumbers: true,
    theme: "monokai",
    tabSize: 2
});

const jsEditorCM = CodeMirror.fromTextArea(jsEditor, {
    mode: "javascript",
    lineNumbers: true,
    theme: "monokai",
    tabSize: 2
});

// Function to run code
function runCode() {
    try {
        output.innerHTML = ''; // Clear previous output
        const html = htmlEditorCM.getValue();
        const css = cssEditorCM.getValue();
        const js = jsEditorCM.getValue();

        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';  // Full width for the run window
        iframe.style.height = '100%';  // Full height for the run window
        iframe.style.border = 'none';
        output.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write('<html><head><style>' + css + '</style></head><body>');
        doc.write(html);
        doc.write('<script>' + js + '</script>');
        doc.write('</body></html>');
        doc.close();
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Automatically run the code every time the editor changes (real-time)
htmlEditorCM.on('change', runCode);
cssEditorCM.on('change', runCode);
jsEditorCM.on('change', runCode);

// Initial run of code on load
runCode();
