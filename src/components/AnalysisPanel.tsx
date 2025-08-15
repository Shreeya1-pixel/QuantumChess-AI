import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoveAnalysis } from '../types/chess'

interface AnalysisPanelProps {
  analysis: MoveAnalysis | null
  showQuantum: boolean
  onToggleQuantum: () => void
  onReset: () => void
  isThinking: boolean
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  analysis,
  showQuantum,
  onToggleQuantum,
  onReset,
  isThinking
}) => {
  return (
    <div className="bg-quantum-dark rounded-xl p-6 shadow-2xl border border-quantum-primary/20 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gradient">Move Analysis</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="text-quantum-light/70 hover:text-quantum-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </div>

        {/* Quantum Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-quantum-light/80 text-sm">Show Quantum Analysis</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onToggleQuantum}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showQuantum ? 'bg-quantum-secondary' : 'bg-quantum-light/20'
            }`}
          >
            <motion.span
              layout
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showQuantum ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </motion.button>
        </div>

        {/* Analysis Content */}
        <AnimatePresence mode="wait">
          {isThinking ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-quantum-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-quantum-light/70">AI engines analyzing position...</p>
              </div>
            </motion.div>
          ) : analysis ? (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Classical AI Analysis */}
              <div className="bg-quantum-darker/50 rounded-lg p-4 border border-quantum-primary/20">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-quantum-primary rounded-full" />
                  <h3 className="font-semibold text-quantum-primary">Classical AI</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-quantum-light/80 text-sm">Best Move:</span>
                    <span className="font-mono font-bold text-quantum-primary">
                      {analysis.classical.move}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-quantum-light/80 text-sm">Evaluation:</span>
                    <span className={`font-semibold ${
                      analysis.classical.evaluation > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {analysis.classical.evaluation > 0 ? '+' : ''}{analysis.classical.evaluation.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="mt-3 p-3 bg-quantum-dark/50 rounded border-l-2 border-quantum-primary">
                    <p className="text-sm text-quantum-light/90">
                      {analysis.classical.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantum AI Analysis */}
              {showQuantum && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-quantum-darker/50 rounded-lg p-4 border border-quantum-secondary/20"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-quantum-secondary rounded-full animate-pulse" />
                    <h3 className="font-semibold text-quantum-secondary">Quantum AI</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-light/80 text-sm">Suggested Move:</span>
                      <span className="font-mono font-bold text-quantum-secondary">
                        {analysis.quantum.move}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-light/80 text-sm">Confidence:</span>
                      <span className="font-semibold text-quantum-secondary">
                        {(analysis.quantum.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="mt-3 p-3 bg-quantum-dark/50 rounded border-l-2 border-quantum-secondary">
                      <p className="text-sm text-quantum-light/90 leading-relaxed">
                        {analysis.quantum.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Comparison */}
              {showQuantum && analysis.classical.move !== analysis.quantum.move && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-quantum-primary/10 to-quantum-secondary/10 rounded-lg p-4 border border-quantum-accent/20"
                >
                  <h4 className="font-semibold text-quantum-accent mb-2">Analysis Difference</h4>
                  <p className="text-sm text-quantum-light/80">
                    The classical engine prioritizes {analysis.classical.move} for immediate tactical advantage, 
                    while the quantum model suggests {analysis.quantum.move} to maintain strategic flexibility.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-quantum-light/50"
            >
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p>Make a move to see AI analysis</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        <div className="border-t border-quantum-primary/20 pt-4">
          <details className="group">
            <summary className="cursor-pointer text-quantum-light/70 hover:text-quantum-primary transition-colors">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Why Quantum Chess?</span>
              </span>
            </summary>
            <div className="mt-3 text-sm text-quantum-light/70 space-y-2">
              <p>
                Quantum chess explores how quantum principles like superposition and entanglement 
                can influence strategic decision-making in chess.
              </p>
              <p>
                While classical engines optimize for immediate advantage, quantum models consider 
                multiple parallel possibilities simultaneously.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default AnalysisPanel
