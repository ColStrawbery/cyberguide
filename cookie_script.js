// Define your custom colors and their associated cookie names
const riskLevels = {
    noRisk: '#caf500',
    mediumRisk: '#ffa500',
    highRisk: '#ff4500',
    extremeRisk: '#d0342c',
};

// Helper function to get a specific cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Immediately set the variable to avoid transitions
(function () {
    const root = document.documentElement;

    // Check for a cookie and apply the color before the page renders
    for (let level in riskLevels) {
        if (getCookie(level) === 'true') {
            root.style.setProperty('--cookiecolor', riskLevels[level]);
            break;
        }
    }
})();

// On page load, set the CSS variable again for safety
window.onload = function () {
    const root = document.documentElement;

    // Update the CSS variable based on the cookie
    for (let level in riskLevels) {
        if (getCookie(level) === 'true') {
            root.style.setProperty('--cookiecolor', riskLevels[level]);
            break;
        }
    }
};

// Handle button clicks to update cookies and the variable
document.querySelectorAll('.cookie-btn').forEach(button => {
    button.addEventListener('click', function () {
        const level = this.getAttribute('data-cookie');
        const root = document.documentElement;

        // Clear existing cookies
        Object.keys(riskLevels).forEach(level => {
            document.cookie = `${level}=false; path=/; max-age=0`;
        });

        // Set the new cookie for 30 days
        const expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `${level}=true; path=/; expires=${expires.toUTCString()}`;

        // Update the CSS variable dynamically
        root.style.setProperty('--cookiecolor', riskLevels[level]);
    });
});
