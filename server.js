const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'QuantumChess AI Server Running' });
});

// Classical AI move endpoint
app.post('/api/classical-move', async (req, res) => {
  try {
    const { fen } = req.body;
    
    if (!fen) {
      return res.status(400).json({ error: 'FEN string is required' });
    }

    // Simulate classical engine response
    const response = {
      move: generateClassicalMove(fen),
      reason: generateClassicalReason(),
      evaluation: Math.random() * 2 - 1
    };

    // Add delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    res.json(response);
  } catch (error) {
    console.error('Classical move error:', error);
    res.status(500).json({ error: 'Failed to generate classical move' });
  }
});

// Quantum AI move endpoint
app.post('/api/quantum-move', async (req, res) => {
  try {
    const { fen } = req.body;
    
    if (!fen) {
      return res.status(400).json({ error: 'FEN string is required' });
    }

    // Simulate quantum engine response with delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const response = {
      move: generateQuantumMove(fen),
      concept: getRandomQuantumConcept(),
      probability: Math.random(),
      evaluation: Math.random() * 2 - 1
    };
    
    res.json(response);
  } catch (error) {
    console.error('Quantum move error:', error);
    res.status(500).json({ error: 'Failed to generate quantum move' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Helper functions for fallback responses
function generateClassicalMove(fen) {
  try {
    const Chess = require('chess.js').Chess;
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });
    
    if (moves.length === 0) return '';
    
    // Filter for legal moves only
    const legalMoves = moves.filter(move => {
      try {
        const testGame = new Chess(fen);
        return testGame.move(move) !== null;
      } catch {
        return false;
      }
    });
    
    if (legalMoves.length === 0) return '';
    
    // Select a random legal move
    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return randomMove.from + randomMove.to;
  } catch (error) {
    console.error('Error generating classical move:', error);
    return '';
  }
}

function generateQuantumMove(fen) {
  try {
    const Chess = require('chess.js').Chess;
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });
    
    if (moves.length === 0) return '';
    
    // Filter for legal moves only
    const legalMoves = moves.filter(move => {
      try {
        const testGame = new Chess(fen);
        return testGame.move(move) !== null;
      } catch {
        return false;
      }
    });
    
    if (legalMoves.length === 0) return '';
    
    // Select a random legal move with quantum bias
    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return randomMove.from + randomMove.to;
  } catch (error) {
    console.error('Error generating quantum move:', error);
    return '';
  }
}

function generateClassicalReason() {
  const reasons = [
    'Controls center squares and develops piece',
    'Establishes strong pawn structure',
    'Prepares for kingside development',
    'Creates tactical opportunities',
    'Improves piece coordination'
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
}

function getRandomQuantumConcept() {
  const concepts = ['superposition', 'entanglement', 'probabilistic_collapse', 'quantum_tunneling', 'coherence'];
  return concepts[Math.floor(Math.random() * concepts.length)];
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 QuantumChess AI Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎮 Web app: http://localhost:${PORT}`);
});
