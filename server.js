const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/games', (req, res) => {
  const games = [
    {
      id: 1,
      name: 'Flappy Bird',
      description: 'Classic flappy bird game',
      category: 'arcade',
      image: '/images/flappy-bird.png',
      url: '/games/flappy-bird'
    },
    {
      id: 2,
      name: 'Snake Game',
      description: 'Classic snake game',
      category: 'arcade',
      image: '/images/snake.png',
      url: '/games/snake'
    },
    {
      id: 3,
      name: 'Tic Tac Toe',
      description: 'Play tic tac toe against AI',
      category: 'puzzle',
      image: '/images/tictactoe.png',
      url: '/games/tictactoe'
    },
    {
      id: 4,
      name: 'Memory Game',
      description: 'Test your memory',
      category: 'puzzle',
      image: '/images/memory.png',
      url: '/games/memory'
    }
  ];
  res.json(games);
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboard = [
    { rank: 1, player: 'Player1', score: 9500, game: 'Flappy Bird' },
    { rank: 2, player: 'Player2', score: 8700, game: 'Snake Game' },
    { rank: 3, player: 'Player3', score: 7200, game: 'Flappy Bird' },
    { rank: 4, player: 'Player4', score: 6500, game: 'Memory Game' },
    { rank: 5, player: 'Player5', score: 5800, game: 'Tic Tac Toe' }
  ];
  res.json(leaderboard);
});

app.post('/api/score', (req, res) => {
  const { player, game, score } = req.body;
  console.log(`Score recorded: ${player} - ${game} - ${score}`);
  res.json({ success: true, message: 'Score recorded successfully' });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Mercury Games Platform running on http://localhost:${PORT}`);
});
