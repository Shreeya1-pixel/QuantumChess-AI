import React from 'react'
import { motion } from 'framer-motion'
// import { getQuantumIcon } from '../utils/explanations'

const HowItWorksSection: React.FC = () => {
  const quantumConcepts = [
    {
      concept: 'superposition',
      title: 'Superposition',
      description: 'Multiple possibilities exist simultaneously until a move is made',
      explanation: 'The quantum engine considers multiple move possibilities at once, keeping strategic options open rather than committing to a single "best" move.',
      icon: '⚛️'
    },
    {
      concept: 'entanglement',
      title: 'Entanglement',
      description: 'Pieces coordinate their influence across the board',
      explanation: 'Strategic moves that coordinate multiple pieces, creating interconnected tactical possibilities that classical engines might miss.',
      icon: '🔗'
    },
    {
      concept: 'probabilistic_collapse',
      title: 'Probabilistic Collapse',
      description: 'Risk-taking that can lead to sudden advantage',
      explanation: 'The quantum model sometimes chooses riskier moves with high potential, representing the collapse of quantum probabilities into decisive action.',
      icon: '💥'
    },
    {
      concept: 'quantum_tunneling',
      title: 'Quantum Tunneling',
      description: 'Finding unexpected paths through defensive structures',
      explanation: 'Moves that bypass traditional defensive setups, finding creative tactical opportunities that classical engines might overlook.',
      icon: '🚀'
    },
    {
      concept: 'coherence',
      title: 'Coherence',
      description: 'Maintaining strategic harmony across all pieces',
      explanation: 'Ensures all pieces work together optimally, prioritizing long-term strategic planning over immediate tactical gains.',
      icon: '✨'
    }
  ]

  return (
    <motion.section
      id="how-it-works"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 bg-quantum-dark/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gradient mb-6">
              How It Works
            </h2>
            <p className="text-xl text-quantum-light/80 leading-relaxed">
              Understanding the quantum principles behind our chess AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {quantumConcepts.map((concept, index) => (
              <motion.div
                key={concept.concept}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-quantum-dark/50 rounded-xl p-6 border border-quantum-secondary/20 hover:border-quantum-secondary/40 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{concept.icon}</span>
                  <h3 className="text-lg font-semibold text-quantum-secondary">
                    {concept.title}
                  </h3>
                </div>
                <p className="text-quantum-light/80 text-sm mb-3 font-medium">
                  {concept.description}
                </p>
                <p className="text-quantum-light/60 text-sm leading-relaxed">
                  {concept.explanation}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-quantum-primary/10 to-quantum-secondary/10 rounded-xl p-8 border border-quantum-accent/20"
          >
            <h3 className="text-2xl font-semibold text-quantum-accent mb-6 text-center">
              The Quantum Advantage
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-quantum-primary mb-3">
                  Classical Approach
                </h4>
                <ul className="text-quantum-light/70 space-y-2">
                  <li>• Deterministic move selection</li>
                  <li>• Material-based evaluation</li>
                  <li>• Concrete tactical calculation</li>
                  <li>• Immediate advantage optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-quantum-secondary mb-3">
                  Quantum Approach
                </h4>
                <ul className="text-quantum-light/70 space-y-2">
                  <li>• Probabilistic move selection</li>
                  <li>• Position-based evaluation</li>
                  <li>• Strategic possibility exploration</li>
                  <li>• Long-term coherence optimization</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold text-quantum-light mb-4">
              Ready to Experience Quantum Chess?
            </h3>
            <p className="text-quantum-light/70 leading-relaxed max-w-3xl mx-auto">
              Start playing and see how quantum-inspired decision making differs from classical chess engines. 
              Each move will show you both perspectives, helping you understand the strategic differences 
              between these computational approaches.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default HowItWorksSection
