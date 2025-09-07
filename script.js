class CardGame
    {     
        constructor() {         
        this.deck = null;
                                    
        // Deck will be created after mode selection         
                                    
        this.drawnCount = 0;         
        this.instructions = this.createInstructions();         
        this.gameMode = null; // 'group' or 'solo'         
        this.initializeElements();         
        this.bindEvents();     } 
     
     createDeck(numDecks) {         
         const suits = ['spades', 'hearts', 'diamonds', 'clubs'];         
         const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];         
         const suitNames = ['spades', 'hearts', 'diamonds', 'clubs'];                  
         let deck = [];       
      
         // Create specified number of complete decks         
         for (let deckNum = 0; deckNum < numDecks; deckNum++) {            
             suits.forEach((suit, suitIndex) => {                 
                 values.forEach(value => {                    
                     deck.push({                         
                         value: value,                         
                         suit: suit,                         
                         suitName: suitNames[suitIndex],                         
                        imagePath: "cards/" + suit + "/" + value + ".png"              
                     });                 
                 });             
             });         
         }                  
         
         return this.shuffleDeck(deck);     
     }      
     shuffleDeck(deck) {         
         for (let i = deck.length - 1; i > 0; i--) {             
             const j = Math.floor(Math.random() * (i + 1));             
             [deck[i], deck[j]] = [deck[j], deck[i]];         
         }         
         return deck;     
     }      
     
     createInstructions() {         
         return {
             // Suit-specific instructions for special cards
             '2_Hearts': [                 
                 "Choose two buds to jerk each other off for 20 seconds",                 
                 "Jerk fast for 20 seconds"             
             ],
             '2_Diamonds': [
                 "Choose a bud, then wank eachother slow for 20 seconds",
                 "Backhand stroke for 20 seconds"
                 ],
             '2_Spades': [
                 "Choose a bud, then wank eachother medium for 20 seconds",
                 "Slow light stroke for 20 seconds"
                 ],
             '2_Clubs': [
                 "Choose a bud, then wank eachother fast for 20 seconds",
                 "Slow steady strokes for 20 seconds"
                 ],
             '3_Hearts': [
                 "Jerk the guy to the left slow steady strokes for 30 seconds",
                 "Slow feather touch strokes for 30 seconds"
                 ],
             '3_Diamonds': [                 
                 "Jerk the guy to the right slow steady strokes for 30 seconds",                 
                 "Jerk slow and steady for 30 seconds"             
             ],
             '3_Spades': [
                 "Jerk the guy to the left slow feather touch strokes for 30 seconds",
                 "Jerk slow, grip hard for 30 seconds"
                 ],
             '3_Clubs': [
                  "Jerk the guy to the right slow feather touch strokes for 30 seconds",
                 "Jerk slow and twisty for 30 seconds"
                 ],         
             '6_Hearts': [                 
                 "Slap dick against another's hand or leg of your choosing",                
                 "Wiggle penis, slap against hand 6 times"             
             ],
             '6_Diamonds': [
                  "Slap dick against another's hand or leg of your choosing",
                  "Wiggle penis, slap against belly 6 times"
            ],
             '6_Spades': [
                  "Slap dick against the guy to your right's hand or leg of your choosing",
                 "Wiggle penis, slap against thigh 6 times"
                 ],           
             '9_Hearts': [                
                 "Take a pic of your dick and upload it somewhere online",               
                 "Make a 10 second wank video"           
             ], 
              '9_Diamonds': [                
                 "Take a pic of your ass and upload it somewhere online",               
                 "Make a 15 second wank video"           
             ],  
              '9_Clubs': [                
                 "Take a pic of your dick tucked and upload it somewhere online",               
                 "Make a 20 second wank video"           
             ],  
              '9_Spades': [                
                 "Take a full body pic and upload it somewhere online",               
                 "Make a 30 second wank video"           
             ],  
             '10_Hearts': [                 
                 "Be a fitness instructor and give a command for a set of ten jumping jacks and an edge",                
                 "10 jumping jacks and an edge"             
             ],
                '10_Diamonds': [                 
                 "Be a fitness instructor and give a command for a set of ten pushups and an edge",                
                 "10 pushups and an edge"             
             ],
                '10_Clubs': [                 
                 "Be a fitness instructor and give a command for a set of ten situps and an edge",                
                 "10 situps and an edge"             
             ], 
                '10_Spades': [                 
                 "Be a fitness instructor and give a command for a set of ten lunges and an edge ",                
                 "10 lunges and an edge"             
             ],      
             // General instructions for regular cards
                 '4': [                
                 "Choose another to edge with you and focus on cockhead for 20 seconds",                
                 "Edge your cockhead for 20 seconds"            
             ],             
             '5': [                 
                 "Everyone jerks FAST and HARD for 20 seconds",                 
                 "Jerk your dick fast and hard for 15 seconds"            
             ],   
            '7': [                
                 "Choose someone to do a DARE of your choosing",                 
                 "On all fours, jerk for 35 seconds"             
             ],             
             '8': [                
                 "Bate - start jerking and you can’t stop until the next 8 comes out",                
                 "Wank until wet, Eat Precum"          
             ], 
               'A': [                 
                 "Circle jerk race - grab the cock of your bud on your left. Everyone has to jerk off. Person who drew the card is the first one to stop, then the next person on his left. The next person can’t stop until the guy before has stopped, and you have to go as fast as the first person jerking off.",                 
                 "Cum now or pass  (only 3 passes allowed)"             
             ],             
             'J': [                 
                 "Jerk off bud - whenever you have to jerk, your bud has to as well. Lasts until the next J is chosen.",                 
                 "Corkscrew jerk for 20 seconds"            
             ],            
             'Q': [                
                 "Jerk off bitch - whenever you get chosen to jerk off your bitch has to do it instead. Lasts until the next Q is chosen",                 
                 "Wank as fast as you can for 25 seconds"             
             ],             
             'K': [                
                 "Everyone except you has to jerk off for 45 seconds",                
                 "Your favorite stroke for 45 seconds"            
             ]        
         };    
     }      
        
        initializeElements() {         
      
         // Mode selection elements         
         this.modeSelection = document.getElementById('modeSelection');         
         this.gameScreen = document.getElementById('gameScreen');         
         this.groupModeBtn = document.getElementById('groupMode');         
         this.soloModeBtn = document.getElementById('soloMode');         
         this.backToModeBtn = document.getElementById('backToMode');                  
         // Game info elements         
         this.gameInfo = document.getElementById('gameInfo');        
         this.gameInfoTitle = document.getElementById('gameInfoTitle');         
         this.gameInfoContent = document.getElementById('gameInfoContent');                 
         // Regular game elements         
         this.cardElement = document.getElementById('card');         
         this.cardImage = document.getElementById('cardImage');         
         this.instruction = document.getElementById('instruction');         
         this.drawBtn = document.getElementById('drawBtn');         
         this.cardCount = document.getElementById('cardCount');         
         this.deckCount = document.getElementById('deckCount');     
     }      
     
     bindEvents() {        
         // Mode selection events         
         this.groupModeBtn.addEventListener('click', () => this.selectMode('group'));         
         this.soloModeBtn.addEventListener('click', () => this.selectMode('solo'));                  
         
         // Regular game events         
         this.drawBtn.addEventListener('click', () => this.drawCard());                  
         
         // Back button         
         this.backToModeBtn.addEventListener('click', () => this.backToModeSelection());     
     }      
     drawCard() {         
         if (this.deck.length === 0) {             
             this.instruction.textContent = "🎉 Deck complete! Refresh to start over!";             
             this.instruction.classList.remove('hidden');             
             this.instruction.classList.add('visible');             
             this.drawBtn.textContent = "Refresh Game";             
             this.drawBtn.onclick = () => location.reload();             
             return;         
         }         
         
         // Hide instruction temporarily         
         this.instruction.classList.add('hidden');          
         
// Generate instruction key for value + suit first
const cardKey = card.value + '_' + card.suitName;
console.log("Card:", card.value, "of", card.suitName);
console.log("Generated key:", cardKey);

// Try to get suit-specific instructions first
let possibleInstructions = this.instructions[cardKey];

// If no suit-specific instruction exists, fall back to value-only
if (!possibleInstructions) {
    possibleInstructions = this.instructions[card.value];
    console.log("Falling back to value-only instructions for:", card.value);
}

console.log("Available instructions:", possibleInstructions);

let selectedInstruction;

if (possibleInstructions) {
    if (this.gameMode === 'group') {
        selectedInstruction = possibleInstructions[0];
    } else {
        selectedInstruction = possibleInstructions[1];
    }
} else {
    selectedInstruction = "No instruction found for " + card.value;
}               
             
             card = this.deck.pop();             
             attempts++;                          
             // If we've drawn fewer than 5 cards and got an Ace, put it back and reshuffle             
             if (this.drawnCount < 5 && card.value === 'A') {                 
                 this.deck.unshift(card); 
                 // Put Ace back at beginning                 
                 this.shuffleDeck(this.deck); 
                 // Reshuffle deck                 
                 card = null; 
                 // Continue loop             
             }                          
             
             // Safety check to prevent infinite loop             
             if (attempts > 50) {                 
                 break;             
             }         
         } while (card === null);                  
         this.drawnCount++;          
        
         // Animate card flip         
         this.cardElement.classList.add('flip-animation');                  
         
         setTimeout(() => {             
        
             // Update card display             
             this.cardImage.src = card.imagePath;             
             this.cardImage.alt = card.value + " of " + card.suit;             
             this.cardElement.className = "card " + card.suitName;             
             this.cardElement.style.display = 'flex';             
             
             // Get instruction for this card value based on game mode            
             const possibleInstructions = this.instructions[card.value];             
             let selectedInstruction;                          
             if (this.gameMode === 'group') {                
                 
                 // Group mode: show first instruction (index 0)                 
                 selectedInstruction = possibleInstructions[0];             
             } 
             else {                 
           
                 // Solo mode: show second instruction (index 1)                 
                 selectedInstruction = possibleInstructions[1];             
             }                         
          
             // Show instruction with delay             
             setTimeout(() => {                 
                 this.instruction.textContent = selectedInstruction;                 
                 this.instruction.classList.remove('hidden');                 
                 this.instruction.classList.add('visible');             
             }, 
                        200);             
           
             // Update stats             
             this.cardCount.textContent = this.drawnCount;             
             this.deckCount.textContent = this.deck.length;              
            
             // Remove animation class for next draw             
             this.cardElement.classList.remove('flip-animation');         
         }, 300);    
     }      
     selectMode(mode) 
     {         
         this.gameMode = mode;                  
         
         // Create deck based on mode         
         const numDecks = mode === 'group' ? 2 : 1;         
         this.deck = this.createDeck(numDecks);                  
       
         // Hide mode selection         
         this.modeSelection.classList.add('hidden');                 
      
         // Show regular game screen         
         this.gameScreen.classList.remove('hidden');         
         this.gameScreen.classList.add('visible');                 
      
         // Update game info based on mode         
         this.updateGameInfo(mode);                 
     
         // Update instruction text based on mode         
         const modeText = mode === 'group' ? 'group' : 'solo';         
         this.instruction.textContent = "Click \"Draw Card\" to get your first " + modeText + " command!";                 
      
         // Update deck count         
         this.deckCount.textContent = this.deck.length;     
     }  
     
     backToModeSelection() {         
         
         // Hide game screen and show mode selection       
         this.gameScreen.classList.add('hidden');         
         this.gameScreen.classList.remove('visible');         
         this.modeSelection.classList.remove('hidden');                 
         // Reset game state         
         this.deck = null;         
         this.drawnCount = 0;         
         this.cardElement.style.display = 'none';         
         this.cardCount.textContent = '0';         
         this.deckCount.textContent = '0';         
         this.gameMode = null;                 
        
         // Optional: Reset game info        
         this.gameInfoTitle.textContent = '';         
         this.gameInfoContent.innerHTML = ''; 
     }      
     updateGameInfo(mode) {         
         if (mode === 'group') {             
             this.gameInfoTitle.textContent = "Group Game Rules";             
             this.gameInfoContent.innerHTML = `                 
             <p>Playing with friends - Welcome to the CIRCLE JERK!</p>                
             <p>Deck: 104 cards (2 full decks)</p>                
             <p>Wank together and have fun!</p>            
             `;         
         } 
         
         else {             
             this.gameInfoTitle.textContent = "Solo Game Rules";             
             this.gameInfoContent.innerHTML = `                
             <p>Jerking and Edging - follow solo masturbation instructions!</p>                
             <p>Deck: 52 cards (1 full deck)</p>                
             <p>Stroke yourself and enjoy!</p>            
             `;        
         }     
     } 
    }  

// Initialize the game when page loads 
document.addEventListener('DOMContentLoaded', () => {     
    new CardGame(); 
}); 
