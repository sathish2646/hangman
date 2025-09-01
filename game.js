 const questions = {
      easy: [
        { q: "1:which  tag is used to create a dropdown list?", a: "select" },
        { q: "2:Largest heading tag in HTML?", a: "h1" },
        { q: "3:Smallest heading tag in HTML?", a: "h6" },
        { q: "4:Which tag defines a paragraph?", a: "p" },
        { q: "5:Which tag is used to insert a line break?", a: "br" },
        { q: "6:Which tag displays an image?", a: "img" },
        { q: "7:Which tag is used to create a hyperlink?", a: "a" },
        { q: "8:Which tag is used to create a table row?", a: "tr" },
        { q: "9:Which tag is used for an unordered list?", a: "ul" },
        { q: "10:Which tag is used for a table header cell?", a: "th" },
      ],
      medium: [
        { q:"1:Which CSS property is used to change text color?", a: "color" },
        { q: "2:Which property controls the text size?", a: "fontsize" },
        { q: "3:Which property controls the background color?", a: "backgroungcolor" },
        { q: "4:Which CSS property is used for spacing outside an element?", a: "margin" },
        { q: "5:Which CSS property is used for spacing inside an element?", a: "padding" },
        { q: "6:Which property makes text bold?", a: "fontweight" },
        { q: "7:Which property is used to center text?", a: "textalign" },
        { q: "8:Which property sets the style of the list bullets?", a: "liststyle" },
        { q: "9:Which layout system uses rows and columns for alignment?", a: "flexbox" },
        { q: "10:Which CSS property changes the type of font?", a: "fontfamily" },
      ],
      hard: [
        { q: "1:Which keyword is used to declare a variable in JavaScript (old way)?", a: "val" },
        { q: "2:Which keyword is used for block-scoped variable declaration?", a: "let" },
        { q: "3:Which keyword is used for constant variables?", a: "const" },
        { q: "4:What keyword is used to define a reusable block of code?", a: "function" },
        { q: "5:What keyword is used to output to the console?", a: "consolelog" },
        { q: "6:Which data structure stores multiple values in one variable?", a: "array" },
        { q: "7:Which keyword is used for decision making (true/false)?", a: "if" },
        { q: "8:Which loop repeats a block of code a fixed number of times?", a: "for" },
        { q: "9:Which object is used to interact with HTML elements?", a: "document" },
        { q: "10:What is triggered by user actions like click or keypress?", a: "event" },
      ]
    };
     let selectedLevel = '';
    let current = {};
    let guessed = [];
    let wrong = 0;
    let maxWrong = 6;
    let score = 0;
    let level = "easy";
    let currentIndex=0;
    const canvas = document.getElementById("hangmanCanvas");
    const ctx = canvas.getContext("2d");
    const input = document.getElementById("input");
    const questionText = document.getElementById("questionText");
    const wordDisplay = document.getElementById("wordDisplay");
    const statusDiv = document.getElementById("status");
    const scoreDisplay = document.getElementById("scoreDisplay");

    function startGame(lvl) {
      level = lvl;
      selectedLevel = level; 
      currentIndex = 0;
      score = 0; 
      nextQuestion();
      
    }
    function nextQuestion() {
      const list = questions[level];
      if(currentIndex >= list.length){
        statusDiv.textContent ="you finished all the questions";
        scoreDisplay.textContent = "Score: " + score;
        input.disabled=true;
        return;
      }  
      current=list[currentIndex];
      guessed = [];
      wrong = 0;
      input.value = "";
      input.disabled = false;
      statusDiv.textContent = "";
      questionText.textContent = "Question: " + current.q;
      drawHangman(0);
      updateWord();
      currentIndex++;
    }

    function updateWord() {
      wordDisplay.textContent = current.a.split("").map(l => guessed.includes(l) ? l : "_").join(" ");
    }

    input.addEventListener("input", () => {
      const letter = input.value.toLowerCase();
      input.value = "";
      if (!letter || guessed.includes(letter) ||!/[a-z0-9]/.test(letter)) return;
      guessed.push(letter);
      if (!current.a.includes(letter)) {
        wrong++;
        drawHangman(wrong);
      }
      updateWord();
      checkGame();
    });

    function checkGame() {
      if (!current.a.split("").some(l => !guessed.includes(l))) {
        statusDiv.textContent = " Correct!";
        input.disabled = true;
        score++;
      } else if (wrong >= maxWrong) {
        statusDiv.textContent = " You lost! Answer: " + current.a;
        input.disabled = true;
      }
      scoreDisplay.textContent = "Score: " + score;
    }

    function drawHangman(step) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 240); ctx.lineTo(190, 240); // base
      ctx.moveTo(50, 240); ctx.lineTo(50, 20);   // stand
      ctx.lineTo(150, 20); ctx.lineTo(150, 40);  // top
      ctx.stroke();
      if (step >= 1) { ctx.beginPath(); ctx.arc(150, 60, 20, 0, Math.PI * 2); ctx.stroke(); }
      if (step >= 2) { ctx.beginPath(); ctx.moveTo(150, 80); ctx.lineTo(150, 140); ctx.stroke(); }
      if (step >= 3) { ctx.beginPath(); ctx.moveTo(150, 100); ctx.lineTo(120, 120); ctx.stroke(); }
      if (step >= 4) { ctx.beginPath(); ctx.moveTo(150, 100); ctx.lineTo(180, 120); ctx.stroke(); }
      if (step >= 5) { ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(120, 180); ctx.stroke(); }
      if (step >= 6) { ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(180, 180); ctx.stroke(); }
    }