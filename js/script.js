const buttonEl = document.querySelector("button");
const layerEl = document.querySelector(".lose");
let gridElement = document.querySelector(".grid");
let pointsResult = document.querySelector("#points");


buttonEl.addEventListener("click",
function(startGame) {
    
    
    // Creazione griglia nelle diverse dimensioni
    gridElement.innerHTML = "";
    let gridLevel = decideDifficult();
    pointsResult.innerText = "";
    let score = [];
    
    // Creazione del ciclo che mi genera l'array con numeri casuali per le bombe   
    let arrayNumbers = [];
    
    while(arrayNumbers.length < 16){
        const randomNumber = Math.floor(Math.random() * gridLevel + 1)
        
         if(!arrayNumbers.includes(randomNumber)){
             arrayNumbers.push(randomNumber);
          }
        }
        
        
    for(let i = 1; i <= gridLevel; i++){
            
        let newElement;
        newElement = document.createElement("div");
        newElement.innerHTML = i;
        newElement.classList.add("square")
        newElement.style.fontWeight = "bold";
        newElement.style.fontSize = "14px";
        otherDifficultClass(newElement);

        if(arrayNumbers.includes(i)){
            newElement.classList.add("loseCell");
         }

// Inserito il cambio di colore delle celle al click

        newElement.addEventListener("click", 
        function playgame(){

// Inserito il comando che scopre tutte le bombe quando si clicca su una di essi
            if(arrayNumbers.includes(Number(this.innerText))){
                let cells = document.querySelectorAll(".square");
                for(let i = 1; i <= gridLevel; i++){
                    if(arrayNumbers.includes(i)){
                        let bombs = cells [i - 1];
                        bombs.classList.add("red"); 
                        blockLayer();                   
                    }
                }
                
// Condizione per generare il punteggio
            } else{
                newElement.classList.add("active");
                if (!score.includes(i)){
                    score.push(i);
                    pointsResult.innerText = "Punteggio: " + score.length;
                } 
            }
        })
        
        gridElement.append(newElement);

    }
   

 })


//  Funzione che consente la formazione della griglia in base alla difficoltà selezionata
 function decideDifficult() {
    let difficultOptions = 0;
    let selectOptions = document.getElementById(`options`).value;

    if(selectOptions == "1") {

        difficultOptions = 100;
    }

    if(selectOptions == "2") {

        difficultOptions = 81;
    }

    if(selectOptions == "3") {

        difficultOptions = 49;
    }

    return difficultOptions;
 }

// Funzione che aggiunge le classi create in css per le dimensioni delle celle
 function otherDifficultClass(sizeCell) {

    let squareClass = "a";

    if(decideDifficult() == 49){
        squareClass = "little-square";
        sizeCell.classList.add(squareClass);

    }
    
    if(decideDifficult() == 81) {
        squareClass = "medium-square";
        sizeCell.classList.add(squareClass);
    }

 }

 function blockLayer(){
    layerEl.style.display = "flex";
    gridElement.append(layerEl);
 }


