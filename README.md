# QuantumChess AI

A fun experiment in blending classical AI chess engines with a basic quantum-inspired model.

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

The classical AI uses sophisticated evaluation including piece-square tables, tactical analysis, and positional understanding. The quantum AI implements a probabilistic model that simulates quantum concepts like superposition and entanglement through weighted move selection and probability distributions.

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
