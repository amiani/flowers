export default (fns, weights) => x => fns.reduce((v, f) => f(v), x)