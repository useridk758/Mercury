// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');

    // Load data if needed
    if (sectionId === 'games') {
        loadGames();
    } else if (sectionId === 'leaderboard') {
        loadLeaderboard();
    }
}

// Load games from API
async function loadGames() {
    try {
        const response = await fetch('/api/games');
        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

// Display games in grid
function displayGames(games) {
    const container = document.getElementById('games-container');
    container.innerHTML = '';

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image">🎮</div>
            <div class="game-content">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <span class="game-tag">${game.category}</span>
                <button class="play-btn" onclick="playGame('${game.id}', '${game.name}')">Play Now</button>
            </div>
        `;
        container.appendChild(gameCard);
    });
}

// Load leaderboard from API
async function loadLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        const leaderboard = await response.json();
        displayLeaderboard(leaderboard);
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

// Display leaderboard
function displayLeaderboard(leaderboard) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';

    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${entry.rank}</strong></td>
            <td>${entry.player}</td>
            <td>${entry.game}</td>
            <td><strong>${entry.score}</strong></td>
        `;
        tbody.appendChild(row);
    });
}

// Play game function
function playGame(gameId, gameName) {
    alert(`Starting ${gameName}...`);
    // Here you would navigate to the game or load it
    console.log(`Playing game ${gameId}: ${gameName}`);
}

// Record score
async function recordScore(playerName, gameName, score) {
    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player: playerName,
                game: gameName,
                score: score
            })
        });
        const result = await response.json();
        console.log('Score recorded:', result);
    } catch (error) {
        console.error('Error recording score:', error);
    }
}

// Load initial data
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mercury Games Platform loaded!');
});
