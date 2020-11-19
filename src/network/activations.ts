export const input = (x: number) => () => x
export const identity = (x: number) => x
export const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))
export const normal = (x: number) => (1 / Math.sqrt(2*Math.PI)) * Math.exp(-(x*x)/2)
export const tanh = (x:number) => Math.tanh(x)
export const sine = (x:number) => Math.sin(x)
export const relu = (x: number) => Math.max(0, x)
export const abs = (x: number) => Math.abs(x)
export const square = (x: number) => x*x