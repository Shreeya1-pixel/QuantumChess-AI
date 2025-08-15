export type QuantumConcept = 'superposition' | 'entanglement' | 'probabilistic_collapse' | 'quantum_tunneling' | 'coherence'

export interface ClassicalMove {
  move: string
  reason: string
  evaluation: number
}

export interface QuantumMove {
  move: string
  concept: QuantumConcept
  probability: number
  explanation: string
}

export interface MoveAnalysis {
  classical: ClassicalMove
  quantum: QuantumMove
  timestamp: number
}

export interface ChessSquare {
  file: string
  rank: number
  piece?: string
  isHighlighted?: boolean
  isSelected?: boolean
}

export interface Arrow {
  from: string
  to: string
  type: 'classical' | 'quantum'
  id: string
}

export interface GameState {
  fen: string
  isCheck: boolean
  isCheckmate: boolean
  isDraw: boolean
  turn: 'w' | 'b'
  moveNumber: number
}
