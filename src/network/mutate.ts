import type { Genome } from './network'

export default (genome: Genome): Genome => {
  //  TODO: probably should clone first
  genome.mutateWeights()
  return genome
}