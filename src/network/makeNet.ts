import type { Connection, Gene } from './network'
import { input } from './activations'

interface NetNode {
  id: number,
  inputs: Array<NetNode>,
  weights: Array<number>,
  activation: Function
}

const dot = (u: Array<number>, v: Array<number>): number => {
  let tot = 0
  for (let i = 0; i != u.length; i++) {
    tot += u[i] * v[i]
  }
  return tot
}

const activate = (n: NetNode): number => {
  if (n.inputs.length == 0) {
    return n.activation()
  }
  const inputs = n.inputs.map(activate)
  return n.activation(dot(inputs, n.weights))
}

export default (connections: Array<Connection>, genes: Map<number, Gene>): Function => {
  const nodes = new Map<number, NetNode>()
  const outputs = Array<NetNode>()
  Object.keys(genes).forEach(id => {
    const g = genes[id]
    nodes[id] = {
      ...g,
      inputs: [],
      weights: [],
    }
    g.isOutput && outputs.push(nodes[g.id])
  })

  connections.forEach((conn:Connection) => {
    nodes[conn.to].inputs.push(nodes[conn.from])
    nodes[conn.to].weights.push(conn.weight)
  },[])
  
  return (theta: number, r: number, layer: number, bias: number) => {
    nodes[1].activation = input(theta)
    nodes[2].activation = input(r)
    nodes[3].activation = input(layer)
    nodes[4].activation = input(bias)
    return outputs.map(activate)
  }
}