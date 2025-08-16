import { Chess } from 'chess.js'

export interface SquareCoordinates {
  x: number
  y: number
}

export const getSquareCoordinates = (square: string): SquareCoordinates | null => {
  if (square.length !== 2) return null
  
  const file = square.charCodeAt(0) - 97 // 'a' = 0, 'b' = 1, etc.
  const rank = 8 - parseInt(square[1]) // '1' = 7, '2' = 6, etc.
  
  if (file < 0 || file > 7 || rank < 0 || rank > 7) return null
  
  return { x: file, y: rank }
}

export const isValidMove = (game: Chess, move: string): boolean => {
  try {
    const moves = game.moves({ verbose: true })
    return moves.some(m => m.from + m.to === move)
  } catch {
    return false
  }
}

export const getLegalMoves = (game: Chess, square: string): string[] => {
  try {
    const moves = game.moves({ square: square as any, verbose: true })
    return moves.map((m: any) => m.to)
  } catch {
    return []
  }
}

export const getPieceValue = (piece: string): number => {
  const values: { [key: string]: number } = {
    'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0
  }
  return values[piece.toLowerCase()] || 0
}

export const evaluatePosition = (game: Chess): number => {
  const board = game.board()
  let evaluation = 0
  
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file]
      if (piece) {
        const value = getPieceValue(piece.type)
        const multiplier = piece.color === 'w' ? 1 : -1
        evaluation += value * multiplier
      }
    }
  }
  
  return evaluation
}

export const formatMove = (move: string): string => {
  if (move.length === 4) {
    return move.toUpperCase()
  }
  return move
}

export const getGamePhase = (game: Chess): 'opening' | 'middlegame' | 'endgame' => {
  const pieceCount = game.board().flat().filter(p => p !== null).length
  
  if (pieceCount > 20) return 'opening'
  if (pieceCount > 10) return 'middlegame'
  return 'endgame'
}
