// underliner logic
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase(); // Normalize path to lowercase
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const linkHref = link.getAttribute('href').replace('.html', '').toLowerCase(); // Normalize link path to lowercase
  
        // Match the current page with the link
        if (linkHref === currentPage || (linkHref === 'start' && currentPage === 'index')) {
            item.classList.add('active');
        }
    });
  });
  
  // Header hide/show logic
  document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    let lastScrollPosition = 0;
    let scrollThreshold = 10;  // Minimum scroll distance to trigger hide/show
    let topThreshold = 50;    // Larger threshold at the top of the page

    function handleScroll() {
        const currentScrollPosition = window.scrollY;
        const scrollDifference = Math.abs(currentScrollPosition - lastScrollPosition);

        // Disable hiding on mobile (screen width <= 768px)
        if (window.innerWidth > 768) {
            // Use different thresholds based on scroll position
            const activeThreshold = currentScrollPosition < 200 ? topThreshold : scrollThreshold;

            if (scrollDifference > activeThreshold) {
                if (currentScrollPosition > lastScrollPosition) {
                    // Scrolling down
                    header.classList.add('hidden');
                } else {
                    // Scrolling up
                    header.classList.remove('hidden');
                }
                
                // Update last scroll position only when threshold is exceeded
                lastScrollPosition = currentScrollPosition;
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
});

document.addEventListener('scroll', () => {
    const infoContainer = document.querySelector('.info-section--info');
    const fadePoint = 800; // The point where fading starts (in pixels)
    const scrollTop = window.scrollY;
  
    // Calculate opacity based on scroll position
    const opacity = Math.max(1 - scrollTop / fadePoint, 0);
    infoContainer.style.opacity = opacity;
  });
  

// reveal resetter
document.addEventListener('DOMContentLoaded', function() {
    const resetter = document.getElementById('resetter');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
  
        if (scrollPosition > 300) {
            resetter.classList.add('shown');
        } else {
            resetter.classList.remove('shown');
        }
    });
  });


//-------------------------------
function scrollToTop() {
window.scrollTo({
    top: 0,
    behavior: 'smooth' // Adds a smooth scrolling effect
    
});
}

  // Define custom colors based on risk levels
  const riskLevels = {
    noRisk: '#7acf30',       // Niedriges Risiko
    mediumRisk: '#ffa500',   // Mittleres Risiko
    highRisk: '#ff4500',     // Hohes Risiko
    extremeRisk: '#d0342c',  // Extrem hohes Risiko
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
    const score = getCookie('cyberRiskScore');
    if (score) {
        setColorBasedOnScore(score);
    }
})();

// On page load, set the CSS variable again for safety
window.onload = function () {
    const score = getCookie('cyberRiskScore');
    if (score) {
        setColorBasedOnScore(score);
    }
};

// Function to apply the color based on the score
function setColorBasedOnScore(score) {
    const root = document.documentElement;

    // Define the color based on the score
    let color;
    if (score <= 5) {
        color = riskLevels.noRisk;
    } else if (score <= 15) {
        color = riskLevels.mediumRisk;
    } else if (score <= 25) {
        color = riskLevels.highRisk;
    } else {
        color = riskLevels.extremeRisk;
    }

    // Set the color variable in the CSS
    root.style.setProperty('--cookiecolor', color);
}




//-------------------------------

// Open Nav on mobile
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerIcon = burgerMenu.querySelector('.burger-icon');
  const mobileNav = document.querySelector('.mobile-nav');

  burgerMenu.addEventListener('click', () => {
      // Toggle the mobile nav
      mobileNav.classList.toggle('active');

      // Swap the burger icon image
      if (mobileNav.classList.contains('active')) {
          burgerIcon.src = 'files/nav_close.svg'; // Change to open icon
          burgerIcon.alt = 'Close Menu';
      } else {
          burgerIcon.src = 'files/nav_open.svg'; // Change back to closed icon
          burgerIcon.alt = 'Open Menu';
      }
  });
});



//FAQ panel
document.querySelectorAll('.faq-accordion').forEach(button => {
    button.addEventListener('click', () => {
        // Toggle active state for button
        button.classList.toggle('active');
        const panel = button.nextElementSibling;
        
        // Toggle panel-open class
        panel.classList.toggle('panel-open');
        
        // If we're opening this panel
        if (button.classList.contains('active')) {
            panel.style.maxHeight = panel.scrollHeight + "px";
            
            // Optional: Close other panels
            document.querySelectorAll('.faq-accordion').forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    const otherPanel = otherButton.nextElementSibling;
                    otherPanel.classList.remove('panel-open');
                    otherPanel.style.maxHeight = "0px";
                }
            });
            
        } else {
            panel.style.maxHeight = "0px";
        }
    });
});



//Footer mobile accordion
document.querySelectorAll('.accordion').forEach(button => {
  button.addEventListener('click', () => {
      // First toggle the active state
      button.classList.toggle('active');
      const panel = button.nextElementSibling;
      
      // If we're opening this panel
      if (button.classList.contains('active')) {
          panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
          panel.style.maxHeight = "0px";
      }
  });
});




//-------------------------------------------------


//#region Quiz


// First, declare global variables
let currentQuestion = 0;
let answers = {};

// Then define the questions array
const questions = [
    {
        id: 1,
        type: 'button',
        question: "Wie verwalten Sie Ihre Zugangsdaten?",
        options: [
            { text: "Passwort-Manager mit generierten Passwörtern.", score: 0 },
            { text: "Unterschiedliche komplexe Passwörter, selbst verwaltet.", score: 1 },
            { text: "Wenige Basis-Passwörter mit Variationen.", score: 2 },
            { text: "Überall gleiche oder ähnliche Passwörter.", score: 3 },
        ],
        category: "passwords",
    },
    {
        id: 2,
        type: 'button',
        question: "Wie gehen Sie mit Software-Updates um?",
        options: [
            { text: "Automatische Updates für alles.", score: 0 },
            { text: "Automatische Updates für Betriebssystem und Browser.", score: 1 },
            { text: "Manuelle Updates bei Erinnerung.", score: 2 },
            { text: "Updates werden ignoriert.", score: 3 }
        ],
        category: "updates",
    },
    {
        id: 3,
        type: 'button',
        question: "Wie sind Ihre Passwörter aufgebaut?",
        options: [
            { text: "Nur Kleinbuchstaben.", score: 3 },
            { text: "Klein- und Großbuchstaben.", score: 2 },
            { text: "Buchstaben und Zahlen.", score: 2 },
            { text: "Buchstaben, Zahlen und Symbole.", score: 0 }
        ],
        category: "passwords",
    },
    {
        id: 4,
        type: 'button',
        question: "Meine Passwörter bestehen aus:",
        options: [
            { text: "Worten", score: 3 },
            { text: "Zahlen", score: 3 },
            { text: "Worten und Zahlen", score: 1 },
            { text: "Zufälligen Charakteren", score: 0 }
        ],
        category: "passwords"
    },
    {
        id: 5,
        type: 'button',
        question: "Ich nutze Zwei-Faktor-Authentifizierung:",
        options: [
            { text: "Ja, für alle wichtigen Konten", score: 0 },
            { text: "Ja, aber nur für einige", score: 2 },
            { text: "Nein", score: 3 },
            { text: "Ich weiß nicht, was 2FA ist", score: 3 }
        ],
        category: "mfa"
    },
    {
        id: 6,
        type: 'button',
        question: "Ich nutze einen Administrator Account <br>am Computer.",
        options: [
            { text: "Ja", score: 3 },
            { text: "Nein", score: 0 },
        ],
        category: "admin",
    },
    {
        id: 7,
        type: 'button',
        question: "Wie gehen Sie mit Ihren persönlichen Daten in sozialen Medien um?",
        options: [
            { text: "Strenge Privatsphäre-Einstellungen, minimale Informationen", score: 0 },
            { text: "Standard-Privatsphäre-Einstellungen", score: 1 },
            { text: "Meist öffentlich, aber keine sensiblen Daten", score: 2 },
            { text: "Alles ist öffentlich sichtbar", score: 3 }
        ],
        category: "socialmedia",
    },
    {
        id: 8,
        type: 'button',
        question: "Wie verhalten Sie sich in öffentlichen WLAN-Netzwerken?",
        options: [
            { text: "Ich vermeide sie", score: 0 },
            { text: "Ich nutze sie nur für alltägliche Dinge (Musik, Webrecherche)", score: 2 },
            { text: "Ich nutze sie auch für Banking und Shopping", score: 3 },
            { text: "Ich benutze immer ein VPN", score: 0 }
        ],
        category: "publicwifi",
    },
];

document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.querySelector(".quiz-container");
    const quiz = document.getElementById("quiz");
    const progressBar = document.getElementById("progress-bar");
    const results = document.getElementById("results");

    // Check if the cookie exists to determine if intro has been viewed
    const introSeen = getCookie("introSeen");

    if (introSeen === "true") {
        // Skip intro and show quiz immediately
        if (window.innerWidth > 768) {
            quizContainer.style.height = `530px`;
        } 
        quiz.style.display = "block";
        progressBar.style.display = "block";
        results.style.display = "none";
        quiz.style.opacity = "1"; // Fade in Quiz
        quiz.style.pointerEvents = "auto";
        results.style.pointerEvents = "auto";
        loadProgress();
    } else if (window.innerWidth > 768) {
        // Create the Intro HTML content if intro has not been seen
        const introScreen = document.createElement("div");
        introScreen.id = "quiz-intro";
        introScreen.style.opacity = "1";
        introScreen.style.transition = "opacity 0.5s ease-in-out";
        introScreen.innerHTML = `
            <div class="info-context">
                <h1 class="info-header">STARTEN<br>SIE IHREN<br>CHECK&nbsp;&rarr;</h1>
                <p class="header-p header-p--quiz2">
                    Erfahren sie in unserem Quiz, wie sicher Sie im Internet unterwegs sind. <br> 
                    Wir geben Ihnen Tipps, wie Sie Ihre Sicherheit im Netz verbessern können. <br>
                    <strong>Der Risiko-Check dauert nicht länger als 3 Minuten.</strong>        
                </p>
            </div>
        `;

        // Insert the Intro before the quiz content
        quizContainer.insertBefore(introScreen, quiz);
        quizContainer.style.transition = "all 3s ease";
        quizContainer.style.backgroundColor = "var(--yellow)";

        // Hide Quiz Initially
        quiz.style.opacity = "0";
        quiz.style.display = "none";
        quiz.style.transition = "opacity 0.3s ease";

        // Adjust Quiz Container Initial Height
        quizContainer.style.height = "30vw";
        quizContainer.style.transition = "all 0.3s ease";
        quizContainer.style.cursor = "pointer";

        // Change border color on hover
        quizContainer.addEventListener('mouseover', () => {
            if (introScreen.style.opacity === "1") {
                quizContainer.style.borderColor = "var(--footer)";
            }
        });

        // Reset border color when mouse leaves
        quizContainer.addEventListener('mouseleave', () => {
            if (introScreen.style.opacity === "1") {
                quizContainer.style.borderColor = ""; // Reset to original border color
            }
        });

        // Start Button Event
        introScreen.addEventListener("click", function () {
            // Set the cookie to mark the intro as seen
            setCookie("introSeen", "true", 365); // Set cookie for 1 year

            // Fade out Intro
            introScreen.style.opacity = "0";

            setTimeout(() => {
                introScreen.remove(); // Remove intro from DOM
                if (window.innerWidth > 768) {
                    quizContainer.style.height = `530px`;
                } 
                quizContainer.style.backgroundColor = "white";
                quizContainer.style.border = "solid 2px var(--border2)";
                quizContainer.style.cursor = "default";
                setTimeout(() => {
                    quiz.style.display = "block";
                    progressBar.style.display = "block";
                    results.style.display = "none";
                    quiz.style.opacity = "1"; // Fade in Quiz
                    quiz.style.pointerEvents = "auto";
                    results.style.pointerEvents = "auto";
                    restartQuiz(); // Start the quiz
                }, 200);
            }, 500);
        });
    }
});


// Reset the introSeen cookie on "R" key press
window.addEventListener("keydown", function(event) {
    if (event.key === "r" || event.key === "R") {
        // Reset the cookie
        setCookie("introSeen", "", -1); // Delete the cookie by setting it to an empty string and expiration date in the past
        location.reload(); // Reload the page to see the intro again
    }
});


// Define scoring functions first
function calculateQuestionScore(question) {
    const answer = answers[question.id];

    // Check if answer is undefined (not answered yet)
    if (!answer) {
        return 3; // Assign default score (or 0 if desired)
    }
    let score;
    switch(question.type) {
        case 'button':
            score = answer.score;
            break;
        case 'range':
            score = question.calculateScore(answer);
            break;
        default:
            score = 3;
    }
    return score;
}

function calculateTotalScore() {
    
    const maxScorePerQuestion = 3;
    const totalPossibleScore = questions.length * maxScorePerQuestion;
    
    let totalScore = 0;
    questions.forEach(question => {
        const questionScore = calculateQuestionScore(question);
        totalScore += questionScore;
    });
    
    
    // Convert to risk percentage (0 score = 5% risk, max score = 100% risk)
    const riskPercentage = 5 + ((totalScore / totalPossibleScore) * 95);
    const roundedRisk = Math.round(riskPercentage);
    
    return roundedRisk;
}

// Cookie functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + JSON.stringify(value) + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            try {
                return JSON.parse(c.substring(nameEQ.length, c.length));
            } catch (e) {
                return null;
            }
        }
    }
    return null;
}

// UI creation functions
function createButtonGroup(container, question) {
    const group = document.createElement('div');
    group.className = 'button-group';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-button';
        button.textContent = option.text;
        
        if (answers[question.id] && answers[question.id].text === option.text) {
            button.classList.add('selected');
        }
        
        button.onclick = () => {
            group.querySelectorAll('.answer-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            button.classList.add('selected');
            
            answers[question.id] = option;
            document.getElementById('nextBtn').disabled = false;
            document.getElementById('nextBtn-mobile').disabled = false;
            saveProgress();
        };
        
        group.appendChild(button);
    });
    
    container.appendChild(group);
}

function createRadioGroup(container, question) {
    const group = document.createElement('div');
    group.className = 'radio-group';
    
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'radio-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'quiz-question';
        input.value = index;
        input.onchange = () => {
            answers[question.id] = option;
            document.getElementById('nextBtn').disabled = false;
            document.getElementById('nextBtn-mobile').disabled = false;
            saveProgress();
        };
        
        label.appendChild(input);
        label.appendChild(document.createTextNode(option.text));
        group.appendChild(label);
    });
    
    container.appendChild(group);
}


// Navigation and state management functions
function updateQuestion() {
    const question = questions[currentQuestion];
    const questionElement = document.querySelector('.quiz-question');
    const container = document.querySelector('.quiz-answer-container');
    
    if (!questionElement || !container) {
        console.error('Required elements not found');
        return;
    }

    questionElement.innerHTML = question.question;
    container.innerHTML = '';
    
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    const nextBtnMobile = document.getElementById('nextBtn-mobile');
    nextBtnMobile.disabled = true;

    switch(question.type) {
        case 'radio':
            createRadioGroup(container, question);
            break;
        case 'button':
            createButtonGroup(container, question);
            break;
    }

    const progressFill = document.querySelector('.quiz-progress-fill');
    if (progressFill) {
        progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
    }
    
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
    }

    const prevBtnMobil = document.getElementById('prevBtn-mobile');
    if (prevBtnMobil) {
        prevBtnMobil.disabled = currentQuestion === 0;
    }
    
    if (answers[question.id]) {
        loadSavedAnswer(question);
    }
}

function loadSavedAnswer(question) {
    const savedAnswer = answers[question.id];
    if (!savedAnswer) return;

    switch(question.type) {
        case 'radio':
            const radioIndex = question.options.findIndex(opt => opt.text === savedAnswer.text);
            if (radioIndex >= 0) {
                const radios = document.querySelectorAll('input[type="radio"]');
                radios[radioIndex].checked = true;
            }
            break;
        case 'range':
            const slider = document.querySelector('input[type="range"]');
            if (slider) {
                slider.value = savedAnswer;
            }
            break;
        case 'button':
            const buttons = document.querySelectorAll('.answer-button');
            const selectedIndex = question.options.findIndex(opt => opt.text === savedAnswer.text);
            if (selectedIndex >= 0) {
                buttons[selectedIndex].classList.add('selected');
            }
            break;
    }
    document.getElementById('nextBtn').disabled = false;
    document.getElementById('nextBtn-mobile').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    } else {
        showResults();
        
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('quiz-nav-mobile').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    const tips = document.getElementById('tips');
    tips.style.display = 'block';  // Make the element visible
    setTimeout(() => {
        tips.style.opacity = 1;   // Fade in by changing opacity
    }, 10);  // Small delay to trigger the transition effect
    
    const progressFill = document.querySelector('.quiz-progress-bar');
    if (progressFill) {
        progressFill.style.display = 'none';
    }
    
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.style.height = `auto`;
        quizContainer.style.backgroundColor = 'var(--pink)';
        quizContainer.style.borderColor = 'var(--red)';
    }

    if (window.innerWidth <= 768) {
        document.getElementById('repeat-quiz-btn-mobile').style.display = 'flex';
    }
    
    const riskScore = calculateTotalScore();

    const skalaFill = document.querySelector('.skala-fill');
    if (skalaFill) {
        skalaFill.style.width = `${riskScore}%`;
        skalaFill.style.opacity = 0.25 + (riskScore - 5) * (1 - 0.25) / (100 - 5);
    }
    
    const title = document.querySelector('.score');
    if (title) {
        title.innerHTML = `
                <h1 class="info-header score-demo">IHR RISIKO <br>LIEGT BEI <br><span class="cta-highlight">${riskScore} PROZENT</span></h1>
        `;
    }

    const recommendationsDiv = document.getElementById('recommendations');

    // Determine the message based on the riskScore
    let message = '';
    
    if (window.innerWidth > 768) {
        if (riskScore <= 15) {
            // Very Low Risk (5% - 15%)
            message = `
                <p class="header-p score-text"><strong>Ihre Sicherheitsvorkehrungen sind sehr gut!</strong> Ein Risiko von nur <strong>${riskScore}%</strong> zeigt, <br>dass Sie einen soliden Schutz haben.
                <strong>Weiter so!</strong> Achten Sie weiterhin darauf, <br>regelmäßige Updates durchzuführen und Sicherheitsrichtlinien zu überprüfen.</p>
            `;
        } else if (riskScore <= 35) {
            // Medium Risk (16% - 50%)
            message = `
                <p class="header-p score-text"><strong>Ihre Sicherheitsvorkehrungen sind ein guter Start.</strong> Ein Risiko von <strong>${riskScore}%</strong> zeigt,<br> 
                dass einige Maßnahmen noch fehlen, um Ihre Cyber-Hygiene zu optimieren.<br>
                Wir empfehlen, <strong>zusätzliche Schutzmaßnahmen</strong> zu ergreifen.</p>
                `;
        } else if (riskScore <= 75) {
            // Medium-High Risk (51% - 75%)
            message = `
                        <p class="header-p score-text"><strong>Achtung, hohes Risiko!</strong> Ein Risiko von <strong>${riskScore}%</strong> zeigt, dass es an der Zeit ist, Ihre<br>
                    Sicherheitsvorkehrungen grundlegend zu überdenken und rechtzeitig zu handeln. <br> 
                    Die nächsten Schritte sollten darauf abzielen, Ihre <strong>Sicherheitsvorkehrungen</strong> auf ein <br>höheres Niveau <strong>zu heben</strong>, um <strong>ernsthafte Angriffsmöglichkeiten zu vermeiden.</strong></p>
                   `;
        } else {
            // High Risk (76% - 100%)
            message = `
                    <p class="header-p score-text"><strong>Achtung, sehr hohes Risiko!</strong> Ein Risiko von <strong>${riskScore}%</strong> zeigt, dass <strong>dringend<br>
                        wichtige Verbesserungen</strong> bei Ihren Sicherheitsvorkehrungen erforderlich sind. <br> 
                        Wir empfehlen Ihnen, <strong>sofort die untenstehenden Maßnahmen</strong> zu ergreifen!</p>   
            `;
        }
    } else {
        if (riskScore <= 15) {
            // Very Low Risk (5% - 15%)
            message = `
                <p class="header-p score-text"><strong>Ihre Sicherheitsvorkehrungen sind sehr gut!</strong> Ein Risiko von nur <strong>${riskScore}%</strong> zeigt, dass Sie einen soliden Schutz haben. <strong>Weiter so!</strong> Achten Sie weiterhin darauf, regelmäßige Updates durchzuführen und Sicherheitsrichtlinien zu überprüfen.</p>
            `;
        } else if (riskScore <= 35) {
            // Medium Risk (16% - 50%)
            message = `
                <p class="header-p score-text"><strong>Ihre Sicherheitsvorkehrungen sind ein guter Start.</strong> Ein Risiko von <strong>${riskScore}%</strong> zeigt, dass einige Maßnahmen noch fehlen, um Ihre Cyber-Hygiene zu optimieren. Wir empfehlen, <strong>zusätzliche Schutzmaßnahmen</strong> zu ergreifen.</p>
            `;
        } else if (riskScore <= 75) {
            // Medium-High Risk (51% - 75%)
            message = `
                <p class="header-p score-text"><strong>Achtung, hohes Risiko!</strong> Ein Risiko von <strong>${riskScore}%</strong> zeigt, dass es an der Zeit ist, Ihre Sicherheitsvorkehrungen grundlegend zu überdenken und rechtzeitig zu handeln. Die nächsten Schritte sollten darauf abzielen, Ihre <strong>Sicherheitsvorkehrungen</strong> auf ein höheres Niveau <strong>zu heben</strong>, um <strong>ernsthafte Angriffsmöglichkeiten zu vermeiden.</strong></p>
            `;
        } else {
            // High Risk (76% - 100%)
            message = `
                <p class="header-p score-text"><strong>Achtung, sehr hohes Risiko!</strong> Ein Risiko von <strong>${riskScore}%</strong> zeigt, dass <strong>dringend wichtige Verbesserungen</strong> bei Ihren Sicherheitsvorkehrungen erforderlich sind. Wir empfehlen Ihnen, <strong>sofort die untenstehenden Maßnahmen</strong> zu ergreifen!</p>
            `;
        }        
    }


    
    // Insert the determined message into the recommendations div
    recommendationsDiv.innerHTML = message;
    
        // After setting the risk score and message, add security tips
        const highRiskAreas = analyzeHighRiskAnswers();
        const tipsContainer = document.getElementById('tips');
        
        if (tipsContainer) {
            let tipsHTML = ''; // Start with an empty string
        
            if (highRiskAreas.length > 0) {
                tipsHTML += `
                    <div class="tips-div">
                        <p class="topic-above-header">Risiko-Check</p>
                        <h2 class="topic-header">Ihre größten Risiken:</h2>
                `;
        
                highRiskAreas.forEach(area => {
                    const categoryTips = securityTips[area.category];
                    if (categoryTips) {
                        tipsHTML += `
                            <h3 class="topic-text-side active always-expanded">${categoryTips.title}</h3>
                            <ul class="topic-text risiko-check-tip">
                                ${categoryTips.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        `;
                    }
                });
        
                tipsHTML += `</div>`; // Close the tips-div
            }
            
            tipsContainer.innerHTML = tipsHTML;
        }
}

// Modify restartQuiz to clear all saved progress
function restartQuiz() {

    if (window.innerWidth <= 768) {
        document.getElementById('repeat-quiz-btn-mobile').style.display = 'none';
    }
    // Clear all quiz-related cookies
    document.cookie = 'quizAnswers=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'currentQuestion=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'quizState=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Reset quiz state
    currentQuestion = 0;
    answers = {};

    // Reset UI
    document.getElementById('results').style.display = 'none';
    document.getElementById('tips').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    if (window.innerWidth <= 768) {
        document.getElementById('quiz-nav-mobile').style.display = 'flex';
    }
    
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        if (window.innerWidth > 768) {
            quizContainer.style.height = `530px`;
        }

        quizContainer.style.backgroundColor = 'white';
        quizContainer.style.borderColor = 'var(--border2)';
    }

    const progressFill = document.querySelector('.quiz-progress-bar');
    if (progressFill) {
        progressFill.style.display = 'block';
    }

    updateQuestion();
}

function saveProgress() {
    // Save answers
    setCookie('quizAnswers', answers, 7);
    
    // Save current question
    setCookie('currentQuestion', currentQuestion, 7);
    
    // Save the quiz state (completed or in progress)
    setCookie('quizState', {
        isCompleted: document.getElementById('results').style.display === 'block',
        riskScore: calculateTotalScore() // Optional: save risk score if already calculated
    }, 7);
}

// Enhance loadProgress function
function loadProgress() {
    const savedAnswers = getCookie('quizAnswers');
    const savedQuestion = getCookie('currentQuestion');
    const savedQuizState = getCookie('quizState');

    // Restore answers
    if (savedAnswers) {
        answers = savedAnswers;
    }

    // Restore current question
    if (savedQuestion !== null) {
        currentQuestion = savedQuestion;
    }

    // Restore quiz state
    if (savedQuizState) {
        if (savedQuizState.isCompleted) {
            showResults();
        } else {
            // If quiz was in progress, update the question
            document.getElementById('quiz').style.display = 'block';
            document.getElementById('results').style.display = 'none';
        }
    }

    // Update the question display
    updateQuestion();
}

// Modify the existing event listeners to call saveProgress
document.addEventListener('DOMContentLoaded', function() {
    // First, try to load any existing progress
    loadProgress();

    // Set up event listeners to save progress on each interaction
    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(button => {
        button.addEventListener('click', saveProgress);
    });

    const nextButton = document.getElementById('nextBtn');
    if (nextButton) {
        nextButton.addEventListener('click', saveProgress);
    }

    const nextButtonMobile = document.getElementById('nextBtn-mobile');
    if (nextButtonMobile) {
        nextButtonMobile.addEventListener('click', saveProgress);
    }

    const prevButton = document.getElementById('prevBtn');
    if (prevButton) {
        prevButton.addEventListener('click', saveProgress);
    }

    const prevButtonMobile = document.getElementById('prevBtn-mobile');
    if (prevButtonMobile) {
        prevButtonMobile.addEventListener('click', saveProgress);
    }
});

document.addEventListener('keydown', (e) => {
    if (document.getElementById('quiz').style.display !== 'none') {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        switch(e.key) {
            case 'ArrowRight':
                if (!nextBtn.disabled) {
                    nextQuestion();
                }
                break;
            case 'ArrowLeft':
                if (!prevBtn.disabled) {
                    previousQuestion();
                }
                break;
        }
    }
});

// First, let's define tips for each category
const securityTips = {
    passwords: {
        title: "Passwort-Sicherheit",
        tips: [
            "Nutzen Sie einen Passwort-Manager",
            "Erstellen Sie für jeden Account ein einzigartiges Passwort",
            "Nutzen Sie zufällige Passwörter mit mindestens 12 Zeichen",
            "Kombinieren Sie Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen"
        ]
    },
    updates: {
        title: "Software-Updates",
        tips: [
            "Aktivieren Sie automatische Updates für Ihr Betriebssystem",
            "Halten Sie alle ihre Programme und Apps auf dem neuesten Stand",
            "Überprüfen Sie regelmäßig auf verfügbare Updates",
            "Deinstallieren Sie Software, die Sie nicht mehr nutzen"
        ]
    },
    mfa: {
        title: "Zwei-Faktor-Authentifizierung",
        tips: [
            "Aktivieren Sie 2FA für alle Konten",
            "Nutzen Sie eine Authenticator-App",
            "Vermeiden Sie die Verwendung von SMS als zweiten Faktor"
        ]
    },
    admin: {
        title: "Administratorrechte",
        tips: [
            "Erstellen Sie einen separaten Account für ihren täglichen Gebrauch",
            "Nutzen Sie den Admin-Account nur für systemrelevante Änderungen",
            "Vergeben Sie starke, unterschiedliche Passwörter für beide dieser Konten",
        ]
    },
    socialmedia: {
        title: "Social Media Sicherheit",
        tips: [
            "Überprüfen Sie Ihre Privatsphäre-Einstellungen regelmäßig",
            "Teilen Sie keine sensiblen persönlichen Informationen",
            "Seien Sie Kontaktanfragen von Unbekannten gegenüber misstrauisch",
        ]
    },
    publicwifi: {
        title: "Öffentliche WLAN-Netzwerke",
        tips: [
            "Benutzen Sie immer ein VPN",
            "Vermeiden Sie sensible Aktivitäten wie Online-Banking oder E-Mails",
            "Deaktivieren Sie automatische WLAN-Verbindungen",
            "Stellen Sie sicher, dass Sie sich mit dem korrekten Netzwerk verbinden"
        ]
    }
};

// Function to analyze high-risk answers
function analyzeHighRiskAnswers() {
    const highRiskCategories = new Map();
    
    let totalRiskScore = 0;
    let totalPossibleScore = 0;
    
    const maxScore = 3; // Maximale Punktzahl pro Frage

    // Analysiere jede Antwort
    questions.forEach(question => {
        const answer = answers[question.id];
        if (answer && answer.score >= 2) { // Nur riskante Antworten berücksichtigen
            const category = question.category;
            
            // Gesamt-Risikoscore berechnen
            totalRiskScore += answer.score;
            totalPossibleScore += maxScore;

            // Kategorie-bezogene Risikodaten speichern
            if (!highRiskCategories.has(category)) {
                highRiskCategories.set(category, {
                    score: answer.score,
                    count: 1
                });
            } else {
                const current = highRiskCategories.get(category);
                highRiskCategories.set(category, {
                    score: current.score + answer.score,
                    count: current.count + 1
                });
            }
        }
    });

    // Berechne den Gesamtrisikoscore in Prozent
    const overallRiskPercentage = totalPossibleScore > 0 ? (totalRiskScore / totalPossibleScore) * 100 : 0;

    // Kategorien nach Risikowert sortieren
    const sortedCategories = Array.from(highRiskCategories.entries())
        .map(([category, data]) => ({
            category,
            averageScore: data.score / data.count
        }))
        .sort((a, b) => b.averageScore - a.averageScore);

    // Falls der Gesamtrisikoscore ≥ 75 %, alle Kategorien zurückgeben
    return overallRiskPercentage >= 75 ? sortedCategories : sortedCategories.slice(0, 3);
}


// Ensure progress is saved before leaving the page
window.addEventListener('beforeunload', saveProgress);



// #endregion
//-------------------------------------------------

//#region Themen
document.addEventListener("DOMContentLoaded", function () {
    // All clickable headers and expandable content
    const textSideHeaders = document.querySelectorAll(".topic-text-side");
    const expandableTexts = document.querySelectorAll(".expandable");

    // Function to toggle visibility of a specific section
    function toggleSection(target) {
        const content = document.getElementById(target);
        const header = document.querySelector(`[data-target="${target}"]`);

        // Toggle the 'expanded' class on the content
        const isExpanded = content.classList.toggle("expanded");

        // Update the arrow direction
        if (isExpanded) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }

    // Add click event to headers
    textSideHeaders.forEach((header) => {
        const target = header.dataset.target;

        if (!header.classList.contains("always-expanded")) {
            header.addEventListener("click", () => toggleSection(target));
        }
    });
});


//#endregion


// Select all the accessibility options
const accessibilityLinks = document.querySelectorAll('.accessibility');
// Add click event listener to each link
accessibilityLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action of the link
        // Toggle 'active' and 'inactive' classes
        if (link.classList.contains('activated')) {
            link.classList.remove('activated');
            link.classList.add('inactivated');
        } else {
            link.classList.remove('inactivated');
            link.classList.add('activated');
        }
    });
});


function scrollToQuiz() {
    const quizCard = document.getElementById('quiz-card');
    if (quizCard) {
        const rect = quizCard.getBoundingClientRect();
        const offset = window.innerHeight * 0.15; // 10vh
        const scrollPosition = window.scrollY + rect.top - offset;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".topic-background").forEach(section => {
        const sourceButton = section.querySelector(".topic-source");
        const sourceContent = section.querySelector(".topic-source-content");

        if (sourceButton && sourceContent) {
            sourceButton.addEventListener("click", function () {
                sourceContent.classList.toggle("topic-source-content-active");
                sourceButton.classList.toggle("topic-source-active");
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});


