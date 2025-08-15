# QuantumChess AI

A sophisticated web-based chess application that demonstrates the fundamental differences between classical and quantum-inspired AI decision-making processes. This project explores how quantum computing principles can revolutionize strategic game AI.

## Overview

QuantumChess AI is an interactive chess platform that showcases the contrast between deterministic classical AI engines and probabilistic quantum-inspired decision systems. While classical AI always selects the optimal move based on deterministic evaluation, quantum AI explores multiple possibilities simultaneously through superposition and probabilistic collapse.

## Technical Architecture

### Frontend
- **React 18** with TypeScript for type-safe component development
- **TailwindCSS** for modern, responsive UI design
- **Framer Motion** for smooth animations and transitions
- **Chess.js** for robust chess logic and move validation
- **Custom SVG rendering** for precise move arrow visualization

### Backend
- **Node.js** with Express.js for API endpoints
- **Client-side AI simulation** for both classical and quantum engines
- **Real-time move analysis** with sophisticated evaluation algorithms

### AI Engines

#### Classical AI Engine
- **Piece-Square Tables**: Optimized positioning for each piece type
- **Tactical Evaluation**: Check detection, capture analysis, checkmate threats
- **Positional Analysis**: Center control, development, pawn structure
- **Game Phase Awareness**: Opening, middlegame, and endgame strategies
- **Mobility Assessment**: Legal move counting and piece activity
- **King Safety**: Castling bonuses and center distance penalties

#### Quantum AI Engine
- **Superposition Simulation**: Evaluates multiple moves simultaneously
- **Probabilistic Weighting**: Assigns quantum-inspired probabilities to moves
- **Entanglement Modeling**: Coordinates piece interactions across the board
- **Quantum Tunneling**: Identifies unexpected tactical breakthroughs
- **Coherence Analysis**: Maintains strategic harmony in position
- **Wavefunction Collapse**: Simulates quantum measurement process

## Key Features

### Dual AI Analysis
- **Real-time Comparison**: Side-by-side analysis of classical vs quantum moves
- **Color-coded Arrows**: Blue for classical AI, purple for quantum AI
- **Move Explanations**: Detailed reasoning for each AI's decision process
- **Probability Display**: Quantum AI confidence percentages

### Educational Quantum Explanations
- **Superposition**: "Quantum modeling explored 20 possible moves in parallel before collapsing to Nc6"
- **Entanglement**: "Quantum entanglement coordinated multiple piece threats before selecting Bg5"
- **Probabilistic Collapse**: "Quantum collapse selected Qxf7 with 18% probability from 15 options"
- **Quantum Tunneling**: "Quantum tunneling analysis identified Qh5 as a direct tactical breakthrough"
- **Coherence**: "Quantum coherence maintained positional stability while selecting d3"

### Advanced UI/UX
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern quantum-inspired aesthetic with neon highlights
- **Smooth Animations**: Framer Motion transitions for move highlights and arrows
- **Interactive Elements**: Hover effects, click feedback, and loading states

### Game Management
- **PGN Export**: Complete game export with AI commentary
- **Move History**: Detailed analysis tracking throughout the game
- **Game Reset**: Quick restart functionality
- **Status Indicators**: Check, checkmate, and draw detection

## Technical Implementation

### Classical AI Algorithm
```typescript
const evaluateClassicalPosition = (game: Chess, move: any, phase: string): number => {
  let evaluation = 0
  
  // Material evaluation with piece-square tables
  evaluation += evaluatePosition(game) * 10
  evaluation += evaluatePieceSquareTables(game, move)
  
  // Tactical and positional analysis
  evaluation += evaluateTactics(game, move)
  evaluation += evaluateMobility(game, move)
  evaluation += evaluateKingSafety(game, move)
  
  // Phase-specific evaluation
  if (phase === 'opening') evaluation += evaluateOpening(game, move)
  else if (phase === 'middlegame') evaluation += evaluateMiddlegame(game, move)
  else evaluation += evaluateEndgame(game, move)
  
  return evaluation
}
```

### Quantum AI Algorithm
```typescript
const generateQuantumMove = async (fen: string): Promise<QuantumMoveResult> => {
  const legalMoves = game.moves({ verbose: true })
  
  // Quantum-inspired weighting system
  const moveWeights = legalMoves.map(move => ({
    move,
    weight: calculateQuantumWeight(move, game)
  }))
  
  // Normalize to probability distribution
  const totalWeight = moveWeights.reduce((sum, mw) => sum + mw.weight, 0)
  const moveProbabilities = moveWeights.map(mw => ({
    ...mw,
    probability: mw.weight / totalWeight
  }))
  
  // Quantum measurement (probabilistic collapse)
  const random = Math.random()
  let cumulativeProbability = 0
  let selectedMove = moveProbabilities[0]
  
  for (const moveProb of moveProbabilities) {
    cumulativeProbability += moveProb.probability
    if (random <= cumulativeProbability) {
      selectedMove = moveProb
      break
    }
  }
  
  return {
    move: selectedMove.move.from + selectedMove.move.to,
    concept: selectQuantumConcept(selectedMove.move, game),
    probability: selectedMove.probability,
    explanation: generateQuantumExplanation(selectedMove, legalMoves.length, concept, game)
  }
}
```

## Future Research Potential

### Quantum Computing Integration
The current implementation provides a foundation for future integration with actual quantum computing systems:

- **IBM Qiskit Integration**: Real quantum circuit execution for move evaluation
- **Quantum Neural Networks**: Training quantum models on chess datasets
- **Quantum Machine Learning**: Using quantum algorithms for position evaluation
- **Quantum Error Correction**: Implementing fault-tolerant quantum chess algorithms

### Advanced AI Capabilities
With quantum computing advancement, this system could evolve into:

- **Quantum Chess Engines**: Capable of analyzing positions beyond classical computational limits
- **Multi-dimensional Analysis**: Exploring chess in higher-dimensional quantum spaces
- **Quantum Game Theory**: Developing strategies based on quantum game theory principles
- **Quantum Machine Learning**: Training quantum models on millions of chess games

### Theoretical Implications
This project demonstrates the potential for quantum computing to revolutionize AI:

- **Exponential Speedup**: Quantum algorithms could evaluate positions exponentially faster
- **Parallel Processing**: True quantum parallelism for move tree exploration
- **Quantum Advantage**: Solving chess problems intractable for classical computers
- **AI Superiority**: Future quantum chess engines could surpass even the strongest human players

## Installation and Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/Shreeya1-pixel/QuantumChess-AI.git
cd QuantumChess-AI

# Install dependencies
npm install

# Build the application
npm run build

# Start the development server
npm run dev

# Or start the production server
npm start
```

### Development
```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoints

### Classical AI Move
```http
POST /api/classical-move
Content-Type: application/json

{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}
```

### Quantum AI Move
```http
POST /api/quantum-move
Content-Type: application/json

{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}
```

## Contributing

This project welcomes contributions from the quantum computing and chess communities:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/quantum-enhancement`)
3. Commit your changes (`git commit -am 'Add quantum tunneling algorithm'`)
4. Push to the branch (`git push origin feature/quantum-enhancement`)
5. Create a Pull Request

## Research Applications

This project serves as a platform for:

- **Quantum Computing Education**: Demonstrating quantum concepts through chess
- **AI Research**: Comparing classical vs quantum decision-making processes
- **Game Theory**: Exploring quantum game theory applications
- **Machine Learning**: Developing quantum-inspired algorithms

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Chess.js for robust chess logic implementation
- Framer Motion for smooth animations
- TailwindCSS for modern UI design
- The quantum computing research community for inspiration

## Contact

For questions about quantum computing integration or chess AI development:
- GitHub: [Shreeya1-pixel](https://github.com/Shreeya1-pixel)
- Project: [QuantumChess AI](https://github.com/Shreeya1-pixel/QuantumChess-AI)

---

*This project represents the intersection of classical game theory, quantum computing principles, and modern web development. It demonstrates how quantum-inspired algorithms can provide new perspectives on traditional problems while maintaining educational value and technical sophistication.*
