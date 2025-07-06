document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startButton = document.getElementById('startQuestions');
    const personalInfo = document.getElementById('personalInfo');
    const question1 = document.getElementById('question1');
    const question2 = document.getElementById('question2');
    const question3 = document.getElementById('question3');
    const question4 = document.getElementById('question4');
    const question5 = document.getElementById('question5');
    const question6 = document.getElementById('question6');
    const question7 = document.getElementById('question7');
    const question8 = document.getElementById('question8');
    const question9 = document.getElementById('question9');
    const question10 = document.getElementById('question10');
    const phoneQuestion = document.getElementById('phoneQuestion');
    const finalQuestion = document.getElementById('finalQuestion');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const loading = document.getElementById('loading');
    const finalMessage = document.getElementById('finalMessage');
    const progressBar = document.getElementById('progressBar');
    const floatingHearts = document.getElementById('floatingHearts');
    
    // Create floating hearts
    function createFloatingHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random position
            const startPositionX = Math.random() * window.innerWidth;
            heart.style.left = startPositionX + 'px';
            
            // Random size
            const size = Math.random() * 20 + 10;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Random animation duration
            const duration = Math.random() * 10 + 10;
            heart.style.animationDuration = duration + 's';
            
            // Random delay
            const delay = Math.random() * 10;
            heart.style.animationDelay = delay + 's';
            
            floatingHearts.appendChild(heart);
        }
    }
    
    // Call the function to create hearts
    createFloatingHearts();
    
    // Answers storage
    const answers = {
        name: '',
        phone: '',
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        question8: '',
        question9: '',
        question10: '',
        finalAnswer: ''
    };
    
    // Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1360326817281605723/j_Qanq8hy8lnLLucoAYqZichxC1SbTTW7hw8MxT4CfJBeDMpDU_PQTCn8X5RYlgWeUXt';
    
    // Progress tracking
    let currentProgress = 0;
    const totalQuestions = 12; // personal info + 10 questions + phone + final question
    
    // Update progress bar
    function updateProgress(step) {
        currentProgress = step;
        const percentage = (currentProgress / totalQuestions) * 100;
        progressBar.style.width = percentage + '%';
    }
    
    // Add sparkle effect to buttons
    function addSparkleEffect(button) {
        button.addEventListener('mouseover', function() {
            this.classList.add('sparkle');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('sparkle');
        });
    }
    
    // Add sparkle effect to all buttons
    document.querySelectorAll('.btn').forEach(addSparkleEffect);
    
    // Start the questionnaire
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        personalInfo.classList.add('active');
        updateProgress(0);
        
        // Create more hearts when starting
        createFloatingHearts();
    });
    
    // Personal Info -> Question 1
    document.getElementById('nextPersonal').addEventListener('click', function() {
        answers.name = document.getElementById('userName').value;
        
        if (!answers.name.trim()) {
            alert('Lütfen adınızı girin!');
            return;
        }
        
        personalInfo.classList.remove('active');
        question1.classList.add('active');
        updateProgress(1);
    });
    
    // Question 1 -> Question 2
    document.getElementById('nextQ1').addEventListener('click', function() {
        answers.question1 = document.getElementById('answer1').value;
        if (!answers.question1.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question1.classList.remove('active');
        question2.classList.add('active');
        updateProgress(2);
    });
    
    // Question 2 -> Question 3
    document.getElementById('nextQ2').addEventListener('click', function() {
        answers.question2 = document.getElementById('answer2').value;
        if (!answers.question2.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question2.classList.remove('active');
        question3.classList.add('active');
        updateProgress(3);
    });
    
    // Question 3 -> Question 4
    document.getElementById('nextQ3').addEventListener('click', function() {
        answers.question3 = document.getElementById('answer3').value;
        if (!answers.question3.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question3.classList.remove('active');
        question4.classList.add('active');
        updateProgress(4);
    });
    
    // Question 4 -> Question 5
    document.getElementById('nextQ4').addEventListener('click', function() {
        answers.question4 = document.getElementById('answer4').value;
        if (!answers.question4.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question4.classList.remove('active');
        question5.classList.add('active');
        updateProgress(5);
    });
    
    // Question 5 -> Question 6
    document.getElementById('nextQ5').addEventListener('click', function() {
        answers.question5 = document.getElementById('answer5').value;
        if (!answers.question5.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question5.classList.remove('active');
        question6.classList.add('active');
        updateProgress(6);
    });
    
    // Question 6 -> Question 7
    document.getElementById('nextQ6').addEventListener('click', function() {
        answers.question6 = document.getElementById('answer6').value;
        if (!answers.question6.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question6.classList.remove('active');
        question7.classList.add('active');
        updateProgress(7);
    });
    
    // Question 7 -> Question 8
    document.getElementById('nextQ7').addEventListener('click', function() {
        answers.question7 = document.getElementById('answer7').value;
        if (!answers.question7.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question7.classList.remove('active');
        question8.classList.add('active');
        updateProgress(8);
    });
    
    // Question 8 -> Question 9
    document.getElementById('nextQ8').addEventListener('click', function() {
        answers.question8 = document.getElementById('answer8').value;
        if (!answers.question8.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question8.classList.remove('active');
        question9.classList.add('active');
        updateProgress(9);
    });
    
    // Question 9 -> Question 10
    document.getElementById('nextQ9').addEventListener('click', function() {
        answers.question9 = document.getElementById('answer9').value;
        if (!answers.question9.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question9.classList.remove('active');
        question10.classList.add('active');
        updateProgress(10);
    });
    
    // Question 10 -> Phone Question
    document.getElementById('nextQ10').addEventListener('click', function() {
        answers.question10 = document.getElementById('answer10').value;
        if (!answers.question10.trim()) {
            alert('Lütfen soruyu cevaplayın!');
            return;
        }
        question10.classList.remove('active');
        phoneQuestion.classList.add('active');
        updateProgress(11);
    });
    
    // Phone Question -> Final Question
    document.getElementById('nextPhone').addEventListener('click', function() {
        answers.phone = document.getElementById('userPhone').value;
        // Phone is optional, no validation needed
        phoneQuestion.classList.remove('active');
        finalQuestion.classList.add('active');
        updateProgress(11);
        
        // Create more hearts for the final question
        createFloatingHearts();
    });
    
    // Final Answer - Yes
    yesBtn.addEventListener('click', function() {
        answers.finalAnswer = 'Evet';
        handleFinalAnswer();
        
        // Create celebration hearts
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createFloatingHearts();
            }, i * 100);
        }
    });
    
    // Final Answer - No
    noBtn.addEventListener('click', function() {
        answers.finalAnswer = 'Hayır';
        handleFinalAnswer();
    });
    
    // Handle final answer and send data to webhook
    function handleFinalAnswer() {
        finalQuestion.style.display = 'none';
        loading.style.display = 'block';
        
        // Collect user info
        const userAgent = navigator.userAgent;
        const date = new Date().toLocaleString();
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        
        // Phone number display
        const phoneDisplay = answers.phone ? answers.phone : 'Telefon numarası paylaşılmadı';
        
        // Prepare data for Discord webhook
        const data = {
            embeds: [{
                title: '💖 Yeni Bir Cevap Geldi! 💖',
                color: answers.finalAnswer === 'Evet' ? 16711680 : 5814783, // Red for Yes, Blue for No
                fields: [
                    {
                        name: '👤 Kişisel Bilgiler',
                        value: `**İsim:** ${answers.name}\n**Telefon:** ${phoneDisplay}`,
                    },
                    {
                        name: '1. Benimle sevgili olursan bana neler vaadedersin?',
                        value: answers.question1 || 'Cevap verilmedi',
                    },
                    {
                        name: '2. Birlikte yapmak istediğin üç şey nedir?',
                        value: answers.question2 || 'Cevap verilmedi',
                    },
                    {
                        name: '3. Sence bir ilişkide en önemli şey nedir?',
                        value: answers.question3 || 'Cevap verilmedi',
                    },
                    {
                        name: '4. Hayalindeki mükemmel randevu nasıl olurdu?',
                        value: answers.question4 || 'Cevap verilmedi',
                    },
                    {
                        name: '5. Beni neden seviyorsun?',
                        value: answers.question5 || 'Cevap verilmedi',
                    },
                    {
                        name: '6. Benim en sevdiğin özelliğim nedir?',
                        value: answers.question6 || 'Cevap verilmedi',
                    },
                    {
                        name: '7. Benimle nereye gitmek istersin?',
                        value: answers.question7 || 'Cevap verilmedi',
                    },
                    {
                        name: '8. Bana söylemek istediğin ama söyleyemediğin bir şey var mı?',
                        value: answers.question8 || 'Cevap verilmedi',
                    },
                    {
                        name: '9. Benim hakkımda en çok neyi merak ediyorsun?',
                        value: answers.question9 || 'Cevap verilmedi',
                    },
                    {
                        name: '10. Hayalindeki ilişki nasıl olurdu?',
                        value: answers.question10 || 'Cevap verilmedi',
                    },
                    {
                        name: '❓ Benimle sevgili olmak ister misin?',
                        value: `**${answers.finalAnswer}**`,
                    }
                ],
                footer: {
                    text: `Tarih: ${date} | Tarayıcı: ${userAgent} | Ekran: ${screenSize}`
                }
            }]
        };
        
        // Send data to Discord webhook
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            setTimeout(() => {
                loading.style.display = 'none';
                finalMessage.classList.add('show');
                updateProgress(12);
            }, 2000);
        })
        .catch(error => {
            console.error('Error sending data:', error);
            loading.style.display = 'none';
            finalMessage.classList.add('show');
            updateProgress(12);
        });
    }
    
    // Make the "No" button run away when hovered
    noBtn.addEventListener('mouseover', function() {
        const maxX = window.innerWidth - noBtn.offsetWidth - 100;
        const maxY = window.innerHeight - noBtn.offsetHeight - 100;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    });
    
    // Add confetti effect on Yes button click
    yesBtn.addEventListener('click', function() {
        const colors = ['#ff4b6c', '#ff8e53', '#ffb6c1', '#ffc0cb'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.position = 'fixed';
            confetti.style.top = '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '50%';
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            
            const animationDuration = Math.random() * 3 + 2;
            confetti.style.animation = `fall ${animationDuration}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, animationDuration * 1000);
        }
    });
    
    // Add fall animation for confetti
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 
