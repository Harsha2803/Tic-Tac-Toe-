function openPlayerConfig(event) {
    editedPlayer =  +event.target.dataset.playerid;// Add + to convert string to number
    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display = 'block';
  }
  
  function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorOutputelement.textContent='';
    formElement.firstElementChild.lastElementChild.value='';
  }
  
  function savePlayerConfig(event) {
    event.preventDefault(); //Prevents Reload and makes use of javascript
    const formData = new FormData(event.target);
    const enteredPlayername = formData.get('playername').trim();// '   Maheswar      '=> Maheswar

    if (!enteredPlayername){
        event.target.firstElementChild.classList.add('error');
        errorOutputelement.textContent='Please Enter a valid name!';
        return;
    }
    
    closePlayerConfig();
    const updateplayerDataElement=document.getElementById('player-'+editedPlayer+'-data');
    updateplayerDataElement.children[1].textContent=enteredPlayername;  // Accesing h3 element

    if(editedPlayer===1){
        players[0].name=enteredPlayername;
    }else{
        players[1].name=enteredPlayername;
    }

}