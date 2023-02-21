function resetGame(){
    activePlayer=0;
    currentRound=1;
    gameisOver=false;
    gameOver.firstElementChild.innerHTML='<h2>You won, <span id="winner-name">PLAYER NAME</span>!</h2>';
    gameOver.style.display='none';

    let gameBoardindex=0
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            gameData[i][j]=0;
            const gameBoardElement=gameBoard.children[gameBoardindex];
            gameBoardElement.textContent='';
            gameBoardElement.classList.remove('disabled');
            gameBoardindex++;
        }
    }
}


function startGame(){
    if( players[0].name === ''|| players[1].name === ''){
        alert('Please Enter the valid name');
        return;
    }

    resetGame();

    activePlayername.textContent=players[activePlayer].name;
    gameAreaElement.style.display='block';

}


function switchPlayer(){
    if(activePlayer===0){
        activePlayer=1;
    }else{
        activePlayer=0;
    }
    activePlayername.textContent=players[activePlayer].name;
}
function selectGame(event){

    if(event.target.tagName !== 'LI' || gameisOver){
        return;
    }


    const selectedCol=event.target.dataset.col-1;
    const selectedrow=event.target.dataset.row-1;
    if(gameData[selectedrow][selectedCol]>0){
        alert('Select empty field');
        return;
    }
    event.target.textContent = players[activePlayer].symbol; // First we access player 1
    event.target.classList.add('disabled');
    
    gameData[selectedrow][selectedCol]=activePlayer+1;  // 1st Player is 0 in active player

    // console.log(gameData);

    const winnerID=checkGameover();
    if(winnerID !==0 ){
        endGame(winnerID);
    }

    currentRound++;
    switchPlayer();
}

function checkGameover(){
    for(let i=0;i<3;i++){
        if(gameData[i][0]>0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]){
            return gameData[i][0];
        }
    }   

    for(let i=0;i<3;i++){
        if(gameData[0][i]>0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]){
            return gameData[0][i];
        }
    }
    
    if(gameData[0][0]>0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]){
        return gameData[0][0];
    }

    
    if(gameData[2][0]>0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]){
        return gameData[2][0];
    }

    if(currentRound===9){
        return -1;
    }
    return 0;
}

function endGame(winnerID){
    gameisOver=true;
    gameOver.style.display='block';
    if(winnerID>0){
    gameOver.firstElementChild.firstElementChild.textContent=players[winnerID-1].name;
    }
    else{
        gameOver.firstElementChild.textContent='It\'s a Draw!'; 
    }
}