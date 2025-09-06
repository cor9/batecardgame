class CardGame {
    constructor() {
        this.deck = null; // Deck will be created after mode selection
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
                   imagePath: "cards/" + suit + "/" + value + ".png"
                });
            });
        });
    }
    
    return this.shuffleDeck(deck);
} // <- This closing brace was missing

shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
    createInstructions() {
        return {
            'A': [
                "Circle jerk race - grab the cock of your bud on your left. Everyone has to jerk off. Person who drew the card is the first one to stop, then the next person on his left. The next person can’t stop until the guy before has stopped, and you have to go as fast as the first person jerking off.",
                "Cum now or pass  (only 3 passes allowed)"
            ],
            '2': [
                "Choose two buds to jerk each other off for 20 seconds",
                "Jerk fast for 30 seconds"
            ],
            '3': [
                "Jerk the guy to the right slow and steady for 30 seconds",
                "Jerk slow and steady for 30 seconds"
            ],
            '4': [
                "Choose another to edge with you and focus on cockhead for 20 seconds",
                "Edge your cockhead for 20 seconds"
            ],
            '5': [
                "Everyone jerks FAST and HARD for 20 seconds",
                "Jerk your dick fast and hard for 15 seconds"
            ],
            '6': [
                "Truth - choose someone to answer a truth of your choosing",
                "Wiggle penis, slap against hand 9 times"
            ],
            '7': [
                "Dare - choose someone to do a dare of your choosing",
                "On all fours, slap ass and jerk for 35 seconds medium pace"
            ],
            '8': [
                "Bate - start jerking and you can’t stop until the next 8 comes out",
                "Edge, Eat Precum"
            ],
            '9': [
                "Post a selfie - take a pic of your dick and upload it somewhere online",
                "Make a 30 second wank video"
            ],
            '10': [
                "Be a fitness instructor and give a command for two sets of ten (jumping jacks, situps, etc)",
                "10 jumping jacks and 2 edges"
            ],
            'J': [
                "Jerk off bud - whenever you have to jerk, your bud as too as well. Lasts until the next J is chosen.",
                "Corkscrew jerk for 20 seconds"
            ],
            'Q': [
                "Jerk off bitch - whenever you get chosen to jerk off your bitch has to do it instead. Lasts until the next Q is chosen",
                "Feather touch, slow movemenets of arousal"
            ],
            'K': [
                "Everyone except you has to jerk off for 10 seconds",
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

        // Draw card, but prevent Aces in first 5 cards
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
                this.deck.unshift(card); // Put Ace back at beginning
                this.shuffleDeck(this.deck); // Reshuffle deck
                card = null; // Continue loop
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
            } else {
                // Solo mode: show second instruction (index 1)
                selectedInstruction = possibleInstructions[1];
            }
            
            // Show instruction with delay
            setTimeout(() => {
                this.instruction.textContent = selectedInstruction;
                this.instruction.classList.remove('hidden');
                this.instruction.classList.add('visible');
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
    
    // Update instruction text based on mode
    const modeText = mode === 'group' ? 'group' : 'solo';
  this.instruction.textContent = "Click \"Draw Card\" to get your first " + modeText + " command!";
    
    // Update deck count
    this.deckCount.textContent = this.deck.length;
} // <- Add this closing brace

backToModeSelection() {
    // Hide all game screens and show mode selection
    this.gameScreen.classList.add('hidden');
    this.gameScreen.classList.remove('visible');
    this.modeSelection.classList.remove('hidden');
        
        // Reset game state
        this.deck = null;
        this.drawnCount = 0;
        this.cardElement.style.display = 'none';
        this.cardCount.textContent = '0';
        this.deckCount.textContent = '0';  // Temporary until mode selected
        this.gameMode = null;
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardGame();
});
