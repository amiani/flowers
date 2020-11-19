import { sigmoid } from '../network/activations'
import makeNet from '../network/makeNet'
import genome from '../network/IdentityNet'

test('identity net returns input', () => {
  const net = makeNet(genome.connections, genome.genes)
  expect(net(.5, .6, .7, .8)).toEqual([.5, .6, .7, .8].map(sigmoid))
})