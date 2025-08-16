# QuantumChess AI

A fun experiment in blending classical AI chess engines with a basic quantum-inspired model.<br>


<!-- Deployment test - 2025-08-16 -->

## Inspiration

I was first fascinated when I read a paper on Quantum Computing. The idea that a computer doesn't just pick between 0 or 1 but can work with superpositions of both at once blew my mind.

Then I came across another paper on quantum chess — where moves aren't just deterministic but can involve probabilities and surprising alternatives. That made me think: What if I try to bring a taste of that idea into a simple project?

## Project Idea

This is a basic chess visualization where:
- You play a normal two-player chess game on a board.
- For each move, the board shows two arrows:
  1. Classical AI move (blue arrow) – generated from a sophisticated chess engine.
  2. Quantum-inspired move (purple arrow) – where instead of picking the single "best" move, the system samples from the top moves with some probability, reflecting the uncertainty/superposition idea.

The goal is not to fully simulate quantum computing (which would be extremely complex), but to give players an intuition of how quantum decision-making feels different from classical AI.

## How It Works (Simplified)

- **Classical Mode**: Uses chess.js to evaluate and pick the strongest move based on sophisticated algorithms including piece-square tables, tactical evaluation, and positional analysis.
- **Quantum Mode**: Uses a probabilistic model:
  - Takes all legal moves and assigns quantum-inspired weights
  - Creates a probability distribution instead of picking only one
  - Samples a move based on quantum concepts like superposition and entanglement
  - Sometimes matches the classical move, sometimes suggests creative alternatives

So, while classical AI always "goes for the obvious best choice," quantum-inspired mode keeps the door open for alternate strong moves and sometimes makes surprising tactical choices.

## Features

- Interactive chessboard (web UI).
- Arrows of different colors:
  - Blue = Classical AI move
  - Purple = Quantum-inspired move
- Turn-by-turn comparison: both White and Black get two candidate moves each turn.
- Educational explanations: Each quantum move comes with a one-liner explaining the quantum concept behind it.
- Minimal but clean UI aesthetics (Tailwind + React).
- PGN export with AI commentary.
- Game reset and move history tracking.

## Why I Built This

This project is not about building a full quantum computer or chess engine. It's about exploring ideas:
- How classical decision-making differs from quantum-inspired thinking.
- Making an abstract concept like quantum superposition more playable.
- Showing my curiosity in AI + Quantum Computing + Visualization.
- Demonstrating how quantum-inspired algorithms can provide new perspectives on traditional problems.

## Tech Stack

- **React 18** with TypeScript for type-safe component development
- **TailwindCSS** for modern, responsive UI design
- **Framer Motion** for smooth animations and transitions
- **Chess.js** for robust chess logic and move validation
- **Node.js** with Express.js for API endpoints
- **Client-side AI simulation** for both classical and quantum engines

## Technical Notes

### Classical AI Engine Architecture
The classical AI implements a multi-layered evaluation system with sophisticated algorithms:

- **Piece-Square Tables**: Optimized positioning matrices for each piece type, with dynamic weight adjustments based on game phase
- **Tactical Evaluation**: Advanced check detection, capture analysis, and checkmate threat assessment using move tree exploration
- **Positional Analysis**: Center control algorithms, development tracking, and pawn structure evaluation with isolated/doubled pawn detection
- **Game Phase Awareness**: Dynamic evaluation switching between opening (development focus), middlegame (tactical complexity), and endgame (king activity) strategies
- **Mobility Assessment**: Legal move counting with weighted piece activity scoring
- **King Safety**: Castling bonuses, king centralization penalties, and pawn shield evaluation

### Quantum AI Simulation Framework
The quantum AI implements a probabilistic decision-making system that simulates quantum computing principles:

- **Superposition Simulation**: Evaluates multiple moves simultaneously using weighted probability distributions instead of deterministic selection
- **Entanglement Modeling**: Coordinates piece interactions across the board through correlated move weighting algorithms
- **Quantum Tunneling**: Identifies unexpected tactical breakthroughs by exploring low-probability but high-impact move sequences
- **Coherence Analysis**: Maintains strategic harmony through position evaluation that considers move consistency and long-term planning
- **Wavefunction Collapse**: Simulates quantum measurement through probabilistic move selection with weighted random sampling

### Performance Optimizations
- **Move Generation**: Efficient legal move filtering using chess.js with O(n) complexity for position validation
- **Evaluation Caching**: Memoized position evaluations to prevent redundant calculations
- **Async Processing**: Non-blocking move generation with Promise-based architecture for responsive UI
- **Memory Management**: Optimized data structures for board state representation and move history tracking

### Frontend Architecture
- **React 18**: Leverages concurrent features and automatic batching for optimal rendering performance
- **TypeScript**: Type-safe component development with strict null checks and interface validation
- **Framer Motion**: Hardware-accelerated animations with spring physics for smooth transitions
- **TailwindCSS**: Utility-first CSS with custom quantum theme and responsive design system
- **SVG Rendering**: Custom arrow visualization with precise coordinate mapping and dynamic scaling

## Future Potential

This is a simplified experiment, not a real quantum algorithm. The "quantum" mode is a probabilistic approximation to demonstrate the concept.

I'd love to expand it later into deeper simulations with real quantum APIs (like IBM Qiskit). The potential for quantum computing in chess is fascinating - imagine a quantum chess engine that could analyze positions beyond what classical computers can handle, or even beat Magnus Carlsen in an hour through quantum advantage!

The theoretical implications are mind-blowing: quantum algorithms could evaluate chess positions exponentially faster, explore move trees in parallel, and solve problems that are currently intractable for classical computers.
<img width="3405" height="1965" alt="image" src="https://github.com/user-attachments/assets/9f7a2cad-3d30-451b-878c-0de0880cc1a2" />
<img width="3407" height="1952" alt="image" src="https://github.com/user-attachments/assets/2616af27-7abc-4966-915b-f56efd62b29f" />


## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup
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

## Notes

This is a simplified experiment, not a real quantum algorithm. The "quantum" mode is a probabilistic approximation to demonstrate the concept.

I'd love to expand it later into deeper simulations with real quantum APIs (like IBM Qiskit).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Chess.js for chess logic and validation
- Tailwind CSS for utility-first CSS framework
- Framer Motion for animation library
- React for frontend framework

---

*Made with curiosity and a fascination for quantum computing*
