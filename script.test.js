// Import the libraries and functions needed for testing
const { JSDOM } = require('jsdom');
const fs = require('fs');

// Read the HTML file and set it up in jsdom
const html = fs.readFileSync('./index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
global.document = dom.window.document;
global.window = dom.window;

// Include your script file
require('./script');

// Write your UI tests using Jest
test('Should validate and submit the form with a valid GUID', async () => {
    // Set up the initial state or simulate user interactions
    const input = document.getElementById('guid');
    const submitButton = document.querySelector('button[type="submit"]');

    input.value = '550e8400-e29b-41d4-a716-446655440000';

    // Trigger the form submission
    submitButton.click();

    // Write assertions based on the expected behavior
    expect(input.disabled).toBe(true)
    expect(submitButton.disabled).toBe(true)
    await new Promise((r) => setTimeout(r, 2000));
    const successMessage = document.getElementById('success');
    expect(successMessage.style.display).toBe('block');
    expect(input.disabled).toBe(false);
    expect(submitButton.disabled).toBe(false);
});

test('Should validate and show an error for an invalid GUID', async () => {
    // Set up the initial state or simulate user interactions
    const input = document.getElementById('guid');
    const submitButton = document.querySelector('button[type="submit"]');

    input.value = 'not-a-guid';

    // Trigger the form submission
    submitButton.click();

    // Write assertions based on the expected behavior
    expect(input.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);
    await new Promise((r) => setTimeout(r, 2000));
    const errorMessage = document.getElementById('error');
    expect(errorMessage.style.display).toBe('inline');
    expect(input.disabled).toBe(false);
    expect(submitButton.disabled).toBe(false);
});
