import { QuantumConcept } from '../types/chess'

export const getQuantumExplanation = (concept: QuantumConcept): string => {
  const explanations: { [key in QuantumConcept]: string } = {
    superposition: 'Quantum model suggests this move as it maintains multiple tactical pathways simultaneously, keeping options open like quantum superposition.',
    entanglement: 'This move coordinates piece threats in tandem, creating interconnected tactical possibilities across the board.',
    probabilistic_collapse: 'A calculated risk that can yield sudden advantage, representing the collapse of quantum probabilities into decisive action.',
    quantum_tunneling: 'This move bypasses traditional defensive structures, finding unexpected tactical opportunities.',
    coherence: 'Maintains strategic harmony across all pieces, ensuring coordinated quantum-like coherence in the position.'
  }
  
  return explanations[concept]
}

export const getQuantumConceptDescription = (concept: QuantumConcept): string => {
  const descriptions: { [key in QuantumConcept]: string } = {
    superposition: 'Multiple possibilities exist simultaneously until a move is made',
    entanglement: 'Pieces coordinate their influence across the board',
    probabilistic_collapse: 'Risk-taking that can lead to sudden advantage',
    quantum_tunneling: 'Finding unexpected paths through defensive structures',
    coherence: 'Maintaining strategic harmony across all pieces'
  }
  
  return descriptions[concept]
}

export const getQuantumIcon = (concept: QuantumConcept): string => {
  const icons: { [key in QuantumConcept]: string } = {
    superposition: '⚛️',
    entanglement: '🔗',
    probabilistic_collapse: '💥',
    quantum_tunneling: '🚀',
    coherence: '✨'
  }
  
  return icons[concept]
}
