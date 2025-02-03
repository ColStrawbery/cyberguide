// underliner logic
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase(); // Normalize path to lowercase
  
    // console.log("Current Page:", currentPage); // Check for debugging
  
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const linkHref = link.getAttribute('href').replace('.html', '').toLowerCase(); // Normalize link path to lowercase
  
        // Match the current page with the link
        if (linkHref === currentPage || (linkHref === 'start' && currentPage === 'index')) {
            item.classList.add('active');
            // console.log("Active page added for:", link.getAttribute('href'));
        }
    });
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    let lastScrollPosition = 0;


    // Handle header and accessibility options on scroll
    function handleScroll() {
        const currentScrollPosition = window.scrollY;

        // Disable hiding on mobile (screen width <= 768px)
        if (window.innerWidth > 768) {
            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
        }

        // Update last scroll position
        lastScrollPosition = currentScrollPosition;
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
            { text: "Buchstaben, Zahlen und Symbole.", score: 3 }
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

// Define scoring functions first
function calculateQuestionScore(question) {
    const answer = answers[question.id];

    let score;
    switch(question.type) {
        case 'button':
            score = answer.score;
            // console.log(`Question ${question.id} (button): Score = ${score}`);
            break;
        case 'range':
            score = question.calculateScore(answer);
            // console.log(`Question ${question.id} (range): Score = ${score}`);
            break;
        default:
            score = 3;
            // console.log(`Question ${question.id} (unknown type): Default score = ${score}`);
    }
    return score;
}

function calculateTotalScore() {
    // console.log("\n--- Calculating Total Score ---");
    
    const maxScorePerQuestion = 3;
    const totalPossibleScore = questions.length * maxScorePerQuestion;
    // console.log(`Maximum possible score: ${totalPossibleScore} (${questions.length} questions * ${maxScorePerQuestion} max score)`);
    
    let totalScore = 0;
    questions.forEach(question => {
        const questionScore = calculateQuestionScore(question);
        totalScore += questionScore;
        // console.log(`Question ${question.id}: Added ${questionScore} to total. New total: ${totalScore}`);
    });
    
    // console.log(`Final raw score: ${totalScore} out of ${totalPossibleScore}`);
    
    // Convert to risk percentage (0 score = 5% risk, max score = 100% risk)
    const riskPercentage = 5 + ((totalScore / totalPossibleScore) * 95);
    // console.log(`Risk calculation: 5 + ((${totalScore} / ${totalPossibleScore}) * 95) = ${riskPercentage}%`);
    
    const roundedRisk = Math.round(riskPercentage);
    // console.log(`Final rounded risk: ${roundedRisk}%`);
    
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
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    } else {
        console.log('Quiz completed!');
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
    console.log('Showing results...');
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
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
    
    const riskScore = calculateTotalScore();

    const skalaFill = document.querySelector('.skala-fill');
    if (skalaFill) {
        skalaFill.style.width = `${riskScore}%`;
        skalaFill.style.opacity = 0.25 + (riskScore - 5) * (1 - 0.25) / (100 - 5);
    }
    
    const title = document.querySelector('.score');
    if (title) {
        console.log('Setting title...');
        title.innerHTML = `
                <h1 class="info-header score-demo">IHR RISIKO <br>LIEGT BEI <br><span class="cta-highlight">${riskScore} PROZENT</span></h1>
        `;
    }

    const recommendationsDiv = document.getElementById('recommendations');

    // Determine the message based on the riskScore
    let message = '';
    
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
    
    // Insert the determined message into the recommendations div
    recommendationsDiv.innerHTML = message;
    
}

function restartQuiz() {
    currentQuestion = 0;
    answers = {};
    document.cookie = 'quizAnswers=; Max-Age=-99999999;';
    document.cookie = 'currentQuestion=; Max-Age=-99999999;';
    document.getElementById('results').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.style.height = `530px`;
        quizContainer.style.backgroundColor = 'white';
        quizContainer.style.borderColor = 'var(--border2)';
    }
    updateQuestion();
}

function saveProgress() {
    setCookie('quizAnswers', answers, 7);
    setCookie('currentQuestion', currentQuestion, 7);
}

function loadProgress() {
    const savedAnswers = getCookie('quizAnswers');
    const savedQuestion = getCookie('currentQuestion');
    if (savedAnswers) answers = savedAnswers;
    if (savedQuestion !== null) currentQuestion = savedQuestion;
    updateQuestion();
}

// Add the event listeners at the end
document.addEventListener('DOMContentLoaded', function() {
    updateQuestion();
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