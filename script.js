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
        if (window.__onlineActive) return; // online mode owns the timer buttons
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
        if (window.__onlineActive) return; // online mode owns the timer buttons
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
        if (window.__onlineActive) return; // online mode owns the shared buttons
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
        if (window.__onlineActive) return; // online mode owns the back button
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
                <p>Welcome to the CIRCLE JERK!</p>
                <br>
                <p>Deck: 104 cards (2 full decks)</p>
                <br>
                <p>Wank together and have fun!</p>
            `;
        } else {
            this.gameInfoTitle.textContent = "Solo Game Rules";
            this.gameInfoContent.innerHTML = `
                <p>Follow masturbation instructions!</p>
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
    window.__cardGame = new CardGame();
});


/* ============================================================
   ONLINE MODE — P2P cams + chat + synced circle (p2p.js)
   Host runs the deck and broadcasts; peers render + act.
   ============================================================ */
(function () {
    const ROOM_PREFIX = 'bate';

    let p2p = null;
    let chat = null;
    let onlineDeck = null;

    window.__onlineActive = false;

    // Host-authoritative snapshot (peers hold a copy)
    const S = {
        phase: 'lobby',        // lobby | play
        players: [],           // [{id,name}]
        turnIdx: 0,
        drawn: 0,
        card: null,            // {value,suit,suitName,color,imagePath}
        instruction: '',
        duration: 0,
        deckLen: 104,
        deckEmpty: false
    };

    const tiles = new Map(); // identity -> { name, stream, muted }
    let lk = null;
    const net = { timer: null, running: false };

    const $ = (id) => document.getElementById(id);
    const me = () => p2p && p2p.me;
    const isHost = () => p2p && p2p.isHost;
    const myTurn = () => S.players.length && S.players[S.turnIdx].id === (me() && me().id);
    const canAct = () => myTurn() || isHost();

    function showOnlineScreen(which) {
        $('modeSelection').classList.add('hidden');
        $('gameScreen').classList.add('hidden');
        $('onlineHomeScreen').style.display = which === 'home' ? '' : 'none';
        $('onlineLobbyScreen').style.display = which === 'lobby' ? '' : 'none';
        if (which === 'game') {
            $('gameScreen').classList.remove('hidden');
            $('gameScreen').classList.add('visible');
        }
    }

    /* ---------- connect ---------- */

    async function connect(asHost, code) {
        const name = $('onlineNameInput').value.trim() || 'Gooner ' + Math.floor(Math.random() * 90 + 10);
        $('connectStatus').textContent = 'Getting your cam ready…';

        p2p = new P2PRoom({ prefix: ROOM_PREFIX, requireMedia: false }); // data channels only
        p2p.onRosterChange = () => {
            if (isHost() && S.phase === 'lobby') broadcast();
            renderLobby();
        };
        p2p.onPeerGone = (id, who) => {
            chat && chat.addMessage({ name: '', text: `${who} left the circle`, system: true });
            if (isHost() && S.phase === 'play') {
                const leavingIdx = S.players.findIndex(p => p.id === id);
                S.players = S.players.filter(p => p.id !== id);
                if (leavingIdx > -1 && leavingIdx <= S.turnIdx && S.turnIdx > 0) S.turnIdx--;
                if (S.players.length) S.turnIdx = S.turnIdx % S.players.length;
                broadcast();
            }
        };
        p2p.onHostGone = () => {
            alert('The host left — circle over.');
            location.hash = '';
            location.reload();
        };
        p2p.onHostMessage = onHostMessage;
        p2p.onPeerMessage = onPeerAction;
        p2p.onAnyMessage = (peerId, msg) => {
            if (msg && msg.type === 'chat') chat && chat.addMessage({ name: msg.name, text: msg.text, self: false });
        };
        p2p.onError = (err) => { $('connectStatus').textContent = '⚠️ ' + err.message; };

        try {
            if (asHost) {
                const link = await p2p.host(name);
                $('shareLink').textContent = link;
                p2p.setRoomMeta({ title: "BateCards Circle", password: $("passwordInput").value.trim() });
                // hub directory connects in the background so it never blocks the room
                p2p.connectHub(me().name).then(() => p2p.advertiseRoom());
            } else {
                $('connectStatus').textContent = 'Joining circle…';
                await p2p.join(name, code, $("passwordInput").value.trim());
            }
        } catch (err) {
            $('connectStatus').textContent = '⚠️ ' + (err.message || 'Could not connect.');
            return;
        }

        chat = mountChatUI($('chatRoot'), {
            selfName: name,
            onSend: (text) => {
                p2p.sendAll({ type: 'chat', name: me().name, text });
                chat.addMessage({ name: me().name, text, self: true });
            }
        });

        // ---- LiveKit cams (media layer) ----
        lk = new LKMedia();
        lk.onTile = (id, label, stream, isLocal) => {
            tiles.set(id, { name: label, stream, muted: isLocal });
            addTile(id, label, stream, isLocal);
        };
        lk.onRemoveTile = (id) => {
            tiles.delete(id);
            removeTile(id);
        };
        lk.onError = (err) => { $('connectStatus').textContent = '⚠️ ' + err.message; };
        await lk.connect(p2p.hostId, p2p.me.id, name);

        window.__onlineActive = true;
        $('mediaBar').classList.remove('hidden');
        if (isHost()) $('startCircleBtn').classList.remove('hidden');
        else $('waitingHostNote').classList.remove('hidden');

        showOnlineScreen('lobby');
        setTiles();
        renderLobby();
        $('connectStatus').textContent = '';
    }

    /* ---------- video tiles ---------- */

    function activeGrid() {
        if ($('gameScreen').classList.contains('visible')) return $('videoGridGame');
        return $('videoGridLobby');
    }

    function setTiles() {
        const grid = activeGrid();
        if (!grid) return;
        grid.innerHTML = '';
        tiles.forEach((t, id) => addTile(id, t.name, t.stream, t.muted));
    }

    function addTile(peerId, label, stream, muted) {
        const grid = activeGrid();
        if (!grid) return;
        let tile = grid.querySelector(`[data-peer="${peerId}"]`);
        if (!tile) {
            tile = document.createElement('div');
            tile.className = 'video-tile';
            tile.dataset.peer = peerId;
            tile.innerHTML = '<video autoplay playsinline></video><span class="tile-label"></span>';
            grid.appendChild(tile);
        }
        const v = tile.querySelector('video');
        v.muted = muted;
        if (v.srcObject !== stream) v.srcObject = stream;
        tile.querySelector('.tile-label').textContent = label;
    }

    function removeTile(peerId) {
        document.querySelectorAll(`[data-peer="${peerId}"]`).forEach(t => t.remove());
    }

    /* ---------- state sync ---------- */

    function broadcast() {
        if (isHost()) p2p.hostBroadcast({ type: 'state', game: { ...S } });
    }

    function onHostMessage(msg) {
        if (!msg || typeof msg !== 'object') return;
        if (msg.type === 'state') {
            const wasPlaying = S.phase === 'play';
            Object.assign(S, msg.game);
            if (S.phase === 'play' && !wasPlaying) {
                prepGameScreen();
                showOnlineScreen('game');
            }
            renderLobby();
            renderGame();
        }
        if (msg.type === 'timer') {
            if (msg.op === 'start') runNetTimer(msg);
            if (msg.op === 'stop') stopNetTimer();
            if (msg.op === 'end') { stopNetTimer(); $('timerDisplay').textContent = "Time's up!"; }
        }
    }

    function onPeerAction(peerId, name, msg) {
        if (!msg || typeof msg !== 'object') return;
        const actorAllowed = myTurnActorId() === peerId || peerId === me().id;

        if (msg.type === 'timerReq' && msg.op === 'start') {
            const allowed = myTurnActorId() === peerId;
            if (!allowed) return;
            p2p.hostBroadcast({ type: 'timer', op: 'start', duration: S.duration, at: Date.now() });
            runNetTimer({ duration: S.duration, at: Date.now() });
            return;
        }

        if (msg.type !== 'action' || !actorAllowed) return;
        if (msg.op === 'draw') hostDrawCard();
        if (msg.op === 'newDeck') hostNewDeck(false);
    }

    function myTurnActorId() {
        return S.players.length ? S.players[S.turnIdx].id : null;
    }

    /* ---------- host deck logic ---------- */

    function hostStartCircle() {
        S.players = p2p.roster.map(p => ({ id: p.id, name: p.name }));
        S.phase = 'play';
        hostNewDeck(true);
    }

    function hostNewDeck(first) {
        onlineDeck = window.__cardGame.createDeck(2);
        S.drawn = 0;
        S.turnIdx = 0;
        S.card = null;
        S.deckEmpty = false;
        S.deckLen = onlineDeck.length;
        S.instruction = first
            ? 'Circle up! Draw rights go around the circle — follow every card together or on your turn!'
            : 'Fresh deck! Keep going, bros.';
        S.duration = 0;
        p2p.hostBroadcast({ type: 'timer', op: 'stop' });
        broadcast();
    }

    function hostDrawCard() {
        if (!onlineDeck || S.deckEmpty) return;

        let card = null, attempts = 0;
        while (!card) {
            if (onlineDeck.length === 0) {
                S.deckEmpty = true;
                S.card = null;
                S.instruction = '🎉 Deck complete! Host can deal a new deck for round 2.';
                S.duration = 0;
                broadcast();
                return;
            }
            card = onlineDeck.pop();
            attempts++;
            if (S.drawn < 5 && card.value === 'A') {
                onlineDeck.unshift(card);
                window.__cardGame.shuffleDeck(onlineDeck);
                card = null;
            }
            if (attempts > 50) break;
        }

        S.drawn++;
        S.card = card;

        const opts = window.__cardGame.instructions[card.value];
        S.instruction = opts ? opts.group[card.color] : 'No instruction found for ' + card.value;
        S.duration = window.__cardGame.extractTimerDuration(S.instruction);
        S.deckLen = onlineDeck.length;

        // advance turn
        if (S.players.length) S.turnIdx = (S.turnIdx + 1) % S.players.length;

        broadcast();
    }

    /* ---------- timer sync ---------- */

    function doTimerStart() {
        if (S.duration <= 0) return;
        if (isHost()) {
            p2p.hostBroadcast({ type: 'timer', op: 'start', duration: S.duration, at: Date.now() });
            runNetTimer({ duration: S.duration, at: Date.now() });
        } else {
            p2p.sendToHost({ type: 'timerReq', op: 'start' });
        }
    }

    function runNetTimer({ duration, at }) {
        stopNetTimer(false);
        net.running = true;
        const tick = () => {
            const remaining = duration - (Date.now() - at) / 1000;
            $('timerDisplay').textContent = remaining <= 0 ? "0:00" : fmt(remaining);
            if (remaining <= 0) {
                stopNetTimer(false);
                $('timerDisplay').textContent = "Time's up!";
                if (isHost()) p2p.hostBroadcast({ type: 'timer', op: 'end' });
            }
        };
        tick();
        net.timer = setInterval(tick, 250);
        syncTimerButtons();
    }

    function stopNetTimer(updateButtons = true) {
        if (net.timer) clearInterval(net.timer);
        net.timer = null;
        net.running = false;
        if (updateButtons) syncTimerButtons();
    }

    function fmt(t) {
        t = Math.max(0, Math.round(t));
        return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0');
    }

    /* ---------- rendering ---------- */

    function renderLobby() {
        if (!p2p) return;
        const wrap = $('lobbyPlayers');
        wrap && (wrap.innerHTML = '');
        p2p.roster.forEach((p, i) => {
            const chip = document.createElement('span');
            chip.className = 'chip';
            chip.textContent = (i === 0 ? '👑 ' : '') + p.name + (p.id === me().id ? ' (you)' : '');
            wrap && wrap.appendChild(chip);
        });
    }

    function prepGameScreen() {
        $('turnOrder').classList.remove('hidden');
        $('gameInfoTitle').textContent = 'Online Circle Rules';
        $('gameInfoContent').innerHTML = `
            <p>Welcome to the ONLINE CIRCLE JERK!</p>
            <br>
            <p>Draw rights rotate around the circle. Follow every card — together.</p>
        `;
        setTiles();
    }

    function renderGame() {
        // players chips
        const wrap = $('turnOrder');
        wrap.innerHTML = '';
        S.players.forEach((p, i) => {
            const chip = document.createElement('span');
            chip.className = 'chip';
            if (i < S.turnIdx && S.drawn >= S.players.length) chip.classList.add('done');
            if (i === S.turnIdx) chip.classList.add('up-next');
            chip.textContent = p.name + (p.id === (me() && me().id) ? ' (you)' : '');
            wrap.appendChild(chip);
        });

        // card
        const cardEl = $('card');
        if (S.card) {
            $('cardImage').src = S.card.imagePath;
            $('cardImage').alt = S.card.value + ' of ' + S.card.suit;
            cardEl.className = 'card ' + S.card.suitName + ' flip-animation';
            cardEl.style.display = 'flex';
        } else {
            cardEl.style.display = 'none';
        }

        // instruction
        $('instruction').textContent = S.instruction || 'Waiting for the host…';
        $('instruction').classList.remove('hidden');
        $('instruction').classList.add('visible');

        // stats
        $('cardCount').textContent = S.drawn;
        $('deckCount').textContent = S.deckLen;

        // timer section
        if (!net.running) $('timerDisplay').textContent = fmt(S.duration || 0);
        $('timerSection').style.display = S.duration > 0 ? '' : 'none';

        syncTimerButtons();
        syncDrawButton();
    }

    function syncDrawButton() {
        const btn = $('drawBtn');
        if (S.deckEmpty) {
            btn.style.display = isHost() ? '' : 'none';
            btn.textContent = '🔄 New Deck (Host)';
            return;
        }
        btn.style.display = canAct() ? '' : 'none';
        btn.textContent = myTurn() ? 'Draw Your Card' : `Draw (${S.players[S.turnIdx] ? S.players[S.turnIdx].name : '…'})`;
    }

    function syncTimerButtons() {
        const canTime = canAct() && S.duration > 0;
        $('startTimerBtn').style.display = canTime && !net.running ? '' : 'none';
        $('stopTimerBtn').style.display = canTime && net.running ? '' : 'none';
    }

    /* ---------- events ---------- */

    function init() {
        $('onlineMode').addEventListener('click', () => {
            $('modeSelection').classList.add('hidden');
            showOnlineScreen('home');
        });
        $('onlineBackBtn').addEventListener('click', () => {
            $('onlineHomeScreen').style.display = 'none';
            $('modeSelection').classList.remove('hidden');
        });

        $('hostRoomBtn').addEventListener('click', () => connect(true));
        $('joinRoomBtn').addEventListener('click', () => {
            const code = $('joinCodeInput').value.trim().toLowerCase();
            if (code.length !== 6) { $('connectStatus').textContent = 'Enter the 6-character room code.'; return; }
            connect(false, code);
        });

        const m = location.hash.match(/#join=([a-z0-9]{6})/i);
        if (m) {
            $('modeSelection').classList.add('hidden');
            showOnlineScreen('home');
            $('joinCodeInput').value = m[1].toLowerCase();
            $('connectStatus').textContent = 'Link loaded — enter your name and hit Join.';
            $('onlineNameInput').focus();
        }

        $('copyLinkBtn').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText($('shareLink').textContent);
                $('copyLinkBtn').textContent = 'Copied!';
                setTimeout(() => ($('copyLinkBtn').textContent = 'Copy'), 1500);
            } catch (_) {}
        });
        $('textLinkBtn').addEventListener('click', async () => {
            const url = $('shareLink').textContent;
            if (navigator.share) {
                try { await navigator.share({ title: 'BATECARDS Online Circle', text: 'Jerk with me — join my circle:', url }); return; } catch (_) {}
            }
            try { await navigator.clipboard.writeText(url); alert('Link copied — text it to your buds!'); } catch (_) {}
        });
        $('startCircleBtn').addEventListener('click', () => {
            hostStartCircle();
            prepGameScreen();
            showOnlineScreen('game');
        });
        $('leaveLobbyBtn').addEventListener('click', () => { p2p && p2p.destroy(); location.hash = ''; location.reload(); });

        // online overrides for the shared game buttons (guarded by __onlineActive)
        drawIntercept();
        $('startTimerBtn').addEventListener('click', () => { if (window.__onlineActive) doTimerStart(); }, true);
        $('stopTimerBtn').addEventListener('click', () => {
            if (!window.__onlineActive) return;
            stopNetTimer();
            if (isHost()) p2p.hostBroadcast({ type: 'timer', op: 'stop' });
        }, true);

        $('backToMode').addEventListener('click', () => {
            if (!window.__onlineActive) return;
            p2p && p2p.destroy();
            location.hash = '';
            location.reload();
        }, true);

        $('toggleMicBtn').addEventListener('click', async () => {
            const on = lk ? await lk.toggleMic() : false;
            $('toggleMicBtn').classList.toggle('media-off', !on);
        });
        $('toggleCamBtn').addEventListener('click', async () => {
            const on = lk ? await lk.toggleCam() : false;
            $('toggleCamBtn').classList.toggle('media-off', !on);
        });
    }

    function drawIntercept() {
        // CardGame.drawCard() early-returns when __onlineActive, so this
        // plain listener is the only draw path while online.
        $('drawBtn').addEventListener('click', () => {
            if (!window.__onlineActive) return;
            if (S.deckEmpty) { if (isHost()) hostNewDeck(false); return; }
            if (!canAct()) return;
            if (isHost()) hostDrawCard();
            else p2p.sendToHost({ type: 'action', op: 'draw' });
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
