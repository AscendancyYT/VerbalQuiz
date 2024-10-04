const quizData = [
  {
      question: "1. What does 'Bring it on' mean?",
      options: shuffleArray([
          "To challenge someone",
          "To make it difficult",
          "To bring something",
          "To let it go"
      ]),
      correct: "To challenge someone"
  },
  {
      question: "2. What does 'Play it cool' mean?",
      options: shuffleArray([
          "To act relaxed",
          "To play music",
          "To lose control",
          "To become angry"
      ]),
      correct: "To act relaxed"
  },
  {
      question: "3. What does 'Get it together' mean?",
      options: shuffleArray([
          "To organize oneself",
          "To give up",
          "To take a break",
          "To separate things"
      ]),
      correct: "To organize oneself"
  },
  {
      question: "4. What does 'Knock it off' mean?",
      options: shuffleArray([
          "To stop doing something",
          "To break something",
          "To fix something",
          "To ignore someone"
      ]),
      correct: "To stop doing something"
  },
  {
      question: "5. What does 'Hit me' mean?",
      options: shuffleArray([
          "To challenge me",
          "To strike someone",
          "To call me",
          "To understand me"
      ]),
      correct: "To challenge me"
  },
  {
      question: "6. What does 'Get Cracking' mean?",
      options: shuffleArray([
          "To start working",
          "To slow down",
          "To break something",
          "To go away"
      ]),
      correct: "To start working"
  },
  {
      question: "7. What does 'You don't say' mean?",
      options: shuffleArray([
          "To express disbelief",
          "To agree",
          "To respond positively",
          "To be rude"
      ]),
      correct: "To express disbelief"
  },
  {
      question: "8. What does 'Stick it out' mean?",
      options: shuffleArray([
          "To endure something",
          "To avoid something",
          "To stop trying",
          "To leave early"
      ]),
      correct: "To endure something"
  },
  {
      question: "9. What does 'Tell me about it' mean?",
      options: shuffleArray([
          "To share an experience",
          "To remain quiet",
          "To complain",
          "To express anger"
      ]),
      correct: "To share an experience"
  },
  {
      question: "10. What does 'Stay Sharp' mean?",
      options: shuffleArray([
          "To remain alert",
          "To become dull",
          "To stay away",
          "To be quiet"
      ]),
      correct: "To remain alert"
  }
];

// Shuffle Array Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

let currentQuestionIndex = 0;
let score = 0;

// Load a single question
function loadQuestion() {
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = ''; // Clear previous content
  
  const data = quizData[currentQuestionIndex]; // Current question

  const questionElement = document.createElement('div');
  questionElement.classList.add('question-block');
  questionElement.innerHTML = `
      <h2>${data.question}</h2>
      ${data.options.map(option => `
          <label>
              <input type="radio" name="question" value="${option}">
              ${option}
          </label><br>
      `).join('')}
  `;
  quizContainer.appendChild(questionElement);
}

// Start Quiz Function
document.getElementById('start-quiz').addEventListener('click', () => {
  document.getElementById('start-quiz').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('navigation').style.display = 'block';
  loadQuestion();
});


// Function to calculate score for the current question
function calculateScoreForCurrentQuestion() {
  const selectedAnswer = document.querySelector('input[name="question"]:checked');
  if (selectedAnswer && selectedAnswer.value === quizData[currentQuestionIndex].correct) {
      score++;
  }
}

// Next Button Functionality
// document.getElementById('next').addEventListener('click', () => {
//   calculateScoreForCurrentQuestion();
  
//   currentQuestionIndex++;
  
//   if (currentQuestionIndex < quizData.length) {
//       loadQuestion();
//   } else {
//       document.getElementById('next').style.display = 'none';
//       document.getElementById('submit').style.display = 'block';
//   }
// });
document.getElementById('next').addEventListener('click', () => {
  if (currentQuestionIndex < quizData.length) { // Check before accessing quizData
    calculateScoreForCurrentQuestion();
    currentQuestionIndex++;
    loadQuestion();
  } else {
    document.getElementById('next').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
  }
});

// Submit Quiz Functionality
document.getElementById('submit').addEventListener('click', () => {
  calculateScoreForCurrentQuestion();
  const resultElement = document.getElementById('result');
  resultElement.textContent = `You scored ${score} out of ${quizData.length}`;
  
  // Send score to Telegram
  sendScoreToTelegram(score);
});

// Telegram API Integration
function sendScoreToTelegram(score) {
  const userName = prompt("Enter your name:");
  const message = `Name: ${userName}, Score: ${score}`;
  const TOKEN = '8009356140:AAEdPis3oGkRc4L1-9U6el3lNttE7In5hW4'

  const telegramAPIUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=-4580099969&text=${encodeURIComponent(message)}`;

  fetch(telegramAPIUrl)
      .then(response => response.json())
      .then(data => {
          if (data.ok) {
              alert('Score sent to our Admins successfully!');
          } else {
              alert('Failed to send score to our Admins.');
          }
      })
      .catch(error => {
          alert('Error:', error);
      });
}

// Load the first question when the page loads
window.onload = () => {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('navigation').style.display = 'none';
};
