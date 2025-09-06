class CardGame {
    constructor() {
        this.deck = this.createDeck();
        this.drawnCount = 0;
        this.instructions = this.createInstructions();
        this.gameMode = null; // 'group', 'solo', or 'danceDenial'
        this.danceDenialGame = null;
        this.initializeElements();
        this.bindEvents();
    }

    createDeck() {
        const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suitNames = ['spades', 'hearts', 'diamonds', 'clubs'];
        
        let deck = [];
        // Create two complete decks (104 cards total)
        for (let deckNum = 0; deckNum < 2; deckNum++) {
            suits.forEach((suit, suitIndex) => {
                values.forEach(value => {
                    deck.push({
                        value: value,
                        suit: suit,
                        suitName: suitNames[suitIndex],
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
        // Only bind events for elements that exist
        
        // Regular game events
        this.drawBtn.addEventListener('click', () => this.drawCard());
        
    }

    drawCard() {
        if (this.deck.length === 0) {
            this.instruction.textContent = "🎉 Deck complete! Refresh to start over!";
            this.drawBtn.textContent = "Refresh Game";
            this.drawBtn.onclick = () => location.reload();
            return;
        }

        // Hide instruction temporarily
        this.instruction.classList.add('hidden');

        // Draw card
        const card = this.deck.pop();
        this.drawnCount++;

        // Animate card flip
        this.cardElement.classList.add('flip-animation');
        
        setTimeout(() => {
            // Update card display
            this.cardImage.src = card.imagePath;
            this.cardImage.alt = `${card.value} of ${card.suit}`;
            this.cardElement.className = `card ${card.suitName}`;
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

        }, 300);
    }

    selectMode(mode) {
        this.gameMode = mode;
        
        // Hide mode selection
        this.modeSelection.classList.add('hidden');
        
        if (mode === 'danceDenial') {
            // Show Dance Denial screen
            this.danceDenialScreen.classList.remove('hidden');
            this.danceDenialScreen.classList.add('visible');
            this.gameScreen.classList.add('hidden');
            
            // Initialize Dance Denial game
            this.initializeDanceDenialGame();
        } else {
            // Show regular game screen
            this.gameScreen.classList.remove('hidden');
            this.gameScreen.classList.add('visible');
            this.danceDenialScreen.classList.add('hidden');
            
            // Update instruction text based on mode
            const modeText = mode === 'group' ? 'group' : 'solo';
            this.instruction.textContent = `Click "Draw Card" to get your first ${modeText} command!`;
        }
    }

    backToModeSelection() {
        // Hide all game screens and show mode selection
        this.gameScreen.classList.add('hidden');
        this.gameScreen.classList.remove('visible');
        this.danceDenialScreen.classList.add('hidden');
        this.danceDenialScreen.classList.remove('visible');
        this.modeSelection.classList.remove('hidden');
        
        // Reset game state
        this.deck = this.createDeck();
        this.drawnCount = 0;
        this.cardElement.style.display = 'none';
        this.cardCount.textContent = '0';
        this.deckCount.textContent = '104';
        this.gameMode = null;
        this.danceDenialGame = null;
    }

    // Dance Denial Game Methods
    initializeDanceDenialGame() {
        this.danceDenialGame = {
            deck: this.createDanceDenialDeck(),
            phase: 1, // 1 = building tension, 2 = competition
            currentPlayer: Math.random() < 0.5 ? 1 : 2, // Random starting player
            cardsDrawn: 0,
            bothPlayersReady: false,
            gameOver: false,
            winner: null
        };
        
        this.updateDanceDenialUI();
    }

    createDanceDenialDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suitNames = ['spades', 'hearts', 'diamonds', 'clubs'];
        
        let deck = [];
        suits.forEach((suit, suitIndex) => {
            values.forEach(value => {
                deck.push({
                    value: value,
                    suit: suit,
                    suitName: suitNames[suitIndex],
                    number: this.getCardNumber(value)
                });
            });
        });
        
        // Add one joker
        deck.push({
            value: 'JOKER',
            suit: '🃏',
            suitName: 'joker',
            number: 0
        });
        
        return this.shuffleDeck(deck);
    }

    getCardNumber(value) {
        if (value === 'A') return 1;
        if (value === 'J') return 11;
        if (value === 'Q') return 12;
        if (value === 'K') return 15;
        return parseInt(value);
    }

    updateDanceDenialUI() {
        const game = this.danceDenialGame;
        
        // Update phase info
        if (game.phase === 1) {
            this.currentPhase.textContent = "Phase 1: Building Tension";
            this.phaseDescription.textContent = "Both players stretch together. Dancing is FORBIDDEN!";
            this.danceDenialScreen.className = 'dance-denial-screen phase-1';
        } else {
            this.currentPhase.textContent = "Phase 2: Dance Competition";
            this.phaseDescription.textContent = "Players take turns stretching. First to dance wins!";
            this.danceDenialScreen.className = 'dance-denial-screen phase-2';
        }
        
        // Update player info
        this.currentPlayer.textContent = `Player ${game.currentPlayer}'s Turn`;
        
        // Update stats
        this.danceCardCount.textContent = game.cardsDrawn;
        this.danceDeckCount.textContent = game.deck.length;
        this.phaseNumber.textContent = game.phase;
        
        // Update buttons
        this.drawDanceCardBtn.style.display = 'inline-block';
        this.readyBtn.classList.add('hidden');
        this.danceBtn.classList.add('hidden');
        
        if (game.phase === 1) {
            this.playerInstructions.textContent = "Draw a card. Both players stretch together!";
        } else {
            this.playerInstructions.textContent = `Draw a card and stretch ${game.lastCardNumber} times!`;
        }
    }

    drawDanceCard() {
        const game = this.danceDenialGame;
        
        if (game.deck.length === 0) {
            this.playerInstructions.textContent = "🎉 Deck complete! Game over - both players denied!";
            this.drawDanceCardBtn.style.display = 'none';
            return;
        }

        const card = game.deck.pop();
        game.cardsDrawn++;
        game.lastCardNumber = card.number;
        
        // Show card
        this.danceCardElement.classList.add('flip-animation');
        
        setTimeout(() => {
            this.danceCardValue.textContent = card.value;
            this.danceCardSuit.textContent = card.suit;
            this.danceCardElement.className = `card ${card.suitName}`;
            this.danceCardElement.style.display = 'flex';
            
            // Check if joker was drawn
            if (card.value === 'JOKER') {
                if (game.phase === 1) {
                    // Transition to phase 2
                    game.phase = 2;
                    this.playerInstructions.textContent = "🎉 JOKER! Phase 2 begins! Competition time!";
                    setTimeout(() => {
                        this.updateDanceDenialUI();
                    }, 2000);
                } else {
                    // Joker in phase 2 - shuffle and continue
                    game.deck = this.createDanceDenialDeck();
                    this.playerInstructions.textContent = "JOKER! Deck shuffled. Continue the competition!";
                }
            } else {
                // Regular card
                if (game.phase === 1) {
                    this.playerInstructions.textContent = `Both players stretch ${card.number} times! Say "Ready" when done.`;
                    this.readyBtn.classList.remove('hidden');
                } else {
                    this.playerInstructions.textContent = `Stretch ${card.number} times! You can dance anytime during your stretch!`;
                    this.danceBtn.classList.remove('hidden');
                }
            }
            
            this.updateDanceDenialUI();
        }, 300);
    }

    playerReady() {
        const game = this.danceDenialGame;
        
        if (game.phase === 1) {
            // Switch to other player
            game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
            this.readyBtn.classList.add('hidden');
            this.updateDanceDenialUI();
        }
    }

    playerDance() {
        const game = this.danceDenialGame;
        
        if (game.phase === 2 && !game.gameOver) {
            game.gameOver = true;
            game.winner = game.currentPlayer;
            
            this.playerInstructions.textContent = `🎉 Player ${game.winner} WINS! Enjoy your dance! 💃🕺`;
            this.danceBtn.classList.add('hidden');
            this.drawDanceCardBtn.style.display = 'none';
            
            // Add celebration effect
            this.danceDenialScreen.style.animation = 'pulse 0.5s infinite';
        }
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CardGame();
});


