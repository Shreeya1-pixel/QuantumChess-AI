import { useState } from 'react'
import { motion } from 'framer-motion'
import Chessboard from './components/Chessboard'
import AnalysisPanel from './components/AnalysisPanel'
import Header from './components/Header'
import AboutSection from './components/AboutSection'
import HowItWorksSection from './components/HowItWorksSection'
import { Chess } from 'chess.js'
import { MoveAnalysis } from './types/chess'
import { generateClassicalMove, generateQuantumMove } from './utils/engine'
import { exportToPGN, downloadPGN, generateGameSummary } from './utils/pgnExport'

function App() {
  const [game, setGame] = useState(new Chess())
  const [analysis, setAnalysis] = useState<MoveAnalysis | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<MoveAnalysis[]>([])
  const [showQuantum, setShowQuantum] = useState(true)
  const [isThinking, setIsThinking] = useState(false)

  const handleMove = async (move: string) => {
    try {
      const newGame = new Chess(game.fen())
      const result = newGame.move(move)
      
      if (result) {
        setGame(newGame)
        setIsThinking(true)
        
        // Generate both classical and quantum moves
        const [classicalMove, quantumMove] = await Promise.all([
          generateClassicalMove(newGame.fen()),
          generateQuantumMove(newGame.fen())
        ])
        
                            const analysis: MoveAnalysis = {
                      classical: {
                        move: classicalMove.move,
                        reason: classicalMove.reason,
                        evaluation: classicalMove.evaluation
                      },
                      quantum: {
                        move: quantumMove.move,
                        concept: quantumMove.concept,
                        probability: quantumMove.probability,
                        explanation: quantumMove.explanation || ''
                      },
                      timestamp: Date.now()
                    }
        
        setAnalysis(analysis)
        setAnalysisHistory(prev => [...prev, analysis])
        setIsThinking(false)
      }
    } catch (error) {
      console.error('Move error:', error)
      setIsThinking(false)
    }
  }

  const resetGame = () => {
    setGame(new Chess())
    setAnalysis(null)
    setAnalysisHistory([])
  }

  const handleExportPGN = () => {
    if (analysisHistory.length === 0) {
      alert('No moves to export. Play a game first!')
      return
    }
    
    const pgnContent = exportToPGN(game, analysisHistory)
    const summary = generateGameSummary(game, analysisHistory)
    const fullContent = summary + '\n\n' + pgnContent
    
    const filename = `quantum-chess-game-${new Date().toISOString().split('T')[0]}.pgn`
    downloadPGN(fullContent, filename)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-quantum-dark to-quantum-darker">
      <Header onExportPGN={handleExportPGN} />
      
      <main>
        {/* Game Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chessboard Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-quantum-dark rounded-xl p-6 shadow-2xl border border-quantum-primary/20"
              >
                <Chessboard 
                  game={game}
                  onMove={handleMove}
                  analysis={analysis}
                  showQuantum={showQuantum}
                  isThinking={isThinking}
                />
              </motion.div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AnalysisPanel 
                  analysis={analysis}
                  showQuantum={showQuantum}
                  onToggleQuantum={() => setShowQuantum(!showQuantum)}
                  onReset={resetGame}
                  isThinking={isThinking}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* How It Works Section */}
        <HowItWorksSection />
      </main>
    </div>
  )
}

export default App
