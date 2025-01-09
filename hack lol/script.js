const username = "player456";
const password = "tlw1234";
let progress = 0;
let round = 1;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;

    if (inputUsername === username && inputPassword === password) {
        // Hide login page and show GATCOD page
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("gatcodPage").style.display = "block";
    } else {
        document.getElementById("message").classList.remove("hidden");
        document.getElementById("message").textContent = "Access Denied";
    }
});

document.getElementById("gatcodButton").addEventListener("click", function() {
    // Hide GATCOD page and show progress page
    document.getElementById("gatcodPage").style.display = "none";
    document.getElementById("progressPage").style.display = "flex";
    startProgress();
});

function startProgress() {
    const progressBarInner = document.getElementById("progressBarInner");
    const progressText = document.getElementById("progressText");

    const interval = setInterval(() => {
        if (progress >= 100) {
            progressText.textContent = "100%";
            clearInterval(interval);
            if (round < 5) {
                round++;
                progress = 0;
                setTimeout(() => {
                    progressText.textContent = "0%";
                    startProgress();
                }, 1000);
            } else {
                // Complete after 5 rounds
                document.querySelector(".completion-message").style.opacity = 1;
                setTimeout(() => {
                    document.getElementById("progressPage").style.display = "none";
                    document.getElementById("completionPage").style.display = "block";
                    document.querySelector(".username-box").style.display = "block";
                    document.querySelector(".password-box").style.display = "block";
                }, 2000);
            }
        } else {
            progress += 2; // Slow down the progress
            progressBarInner.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        }
    }, 100);
}

document.getElementById("copyUsername").addEventListener("click", () => {
    const usernameField = document.getElementById("usernameInfo");
    const range = document.createRange();
    range.selectNode(usernameField);
    window.getSelection().addRange(range);
    document.execCommand("copy");
});

document.getElementById("copyPassword").addEventListener("click", () => {
    const passwordField = document.getElementById("passwordInfo");
    const range = document.createRange();
    range.selectNode(passwordField);
    window.getSelection().addRange(range);
    document.execCommand("copy");
});

// Expose the password in the console for the F12 hint
console.log("Hint: The password is 'tlw1234'");
