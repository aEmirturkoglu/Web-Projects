let score = JSON.parse(localStorage.getItem('score'))
    ||
    {
        wins:0,
        ties:0,
        losses:0,
      } ;

      // if (score == null or !score)...
      // normal func larda hoist var ama arrow olanlarda yok;

      updateScoreElem();
       
      let isautomate = false;
      let intervalID;

      const autobutton = document.querySelector('.auto'); // select the element
      
      function autobut(isautomate) {
        if (isautomate) {
          autobutton.textContent = `auto run: on`; // change the text content
        } else {
          autobutton.textContent = `auto run: off`;
        }
      }


      function automate() {
        if (!isautomate) {
          intervalID = setInterval(() => { //func() yada function asd() olarak da olur 
            const playerMove = pickComputerMove;
            playGame(playerMove);
           }, 1000);
           isautomate = true;
           autobut(isautomate)
        } else {
          clearInterval(intervalID);
          isautomate = false;
          autobut(isautomate)
        }
      }   //onclick="
          //playGame('rock')
          //"
      /*
      document.querySelector('.b1')                              
        .addEventListener('click',playGame('rock')); wont work 
      */

      /*
      document.querySelector('.b1')
        .addEventListener('click',() => playGame('rock') ); works
      */ 

      /*
        document.querySelector('.b1')
          .addEventListener('click',() => {playGame('rock')}); same as the top
      */

      document.querySelector('.b1')
        .addEventListener('click',() => playGame('rock'));

      document.body.addEventListener('keydown', (event) => {
        //console.log(event.key);
        
        function keys1(event) {
          if (event.key === 'r') {
          playGame('rock')
        } else if (event.key === 'p'){
          playGame('paper')
        } else if (event.key === 's') {
          playGame('scissors')
        }
        }
        setTimeout(keys1, 1000, event)
      });

    function playGame(playerMove) {

      let computerMove = pickComputerMove();

      result = '';
    if (playerMove == 'scissors') {
      if (computerMove == 'rock') {
        result = 'you lose'
      } else if (computerMove == 'paper'){
        result = 'you win'
      } else {
        result = 'tie'
      }

    } else if (playerMove == 'paper') {
        if (computerMove == 'rock') {
        result = 'you win'
      } else if (computerMove == 'paper'){
        result = 'tie'
      } else {
        result = 'you lose'
      }

    } else {
        if (computerMove == 'rock') {
        result = 'tie'
      } else if (computerMove == 'paper'){
        result = 'you lose'
      } else {
        result = 'you win'
      }
    }
    
    if (result == 'you win') {
        score.wins++
      } else if (result == 'tie') {
        score.ties++
      } else {
        score.losses++
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElem();
    
      document.querySelector('.js-result')
        .innerHTML = `${result}`;

      if (playerMove == 'rock') {

        playerMove =  `<img style="width: 75px; height: 75px;"
         src='/RPS-Remake/rpspngfiles/rock-paper-scissors-emoji-cartoon-007-512.webp'>`

      } else if (playerMove == 'paper') {

        playerMove = `<img style="width: 75px; height: 75px;"
        src='/RPS-Remake/rpspngfiles/scroll-emoji-clipart-md.webp'>`
        
      } else {

        playerMove = `<img style="width: 75px; height: 75px;"
        src='/RPS-Remake/rpspngfiles/11058-black-scissors.png'>`
      
      };

      if (computerMove == 'rock') {
      
        computerMove =  `<img style="width: 75px; height: 75px;"
        src='/RPS-Remake/rpspngfiles/rock-paper-scissors-emoji-cartoon-007-512.webp'>`
      
      } else if (computerMove == 'paper') {
      
        computerMove = `<img style="width: 75px; height: 75px;"
        src='/RPS-Remake/rpspngfiles/scroll-emoji-clipart-md.webp'>`      
      
      } else {
        
        computerMove = `<img style="width: 75px; height: 75px;"
        src='/RPS-Remake/rpspngfiles/11058-black-scissors.png'>`
      
      }

      /*
      You
      <img
      class="move-icon">
      <img src="images/scissors-emoji.png"
      class=" "move-icon">
      Computer

      */
        
      document.querySelector('.js-moves')
        .innerHTML = `you have picked ${playerMove}, computer has picked ${computerMove}`

      

    // alert(`you have picked ${playerMove}, computer has picked ${computerMove}, ${result}
    // wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`);
    }

    function updateScoreElem() {
      document.querySelector('.js-score')
        .innerHTML =  `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`;

      
    }
    
    function pickComputerMove() {
      
    const randomNum = Math.random()

    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1/3) {
    computerMove = 'rock'
    } else if (randomNum >= 1/3 && randomNum < 2/3) {
    computerMove = 'paper'
    } else {
    computerMove = 'scissors'
    }

    console.log(computerMove);
    return computerMove
    }
