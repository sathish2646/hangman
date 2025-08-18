 let percent = 0;
    const loadingText = document.getElementById('loading-percent');
    const progressFill = document.getElementById('progress-fill');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    const loadingInterval = setInterval(() => {
      percent++;
      loadingText.textContent = percent + '%';
      progressFill.style.width = percent + '%';

      if (percent >= 100) {
        clearInterval(loadingInterval);
        // Hide loading and show main content
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
      }
    }, 80); // Adjust speed here



    function game(){
        window.location.href="game.html"
    }