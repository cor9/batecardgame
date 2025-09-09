class CardGame {
    constructor() {
        this.timer = null;
        this.timerDuration = 0;
        this.timerRemaining = 0;
        this.deck = null;
        this.drawnCount = 0;
        this.instructions = this.createInstructions();
        this.gameMode = null; // 'group' or 'solo'
        this.initializeElements();
        this.bindEvents();
    }

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

    // Timer methods
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
            'A': {
                group: {
                    red: "Circle jerk race - grab the cock of your bud on your left. Everyone has to jerk off passionately. Person who drew the card is the first one to stop, then the next on his left. Match the intense speed of the first.",
                    black: "Circle jerk race - grab the cock of your bud on your left. Everyone jerks off edged and teasing. Person who drew the card stops first, then next left. Can't stop until previous has, go as slow and tormenting as the first."
                },
                solo: {
                    red: "Cum now or pass (only 3 passes allowed) - but if passing, tease yourself lightly for 10 seconds.",
                    black: "Cum now or pass (only 3 passes allowed) - but if passing, hold still and clench for 10 seconds."
                }
            },           
             '2': {                 
                 group: {                     
                     red: "Choose two buds to jerk each other off for 20 seconds, maintaining eye contact the whole time—no breaking gaze or restart.",                     
                     black: "Choose two buds to jerk each other off for 20 seconds, but with one hand behind their back for added challenge."                 
                 },                 
                 solo: {                     
                     red: "Jerk fast for 30 seconds, alternating hands every 5 seconds to build unpredictable rhythm.",
                     black: "Jerk fast for 30 seconds, using only your non-dominant hand for extra intensity."                 
                 }             
             },             
             '3': {                 
                 group: {                     
                     red: "Jerk the guy to the right slow and steady for 30 seconds, whispering dirty encouragement in his ear.",
                     black: "Jerk the guy to the right slow and steady for 30 seconds, while lightly pinching nipples for teasing pain."                 
                 },                 
                 solo: {                     
                     red: "Jerk slow and steady for 30 seconds, focusing on breathing deeply to sync strokes with inhales.", 
                     black: "Jerk slow and steady for 30 seconds, incorporating gentle ball squeezes on every third stroke." 
                 }            
             },            
                '4': {                
                    group: {                     
                        red: "Choose another to edge with you and focus on cockhead for 20 seconds, using only fingertips for feather-light torment.", 
                        black: "Choose another to edge with you and focus on cockhead for 20 seconds, applying firm pressure for deep sensation."  
                    },                
                    solo: {                    
                        red: "Edge your cockhead for 20 seconds, circling it slowly with palm.", 
                        black: "Edge your cockhead for 20 seconds, tapping it rhythmically." 
                    }            
                },             
             '5': {                 
                 group: {                    
                     red: "Everyone jerks FAST and HARD for 20 seconds, shouting out how close you are—highest gets a free pass next round.", 
                     black: "Everyone jerks FAST and HARD for 20 seconds, but must stay silent—first moan loses and edges extra 10 seconds."                 
                 },                 
                 solo: {                    
                     red: "Jerk your dick fast and hard for 15 seconds, fast breaths to build arousal.",
                     black: "Jerk your dick fast and hard for 15 seconds, stong grip with complete strokes." 
                 }             
             },             
             '6': {                
                 group: {                    
                     red: "Truth - choose someone to answer a truth of your choosing, but if they hesitate, they must edge silently for 10 seconds.", 
                     black: "Truth - choose someone to answer a truth of your choosing, penalty for hesitation: reveal an extra embarrassing detail."                
                 },               
                 solo: {                    
                     red: "Wiggle penis, slap against hand 9 times, then hold still for 10 seconds while reciting a kinkiest secret aloud.",  
                     black: "Wiggle penis, slap against hand 9 times, then tense your body for 10 seconds imagining being watched."                
                 }            
             },             
             '7': {                
                 group: {                    
                     red: "Dare - choose someone to do a dare of your choosing, escalating if refused (double time or add a passionate twist).",  
                     black: "Dare - choose someone to do a dare of your choosing, escalating if refused (add a restraining or dominant element)."               
                 },                 
                 solo: {                     
                     red: "On your knees, slap ass 3x and jerk for 35 seconds medium pace.",   
                     black: "On all fours, slap ass 3x and jerk for 35 seconds medium pace."               
                 }            
             },            
             '8': {                 
                 group: {                     
                     red: "Bate - start jerking and can’t stop until next 8, everyone watches and rates your passionate technique out of 10.",    
                     black: "Bate - start jerking and can’t stop until next 8, everyone watches and suggests tormenting adjustments."                
                 },                
                 solo: {                    
                     red: "Edge, Eat Precum.",  
                     black: "Edge, Eat Precum, then wiggle penis while biting your lower lip."               
                 }           
             },            
             '9': {                
                 group: {                     
                     red: "Post a selfie - take a pic of your dick and upload online anonymously, with a teasing caption for admirers.",   
                     black: "Post a selfie - take a pic of your dick and upload online anonymously, with a daring caption challenging viewers."                
                 },                
                 solo: {                    
                     red: "Make a 10 second wank video.",   
                     black: "Take a dick pic."               
                 }           
             },             
             '10': {               
                 group: {                   
                     red: "Be a fitness instructor: command two sets of ten (jumping jacks, etc.), incorporating passionate jerking motions.",   
                     black: "Be a fitness instructor: command two sets of ten (pushups, etc.), with restraining twists in the exercises."                
                 },                 
                 solo: {                    
                     red: "5 jumping jacks and 1 edge.",   
                     black: "5 situps and 1 edges, holding breath and stroking during situps."                
                 }            
             },           
             'J': {                
                 group: {                     
                     red: "Jerk off bud - whenever you jerk, your bud does too. Lasts until next J, mirror each other's passionate speed.", 
                     black: "Jerk off bud - whenever you jerk, your bud does too. Lasts until next J, dominate by setting a teasing pace."                 
                 },               
                 solo: {                  
                     red: "Corkscrew jerk for 20 seconds, twisting wrist like uncorking a bottle of heated pleasure.",   
                     black: "Corkscrew jerk for 20 seconds, slowing the twist for a tormenting build."                
                 }           
             },           
             'Q': {              
                 group: {                    
                     red: "Jerk off bitch - when chosen to jerk, your bitch does it instead. Lasts until next Q, they beg passionately.", 
                     black: "Jerk off bitch - when chosen to jerk, your bitch does it instead. Lasts until next Q, they submit silently."               
                 },                
                 solo: {                    
                     red: "Feather touch, slow movements of arousal, tracing patterns on thighs for agonizing anticipation.",   
                     black: "Feather touch, slow movements of arousal, avoiding direct contact for frustrating denial."              
                 }           
             },           
             'K': {                
                 group: {                     
                     red: "Everyone except you jerks for 10 seconds, you as 'king' command their passionate pace—fast or wild.",   
                     black: "Everyone except you jerks for 10 seconds, you as 'king' command their edged pace—slow or stop on whim."                
                 },               
                 solo: {                     
                     red: "Your favorite stroke for 45 seconds, experimenting with lube for slippery intensity.",             
                     black: "Your favorite stroke for 45 seconds, going dry for raw, gripping friction."            
                 }
             }
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

            // Get instruction based on card value, game mode, and color
            const possibleInstructions = this.instructions[card.value];
            let selectedInstruction;

            if (possibleInstructions) {
                if (this.gameMode === 'group') {
                    selectedInstruction = possibleInstructions.group[card.color];
                } else {
                    selectedInstruction = possibleInstructions.solo[card.color];
                }
            } else {
                selectedInstruction = "No instruction found for " + card.value;
            }

            // Show instruction with delay
            setTimeout(() => {
                this.instruction.textContent = selectedInstruction;
                this.instruction.classList.remove('hidden');
                this.instruction.classList.add('visible');

   // Show timer for both solo and group modes when applicable
if (this.gameMode === 'solo' || this.gameMode === 'group') {
    this.timerDuration = this.extractTimerDuration(selectedInstruction);
    if (this.timerDuration > 0) {
        this.timerSection.classList.remove('hidden');
        this.updateTimerDisplay();
        this.timerRemaining = this.timerDuration;
        // Don't start the timer automatically - let user click "Start Timer"
    } else {
        this.timerSection.classList.add('hidden');
    }
}
}, 200);

            // Update stats
            this.cardCount.textContent = this.drawnCount;
            this.deckCount.textContent = this.deck.length;

            // Remove animation class for next draw
            this.cardElement.classList.remove('flip-animation');
        }, 300);
    }

    selectMode(mode) {
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
                <br>
                <p>Deck: 104 cards (2 full decks)</p>
                <br>
                <p>Wank together and have fun!</p>
            `;
        } else {
            this.gameInfoTitle.textContent = "Solo Game Rules";
            this.gameInfoContent.innerHTML = `
                <p>Jerk/Edge</p>
                <p>Follow solo masturbation instructions!</p>
                <br> 
                <p>Deck: 52 cards (1 full deck)</p>
                <br>
                <p>Stroke yourself and enjoy!</p>
            `;
        }
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardGame();
});
