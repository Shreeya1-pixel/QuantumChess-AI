import React from 'react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onExportPGN?: () => void
}

const Header: React.FC<HeaderProps> = ({ onExportPGN }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-quantum-dark/50 backdrop-blur-sm border-b border-quantum-primary/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-br from-quantum-primary to-quantum-secondary rounded-lg flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                QuantumChess AI
              </h1>
              <p className="text-quantum-light/70 text-sm">
                Classical vs Quantum Decision Making
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('about')}
              className="text-quantum-light/80 hover:text-quantum-primary transition-colors"
            >
              About
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('how-it-works')}
              className="text-quantum-light/80 hover:text-quantum-primary transition-colors"
            >
              How It Works
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExportPGN}
              className="bg-gradient-to-r from-quantum-primary to-quantum-secondary text-white px-4 py-2 rounded-lg font-medium"
            >
              Export PGN
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
