class CardGame
    {     
        constructor() {         
        this.timer = null;
        this.timerDuration = 0;
        this.timerRemaining = 0;
        this.deck = null;
    
     // Deck will be created after mode selection         
                                    
        this.drawnCount = 0;         
        this.instructions = this.createInstructions();         
        this.gameMode = null; // 'group' or 'solo'         
        this.initializeElements();         
        this.bindEvents();     } 
     
     createDeck(numDecks) {         
    const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];         
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
      color: (suit === 'Hearts' || suit === 'Diamonds') ? 'red' : 'black',
      imagePath: `cards/${suit}/${value}.png`
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

// Timer methods should be separate class methods:
extractTimerDuration(instruction) {
    const patterns = [
        /(\d+)\s*seconds?/i,
        /(\d+)\s*secs?/i,
        /(\d+)\s*minutes?/i,
        /(\d+)\s*mins?/i
    ];
    
    for (let pattern of patterns) {
        const match = instruction.match(pattern);
        if (match) {
            const value = parseInt(match[1]);
            if (pattern.source.includes('minute')) {
                return value * 60;
            }
            return value;
        }
    }
    
    return 0;
}

startTimer() {
    if (this.timerDuration <= 0) return;
    
    this.timerRemaining = this.timerDuration;
    this.startTimerBtn.classList.add('hidden');
    this.stopTimerBtn.classList.remove('hidden');
    
    this.timer = setInterval(() => {
        this.timerRemaining--;
        this.updateTimerDisplay();
        
        if (this.timerRemaining <= 0) {
            this.stopTimer();
            this.timerDisplay.textContent = "Time's up!";
        }
    }, 1000);
}

stopTimer() {
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
    
    this.startTimerBtn.classList.remove('hidden');
    this.stopTimerBtn.classList.add('hidden');
}

updateTimerDisplay() {
    const minutes = Math.floor(this.timerRemaining / 60);
    const seconds = this.timerRemaining % 60;
    this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
     
     createInstructions() {         
         return {
             'A': [                 
                 "Circle jerk race - grab the cock of your bud on your left. Everyone has to jerk off. Person who drew the card is the first one to stop, then the next person on his left. The next person can’t stop until the guy before has stopped, and you have to go as fast as the first person jerking off.",
                   "Cum now or pass (only 3 passes allowed)"         
             ],             
             '2': [
                 "**Buddy swap frenzy**: Choose two buds to jerk each other off for 20 seconds, **but they must maintain eye contact the whole time—no breaking gaze or you both restart**.",
                 "Jerk fast for 30 seconds, **alternating hands every 5 seconds to build unpredictable rhythm**."
             ],
            '3': [
                "Jerk the guy to the right slow and steady for 30 seconds, **whispering dirty encouragement in his ear to tease him mentally**.",         
                  "Jerk slow and steady for 30 seconds, **focusing on breathing deeply to sync your strokes with your inhales and exhales**."     
            ],
             '4': [         
                 "Choose another to edge with you and focus on cockhead for 20 seconds, **using only fingertips for feather-light torment**.",         
                   "Edge your cockhead for 20 seconds, **circling it slowly while imagining a forbidden fantasy to amp up the mental edge**."     
             ],
             '5': [         
                 "Everyone jerks FAST and HARD for 20 seconds, **shouting out a number from 1-10 on how close you are to cumming—highest number gets a free pass next round**.",         
                   "Jerk your dick fast and hard for 15 seconds, **slapping your bare ass with your free hand to add a rhythmic sting**."     
                  ],
             '6': [         
                 "Guy to the right strokes your dick, while the Guy to the left spanks your bare ass at the same time for 60 seconds",         
                   "Wiggle penis, slap against hand a dozen times, **then be still and hold breath for 15 seconds**."     
             ],
             '7': [         
                 "Dare - choose someone to do a dare of your choosing, **escalating it if they refuse (e.g., double the time or add a twist)**.",         
                   "On all fours, slap ass and jerk for 35 seconds medium pace, **arching your back like you're performing for an invisible audience**."     
                  ],
             '8': [         
                 "Bate - start jerking and you can’t stop until the next 8 comes out, **but everyone else watches and rates your technique out of 10**.",         
                   "Edge, Eat Precum, **then lick your fingers clean while maintaining a steady tease on your balls**."     
                  ],
             '9': [         
                 "Post a selfie - take a pic of your dick and upload it somewhere online, **anonymously if you're chicken, but bonus points for a caption teasing viewers**.",         
                   "Make a 30 second wank video, **narrating your strokes like a seductive ASMR session**."     
                  ],      
            '10': [         
                "Be a fitness instructor and give a command for two sets of ten (jumping jacks, situps, etc), **but incorporate jerking motions into the exercise for extra 'burn'**.",         
                   "10 jumping jacks and 2 edges, **clenching your PC muscles during each jump to intensify the buildup**."     
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

    // Timer elements
    this.timerSection = document.getElementById('timerSection');
    this.timerDisplay = document.getElementById('timerDisplay');
    this.startTimerBtn = document.getElementById('startTimerBtn');
    this.stopTimerBtn = document.getElementById('stopTimerBtn');
} 
     
     bindEvents() {        
         // Mode selection events         
         this.groupModeBtn.addEventListener('click', () => this.selectMode('group'));         
         this.soloModeBtn.addEventListener('click', () => this.selectMode('solo'));

        this.startTimerBtn.addEventListener('click', () => this.startTimer());
        this.stopTimerBtn.addEventListener('click', () => this.stopTimer());
         
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

    // Draw card with Ace prevention logic
    let card;
    let attempts = 0;
    do {
        if (this.deck.length === 0) {
            this.instruction.textContent = "🎉 Deck complete! Refresh to start over!";
            this.instruction.classList.remove('hidden');
            this.instruction.classList.add('visible');
            this.drawBtn.textContent = "Refresh Game";
            this.drawBtn.onclick = () => location.reload();
            return;
        }
        
        card = this.deck.pop();
        attempts++;
        
        // If we've drawn fewer than 5 cards and got an Ace, put it back and reshuffle
        if (this.drawnCount < 5 && card.value === 'A') {
            this.deck.unshift(card);
            this.shuffleDeck(this.deck);
            card = null;
        }
        
        // Safety check to prevent infinite loop
        if (attempts > 50) {
            break;
        }
    } while (card === null);
    
    this.drawnCount++;
           
    this.cardElement.classList.add(card.color); // Adds 'red' or 'black' class

    // Animate card flip
    this.cardElement.classList.add('flip-animation');

   setTimeout(() => {
    // Update card display
    this.cardImage.src = card.imagePath;
    this.cardImage.alt = card.value + " of " + card.suit;
    this.cardElement.className = "card " + card.suitName;
    this.cardElement.style.display = 'flex';

    // Generate instruction key for value + suit first
    const cardKey = card.value + '_' + card.suitName;
    
    // Try to get suit-specific instructions first
    let possibleInstructions = this.instructions[cardKey];
    
    // If no suit-specific instruction exists, fall back to value-only
    if (!possibleInstructions) {
        possibleInstructions = this.instructions[card.value];
    }
    
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
    
    // Show instruction with delay
    setTimeout(() => {
        this.instruction.textContent = selectedInstruction;
        this.instruction.classList.remove('hidden');
        this.instruction.classList.add('visible');
        
        // Show timer for solo mode only
        if (this.gameMode === 'solo') {
            this.timerDuration = this.extractTimerDuration(selectedInstruction);
            if (this.timerDuration > 0) {
                this.timerSection.classList.remove('hidden');
                this.updateTimerDisplay();
                this.timerRemaining = this.timerDuration;
            } else {
                this.timerSection.classList.add('hidden');
            }
        } else {
            this.timerSection.classList.add('hidden');
        }
    }, 200);

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

// Initialize the game when page loads 
document.addEventListener('DOMContentLoaded', () => {     
    new CardGame(); 
}); 
