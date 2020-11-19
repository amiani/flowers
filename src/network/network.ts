import * as activations from './activations'
import genome from './IdentityNet'

export interface Connection {
  id: number,
  from: number,
  to: number,
  weight: number
}

export interface Gene {
  id: number,
  activation: Function,
  isOutput: boolean,
  distance: number
}

export class Genome {
  private static genomeId = 1
  private static geneId = 9
  private static connectionId = 5

  private _id = Genome.genomeId++
  get id(): number { return this._id }

  public connections: Array<Connection>
  public genes: Map<number, Gene>

  clone(): Genome {
    const genome = new Genome()
    genome.connections = this.connections.map(c => ({...c}))
    genome.genes = new Map<number, Gene>()
    Object.values(this.genes).forEach(g => genome.genes[g.id] = {...g})
    return genome
  }

  mutate(): Genome {
    const clone = this.clone()
    clone.mutateWeights()
    if (Math.random() < .5) {
      clone.addConnection()
    }
    if (Math.random() < .3) {
      clone.addGene()
    }
    return clone
  }

  mutationProb = .1
  mutateWeights() {
    this.connections.forEach((c: Connection) => {
      if (Math.random() < this.mutationProb) {
        c.weight += Math.random() * .3 - .6
      }
    })
  }

  addConnection() {
    calculateDistances(this.connections, this.genes)
    const ids = Object.values(this.genes).map(g => g.id)
    const fromCandidates = ids.filter(id => ![5, 6, 7, 8].some(outId => outId == id))

    let from
    let nonadjacent
    do {
      from = fromCandidates[Math.floor(Math.random()*fromCandidates.length)]
      const fromConns = this.connections.filter(c => c.from == from).map(c => c.to)
      nonadjacent = Object.values(this.genes).map(g => g.id)
      nonadjacent = ids.filter(id => {
        return !fromConns.some(to => to == id)
          && ![1, 2, 3, 4].some(to => to == id)
          && this.genes[id].distance > this.genes[from].distance
      })
    } while (nonadjacent.length == 0)

    const to = nonadjacent[Math.floor(Math.random()*nonadjacent.length)]
    this.connections.push({
      id: Genome.connectionId++,
      from,
      to,
      weight: Math.random() * 2 - 1
    })
  }

  deleteConnection() {

  }

  addGene(): number {
    const connIndex = Math.floor(Math.random()*this.connections.length)
    const fromOld = this.connections[connIndex].from
    const toOld = this.connections[connIndex].to
    this.connections.splice(connIndex, 1)

    let a = { ...activations }
    delete a.input
    const candidateActivations = Object.values(a)
    const activation = candidateActivations[Math.floor(Math.random()*candidateActivations.length)]
    const id = Genome.geneId++
    this.genes[id] = {
      id,
      activation,
      isOutput: false,
      distance: 1
    }
    this.connections.push({
      id: Genome.connectionId++,
      from: fromOld,
      to: id,
      weight: Math.random() * 2 - 1
    })
    this.connections.push({
      id: Genome.connectionId++,
      from: id,
      to: toOld,
      weight: Math.random() * 2 - 1
    })
    return id
  }

  cross(other: Genome, numChildren: number): Array<Genome> {
    const proto = this.clone()
    for (const g of Object.values(other.genes)) {
      proto.genes[g.id] = {...g}
    }
    const children = Array<Genome>(numChildren)
      .fill(proto, 0, numChildren)
      .map(p => {
        const child = p.clone()
        child.connections = []
        return child
      })
    
    for (const c of other.connections) {
      const thisIndex = proto.connections.findIndex(p => p.id === c.id)
      if (thisIndex != -1) {
        for (const child of children) {
          if (Math.random() < .5) {
            child.connections.push(proto.connections[thisIndex])
          } else {
            child.connections.push(c)
          }
        }
        proto.connections.splice(thisIndex, 1)
      } else {
        for (const child of children) {
          child.connections.push(c)
        }
      }
    }
    children.forEach(c => c.connections = c.connections.concat(proto.connections))
    console.log('children: ', children)
    return children.map(c => c.mutate())
  }
}

export const calculateDistances = (connections: Array<Connection>, genes: Map<number, Gene>) => {
  const conns = [...connections]
  const done = new Map<number, Gene>()
  done[1] = genes[1]
  done[2] = genes[2]
  done[3] = genes[3]
  done[4] = genes[4]
  while (conns.length > 0) {
    for (let i = conns.length - 1; i != -1; i--) {
      const c = conns[i]
      if (done[c.from]) {
        genes[c.to].distance = done[c.from].distance + 1
        done[c.to] = genes[c.to]
        conns.splice(i, 1)
      }
    }
  }
}