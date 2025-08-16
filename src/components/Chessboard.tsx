import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chess } from 'chess.js'
import { MoveAnalysis, Arrow } from '../types/chess'
import { getSquareCoordinates, isValidMove } from '../utils/chessUtils'

interface ChessboardProps {
  game: Chess
  onMove: (move: string) => void
  analysis: MoveAnalysis | null
  showQuantum: boolean
  isThinking: boolean
}

const Chessboard: React.FC<ChessboardProps> = ({
  game,
  onMove,
  analysis,
  showQuantum,
  isThinking
}) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [arrows, setArrows] = useState<Arrow[]>([])
  const boardRef = useRef<HTMLDivElement>(null)

  // Update arrows when analysis changes
  useEffect(() => {
    if (analysis) {
      const newArrows: Arrow[] = []
      
      // Add classical arrow (blue)
      if (analysis.classical.move) {
        newArrows.push({
          from: analysis.classical.move.slice(0, 2),
          to: analysis.classical.move.slice(2, 4),
          type: 'classical',
          id: `classical-${Date.now()}`
        })
      }
      
      // Add quantum arrow (purple) if enabled
      if (showQuantum && analysis.quantum.move) {
        newArrows.push({
          from: analysis.quantum.move.slice(0, 2),
          to: analysis.quantum.move.slice(2, 4),
          type: 'quantum',
          id: `quantum-${Date.now()}`
        })
      }
      
      setArrows(newArrows)
    } else {
      setArrows([])
    }
  }, [analysis, showQuantum])

  const handleSquareClick = (square: string) => {
    if (isThinking) return

    if (selectedSquare) {
      const move = selectedSquare + square
      if (isValidMove(game, move)) {
        onMove(move)
        setSelectedSquare(null)
      } else {
        setSelectedSquare(square)
      }
    } else {
      const piece = game.get(square as any)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
      }
    }
  }

  const renderSquare = (file: string, rank: number) => {
    const square = file + rank
    const piece = game.get(square as any)
    const isLight = (file.charCodeAt(0) - 97 + rank) % 2 === 0
    const isSelected = selectedSquare === square
    const isHighlighted = arrows.some(arrow => arrow.from === square || arrow.to === square)

    return (
      <motion.div
        key={square}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSquareClick(square)}
        className={`
          relative w-full h-full flex items-center justify-center cursor-pointer
          ${isLight ? 'bg-chess-light' : 'bg-chess-dark'}
          ${isSelected ? 'ring-2 ring-quantum-primary ring-opacity-50' : ''}
          ${isHighlighted ? 'ring-2 ring-quantum-secondary ring-opacity-30' : ''}
        `}
      >
        {piece && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl"
          >
            {getPieceSymbol(piece)}
          </motion.div>
        )}
        
        {/* Square label */}
        {rank === 1 && (
          <div className="absolute bottom-1 left-1 text-xs text-gray-600 font-medium">
            {file.toUpperCase()}
          </div>
        )}
        {file === 'a' && (
          <div className="absolute top-1 left-1 text-xs text-gray-600 font-medium">
            {rank}
          </div>
        )}
      </motion.div>
    )
  }

  const renderArrow = (arrow: Arrow) => {
    const fromCoords = getSquareCoordinates(arrow.from)
    const toCoords = getSquareCoordinates(arrow.to)
    
    if (!fromCoords || !toCoords) return null

    // Calculate positions as percentages of the board
    // Each square is 12.5% of the board (100% / 8)
    const squareSize = 12.5
    const fromX = fromCoords.x * squareSize + squareSize / 2
    const fromY = fromCoords.y * squareSize + squareSize / 2
    const toX = toCoords.x * squareSize + squareSize / 2
    const toY = toCoords.y * squareSize + squareSize / 2

    return (
      <motion.svg
        key={arrow.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id={`arrowhead-${arrow.type}-${arrow.id}`}
            markerWidth="2"
            markerHeight="1.5"
            refX="1.5"
            refY="0.75"
            orient="auto"
          >
            <polygon
              points="0 0, 2 0.75, 0 1.5"
              fill={arrow.type === 'classical' ? '#3b82f6' : '#a855f7'}
            />
          </marker>
        </defs>
        <line
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          className={`move-arrow ${arrow.type}`}
          strokeWidth="0.8"
          markerEnd={`url(#arrowhead-${arrow.type}-${arrow.id})`}
        />
      </motion.svg>
    )
  }

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-quantum-light/80">
            Turn: <span className="font-semibold text-quantum-primary">
              {game.turn() === 'w' ? 'White' : 'Black'}
            </span>
          </div>
          <div className="text-quantum-light/80">
            Move: <span className="font-semibold text-quantum-secondary">
              {Math.floor(game.moveNumber() / 2) + 1}
            </span>
          </div>
        </div>
        
        {isThinking && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center space-x-2 text-quantum-accent"
          >
            <div className="w-2 h-2 bg-quantum-accent rounded-full animate-pulse" />
            <span className="text-sm">AI Thinking...</span>
          </motion.div>
        )}
      </div>

      {/* Chessboard */}
      <div className="relative">
        <div
          ref={boardRef}
          className="grid grid-cols-8 grid-rows-8 w-full max-w-2xl mx-auto aspect-square border-2 border-quantum-primary/30 rounded-lg overflow-hidden relative"
        >
          {Array.from({ length: 8 }, (_, rank) =>
            Array.from({ length: 8 }, (_, file) =>
              renderSquare(String.fromCharCode(97 + file), 8 - rank)
            )
          )}
          
          {/* Arrows */}
          <AnimatePresence>
            {arrows.map(arrow => renderArrow(arrow))}
          </AnimatePresence>
        </div>
      </div>

      {/* Game Status Messages */}
      <AnimatePresence>
        {game.isCheckmate() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <span className="text-red-400 font-semibold">Checkmate!</span>
          </motion.div>
        )}
        
        {game.isCheck() && !game.isCheckmate() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
          >
            <span className="text-yellow-400 font-semibold">Check!</span>
          </motion.div>
        )}
        
        {game.isDraw() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-4 bg-gray-500/20 border border-gray-500/30 rounded-lg"
          >
            <span className="text-gray-400 font-semibold">Draw!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const getPieceSymbol = (piece: any) => {
  const symbols: { [key: string]: string } = {
    'wp': '♙', 'wr': '♖', 'wn': '♘', 'wb': '♗', 'wq': '♕', 'wk': '♔',
    'bp': '♟', 'br': '♜', 'bn': '♞', 'bb': '♝', 'bq': '♛', 'bk': '♚'
  }
  return symbols[piece.color + piece.type] || ''
}

export default Chessboard
