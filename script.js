// Function to validate GUID
function validateGUID(guid) {
    // Regular expression to check if string is a valid UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(guid);
  }

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('guid');
    const submitButton = this.querySelector('button[type="submit"]');
    const spinner = document.getElementById('spinner');
    const error = document.getElementById('error');
    const success = document.getElementById('success');

    success.style.display = 'none';
    input.disabled = true;
    submitButton.disabled = true;
    spinner.style.display = 'block';

    const isValid = validateGUID(input.value);

    setTimeout(() => {
        spinner.style.display = 'none';
        if (isValid) {
            input.disabled = false;
            submitButton.disabled = false;
            error.style.display = 'none';
            success.style.display = 'block';
        } else {
            input.disabled = false;
            submitButton.disabled = false;
            error.style.display = 'inline';
        }
    }, 2000);
});
