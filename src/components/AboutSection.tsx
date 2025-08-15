import React from 'react'
import { motion } from 'framer-motion'

const AboutSection: React.FC = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 bg-quantum-darker/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gradient mb-6">
              About QuantumChess AI
            </h2>
            <p className="text-xl text-quantum-light/80 leading-relaxed">
              Experience the future of chess strategy through the lens of quantum computing principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-quantum-dark/50 rounded-xl p-6 border border-quantum-primary/20"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-quantum-primary rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-quantum-primary">Classical AI</h3>
              </div>
              <p className="text-quantum-light/70 leading-relaxed">
                Traditional chess engines use deterministic algorithms, material evaluation, and tactical analysis 
                to find the optimal move. They excel at calculating concrete variations and immediate advantages.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-quantum-dark/50 rounded-xl p-6 border border-quantum-secondary/20"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-quantum-secondary rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-quantum-secondary">Quantum AI</h3>
              </div>
              <p className="text-quantum-light/70 leading-relaxed">
                Quantum-inspired algorithms simulate superposition, entanglement, and probabilistic collapse 
                to explore multiple strategic pathways simultaneously, often finding creative solutions 
                that classical engines might overlook.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold text-quantum-accent mb-4">
              Why Compare Classical vs Quantum?
            </h3>
            <p className="text-quantum-light/70 leading-relaxed max-w-3xl mx-auto">
              By comparing both approaches, you can see how different computational paradigms lead to 
              different strategic insights. Classical AI excels at concrete calculation, while quantum AI 
              explores the space of possibilities more broadly, often finding unexpected tactical opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutSection
