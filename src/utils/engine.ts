import { Chess } from 'chess.js'
import { QuantumConcept } from '../types/chess'
import { evaluatePosition, getGamePhase } from './chessUtils'

interface ClassicalMoveResult {
  move: string
  reason: string
  evaluation: number
}

interface QuantumMoveResult {
  move: string
  concept: QuantumConcept
  probability: number
  explanation: string
}

// Enhanced classical engine simulation
export const generateClassicalMove = async (fen: string): Promise<ClassicalMoveResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
  
  const game = new Chess(fen)
  const moves = game.moves({ verbose: true })
  
  if (moves.length === 0) {
    return {
      move: '',
      reason: 'No legal moves available',
      evaluation: 0
    }
  }
  
  // Filter for only legal moves
  const legalMoves = moves.filter(move => {
    try {
      const testGame = new Chess(fen)
      return testGame.move(move) !== null
    } catch {
      return false
    }
  })
  
  if (legalMoves.length === 0) {
    return {
      move: '',
      reason: 'No legal moves available',
      evaluation: 0
    }
  }
  
  // Enhanced evaluation-based move selection
  let bestMove = legalMoves[0]
  let bestEvaluation = -Infinity
  
  for (const move of legalMoves) {
    const testGame = new Chess(fen)
    testGame.move(move)
    const evaluation = evaluateClassicalPosition(testGame, move, getGamePhase(game))
    
    if (evaluation > bestEvaluation) {
      bestEvaluation = evaluation
      bestMove = move
    }
  }
  
  const move = bestMove.from + bestMove.to
  const reason = generateClassicalReason(bestMove, bestEvaluation, getGamePhase(game))
  
  return {
    move,
    reason,
    evaluation: bestEvaluation
  }
}

// Quantum-inspired move generation
export const generateQuantumMove = async (fen: string): Promise<QuantumMoveResult> => {
  // Simulate quantum computation delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))
  
  const game = new Chess(fen)
  const moves = game.moves({ verbose: true })
  
  if (moves.length === 0) {
    return {
      move: '',
      concept: 'superposition',
      probability: 0,
      explanation: 'No legal moves available in quantum superposition.'
    }
  }
  
  // Filter out only legal moves and create quantum-inspired weights
  const legalMoves = moves.filter(move => {
    // Test if the move is actually legal
    try {
      const testGame = new Chess(fen)
      return testGame.move(move) !== null
    } catch {
      return false
    }
  })
  
  if (legalMoves.length === 0) {
    return {
      move: '',
      concept: 'superposition',
      probability: 0,
      explanation: 'No legal moves available in quantum superposition.'
    }
  }
  
  // Quantum-inspired move selection using superposition of possibilities
  const moveWeights = legalMoves.map(move => {
    const weight = calculateQuantumWeight(move, game)
    return { move, weight }
  })
  
  // Normalize weights to probabilities
  const totalWeight = moveWeights.reduce((sum, mw) => sum + mw.weight, 0)
  const moveProbabilities = moveWeights.map(mw => ({
    ...mw,
    probability: mw.weight / totalWeight
  }))
  
  // Select move based on quantum probability distribution
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
  
  const concept = selectQuantumConcept(selectedMove.move, game)
  const explanation = generateQuantumExplanation(selectedMove, legalMoves.length, concept, game)
  
  return {
    move: selectedMove.move.from + selectedMove.move.to,
    concept,
    probability: selectedMove.probability,
    explanation
  }
}

const evaluateClassicalPosition = (game: Chess, move: any, phase: string): number => {
  let evaluation = 0
  
  // Material evaluation
  evaluation += evaluatePosition(game) * 10
  
  // Piece-square table evaluation
  evaluation += evaluatePieceSquareTables(game, move)
  
  // Tactical evaluation
  evaluation += evaluateTactics(game, move)
  
  // Positional evaluation based on game phase
  if (phase === 'opening') {
    evaluation += evaluateOpening(game, move)
  } else if (phase === 'middlegame') {
    evaluation += evaluateMiddlegame(game, move)
  } else {
    evaluation += evaluateEndgame(game, move)
  }
  
  // Mobility evaluation
  evaluation += evaluateMobility(game, move)
  
  // King safety evaluation
  evaluation += evaluateKingSafety(game, move)
  
  return evaluation
}

const evaluatePieceSquareTables = (game: Chess, _move: any): number => {
  const pieceSquareTables = {
    p: [ // Pawn
      0,  0,  0,  0,  0,  0,  0,  0,
      50, 50, 50, 50, 50, 50, 50, 50,
      10, 10, 20, 30, 30, 20, 10, 10,
      5,  5, 10, 25, 25, 10,  5,  5,
      0,  0,  0, 20, 20,  0,  0,  0,
      5, -5,-10,  0,  0,-10, -5,  5,
      5, 10, 10,-20,-20, 10, 10,  5,
      0,  0,  0,  0,  0,  0,  0,  0
    ],
    n: [ // Knight
      -50,-40,-30,-30,-30,-30,-40,-50,
      -40,-20,  0,  0,  0,  0,-20,-40,
      -30,  0, 10, 15, 15, 10,  0,-30,
      -30,  5, 15, 20, 20, 15,  5,-30,
      -30,  0, 15, 20, 20, 15,  0,-30,
      -30,  5, 10, 15, 15, 10,  5,-30,
      -40,-20,  0,  5,  5,  0,-20,-40,
      -50,-40,-30,-30,-30,-30,-40,-50
    ],
    b: [ // Bishop
      -20,-10,-10,-10,-10,-10,-10,-20,
      -10,  0,  0,  0,  0,  0,  0,-10,
      -10,  0,  5, 10, 10,  5,  0,-10,
      -10,  5,  5, 10, 10,  5,  5,-10,
      -10,  0, 10, 10, 10, 10,  0,-10,
      -10, 10, 10, 10, 10, 10, 10,-10,
      -10,  5,  0,  0,  0,  0,  5,-10,
      -20,-10,-10,-10,-10,-10,-10,-20
    ],
    r: [ // Rook
      0,  0,  0,  0,  0,  0,  0,  0,
      5, 10, 10, 10, 10, 10, 10,  5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
      0,  0,  0,  5,  5,  0,  0,  0
    ],
    q: [ // Queen
      -20,-10,-10, -5, -5,-10,-10,-20,
      -10,  0,  0,  0,  0,  0,  0,-10,
      -10,  0,  5,  5,  5,  5,  0,-10,
       -5,  0,  5,  5,  5,  5,  0, -5,
        0,  0,  5,  5,  5,  5,  0, -5,
      -10,  5,  5,  5,  5,  5,  0,-10,
      -10,  0,  5,  0,  0,  0,  0,-10,
      -20,-10,-10, -5, -5,-10,-10,-20
    ],
    k: [ // King
      -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30,
      -20,-30,-30,-40,-40,-30,-30,-20,
      -10,-20,-20,-20,-20,-20,-20,-10,
       20, 20,  0,  0,  0,  0, 20, 20,
       20, 30, 10,  0,  0, 10, 30, 20
    ]
  }
  
  let score = 0
  const board = game.board()
  
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file]
      if (piece) {
        const table = pieceSquareTables[piece.type as keyof typeof pieceSquareTables]
        const index = piece.color === 'w' ? rank * 8 + file : (7 - rank) * 8 + file
        const multiplier = piece.color === 'w' ? 1 : -1
        score += table[index] * multiplier
      }
    }
  }
  
  return score / 100
}

const evaluateTactics = (game: Chess, move: any): number => {
  let score = 0
  
  // Check bonus
  if (game.isCheck()) {
    score += 50
  }
  
  // Capture bonus
  if (move.captured) {
    const pieceValues = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 }
    const capturedValue = pieceValues[move.captured as keyof typeof pieceValues] || 0
    score += capturedValue / 100
  }
  
  // Checkmate threat
  if (game.isCheckmate()) {
    score += 10000
  }
  
  return score
}

const evaluateOpening = (_game: Chess, move: any): number => {
  let score = 0
  
  // Center control
  const centerSquares = ['d4', 'd5', 'e4', 'e5']
  if (centerSquares.includes(move.to)) {
    score += 30
  }
  
  // Development
  if (move.piece === 'n' || move.piece === 'b') {
    score += 20
  }
  
  // Pawn structure
  if (move.piece === 'p') {
    if (move.to.includes('4') || move.to.includes('5')) {
      score += 15
    }
  }
  
  return score
}

const evaluateMiddlegame = (game: Chess, move: any): number => {
  let score = 0
  
  // Piece activity
  if (move.piece === 'q' || move.piece === 'r') {
    score += 25
  }
  
  // Attack on king
  // const opponentKing = game.turn() === 'w' ? 'k' : 'K'
  const board = game.board()
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file]?.type === 'k' && board[rank][file]?.color !== game.turn()) {
        // Check if move attacks near king
        const kingSquare = String.fromCharCode(97 + file) + (8 - rank)
        if (isNearKing(move.to, kingSquare)) {
          score += 20
        }
      }
    }
  }
  
  return score
}

const evaluateEndgame = (game: Chess, move: any): number => {
  let score = 0
  
  // King activation
  if (move.piece === 'k') {
    score += 40
  }
  
  // Pawn advancement
  if (move.piece === 'p') {
    const rank = parseInt(move.to[1])
    if (game.turn() === 'w') {
      score += (rank - 1) * 10
    } else {
      score += (8 - rank) * 10
    }
  }
  
  return score
}

const evaluateMobility = (game: Chess, _move: any): number => {
  const currentMoves = game.moves().length
  return currentMoves * 2
}

const evaluateKingSafety = (game: Chess, move: any): number => {
  let score = 0
  
  // Castling bonus
  if (move.san?.includes('O-O')) {
    score += 50
  }
  
  // King in center penalty
  const board = game.board()
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file]?.type === 'k' && board[rank][file]?.color === game.turn()) {
        const centerDistance = Math.abs(3.5 - file) + Math.abs(3.5 - rank)
        score -= centerDistance * 5
      }
    }
  }
  
  return score
}

const isNearKing = (square: string, kingSquare: string): boolean => {
  const file1 = square.charCodeAt(0) - 97
  const rank1 = parseInt(square[1]) - 1
  const file2 = kingSquare.charCodeAt(0) - 97
  const rank2 = parseInt(kingSquare[1]) - 1
  
  const distance = Math.max(Math.abs(file1 - file2), Math.abs(rank1 - rank2))
  return distance <= 2
}

const generateClassicalReason = (move: any, evaluation: number, phase: string): string => {
  const reasons = {
    opening: [
      'Develops piece to active square',
      'Controls center squares',
      'Prepares for kingside/queenside development',
      'Establishes pawn structure advantage',
      'Follows opening principles',
      'Improves piece coordination'
    ],
    middlegame: [
      'Creates tactical opportunity',
      'Improves piece coordination',
      'Attacks opponent\'s king position',
      'Gains material advantage',
      'Strengthens position',
      'Creates attacking chances'
    ],
    endgame: [
      'Activates king for endgame',
      'Creates passed pawn',
      'Improves pawn structure',
      'Centralizes pieces for attack',
      'Improves king position',
      'Advances pawns toward promotion'
    ]
  }
  
  const phaseReasons = reasons[phase as keyof typeof reasons]
  const randomReason = phaseReasons[Math.floor(Math.random() * phaseReasons.length)]
  
  if (evaluation > 2) {
    return `Classical AI prefers ${move.from.toUpperCase()}${move.to.toUpperCase()} for ${randomReason.toLowerCase()}.`
  } else if (evaluation < -2) {
    return `Classical AI suggests ${move.from.toUpperCase()}${move.to.toUpperCase()} to minimize disadvantage.`
  } else {
    return `Classical AI chooses ${move.from.toUpperCase()}${move.to.toUpperCase()} for ${randomReason.toLowerCase()}.`
  }
}

const calculateQuantumWeight = (move: any, _game: Chess): number => {
  let weight = 1.0
  
  // Position-based weighting
  const centerSquares = ['d4', 'd5', 'e4', 'e5']
  if (centerSquares.includes(move.to)) {
    weight *= 1.2
  }
  
  // Piece activity weighting
  const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
  const pieceValue = pieceValues[move.piece as keyof typeof pieceValues] || 0
  weight *= (1 + pieceValue * 0.1)
  
  // Tactical weighting
  if (move.captured) {
    weight *= 1.5
  }
  
  if (move.san?.includes('+')) {
    weight *= 1.3
  }
  
  // Add quantum randomness
  weight *= (0.8 + Math.random() * 0.4)
  
  return weight
}

const generateQuantumExplanation = (selectedMove: any, totalMoves: number, concept: QuantumConcept, _game: Chess): string => {
  const moveNotation = selectedMove.move.from.toUpperCase() + selectedMove.move.to.toUpperCase()
  const probabilityPercent = Math.round(selectedMove.probability * 100)
  
  const explanations = {
    superposition: [
      `Quantum modeling explored ${totalMoves} possible moves in parallel before collapsing to ${moveNotation} – unlike normal AI, which only outputs the single best move.`,
      `Quantum superposition evaluated ${totalMoves} move possibilities simultaneously, then collapsed to ${moveNotation} with ${probabilityPercent}% probability.`,
      `While classical AI picks one move, quantum AI maintains ${totalMoves} possibilities in superposition until measurement reveals ${moveNotation}.`,
      `Quantum algorithm processed ${totalMoves} parallel move states before wavefunction collapse selected ${moveNotation}.`
    ],
    entanglement: [
      `Quantum entanglement coordinated multiple piece threats before selecting ${moveNotation} – creating interconnected tactical possibilities.`,
      `Entangled piece movements led quantum AI to ${moveNotation}, where multiple pieces work in quantum correlation.`,
      `Quantum entanglement analysis revealed ${moveNotation} as the move that maximizes piece coordination across the board.`,
      `Through quantum entanglement, ${moveNotation} emerged as the move that creates the strongest piece correlations.`
    ],
    probabilistic_collapse: [
      `Quantum probabilistic collapse chose ${moveNotation} from ${totalMoves} possibilities – a calculated risk that classical AI might avoid.`,
      `Quantum measurement collapsed ${totalMoves} superposed states into ${moveNotation}, demonstrating probabilistic decision-making.`,
      `Unlike deterministic classical AI, quantum collapse selected ${moveNotation} with ${probabilityPercent}% probability from ${totalMoves} options.`,
      `Quantum wavefunction collapse revealed ${moveNotation} as the chosen move from ${totalMoves} parallel possibilities.`
    ],
    quantum_tunneling: [
      `Quantum tunneling analysis identified ${moveNotation} as a direct tactical breakthrough – bypassing classical defensive barriers.`,
      `Through quantum tunneling, ${moveNotation} emerged as the move that penetrates opponent's position most effectively.`,
      `Quantum tunneling algorithm found ${moveNotation} to be the optimal path through the opponent's defensive quantum barriers.`,
      `Quantum tunneling effect selected ${moveNotation} as the move that creates the most direct tactical advantage.`
    ],
    coherence: [
      `Quantum coherence analysis maintained positional stability while selecting ${moveNotation} from ${totalMoves} possibilities.`,
      `Quantum coherence preserved strategic harmony in choosing ${moveNotation} over ${totalMoves} alternative moves.`,
      `Through quantum coherence, ${moveNotation} emerged as the move that maintains the strongest positional quantum state.`,
      `Quantum coherence algorithm selected ${moveNotation} as the move that maximizes positional quantum stability.`
    ]
  }
  
  const conceptExplanations = explanations[concept]
  const randomExplanation = conceptExplanations[Math.floor(Math.random() * conceptExplanations.length)]
  
  return randomExplanation
}

const selectQuantumConcept = (move: any, _game: Chess): QuantumConcept => {
  // const concepts: QuantumConcept[] = [
  //   'superposition',
  //   'entanglement', 
  //   'probabilistic_collapse',
  //   'quantum_tunneling',
  //   'coherence'
  // ]
  
  // Select concept based on move characteristics
  if (move.captured) {
    return 'probabilistic_collapse'
  }
  
  if (move.san?.includes('+')) {
    return 'quantum_tunneling'
  }
  
  const centerSquares = ['d4', 'd5', 'e4', 'e5']
  if (centerSquares.includes(move.to)) {
    return 'coherence'
  }
  
  if (move.piece === 'q' || move.piece === 'r') {
    return 'entanglement'
  }
  
  return 'superposition'
}
