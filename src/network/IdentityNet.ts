import { Connection, Gene, Genome } from './network'
import { sigmoid, sine } from './activations'

const genes = new Map<number, Gene>()
genes[1] = {
  id: 1,
  activation: () => .5,
  isOutput: false,
  distance: 0,
}

genes[2] = {
  id: 2,
  activation: () => .6,
  isOutput: false,
  distance: 0,
}

genes[3] = {
  id: 3,
  activation: () => .7,
  isOutput: false,
  distance: 0,
}

genes[4] = {
  id: 4,
  activation: () => .8,
  isOutput: false,
  distance: 0,
}

genes[5] = {
  id: 5,
  activation: sigmoid,
  isOutput: true,
  distance: 1,
}

genes[6] = {
  id: 6,
  activation: sigmoid,
  isOutput: true,
  distance: 1,
}

genes[7] = {
  id: 7,
  activation: sigmoid,
  isOutput: true,
  distance: 1,
}

genes[8] = {
  id: 8,
  activation: sine,
  isOutput: true,
  distance: 1,
}

const connections: Array<Connection> = [
  {
    id: 1,
    from: 1,
    to: 5,
    weight: Math.random() - .5
  },
  {
    id: 2,
    from: 2,
    to: 6,
    weight: Math.random() - .5
  },
  {
    id: 3,
    from: 3,
    to: 7,
    weight: Math.random() - .5
  },
  {
    id: 4,
    from: 4,
    to: 8,
    weight: (Math.random() - .5) / 2
  },
]

const genome = new Genome()
genome.connections = connections
genome.genes = genes
export default genome