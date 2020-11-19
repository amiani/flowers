const getColorIndicesForCoord = (x: number, y: number, width: number) => {
  const red = y * (width * 4) + x * 4
  return [red, red + 1, red + 2, red + 3]
}

const drawLayer = (net: Function, imageData: ImageData, layer: number, width: number, height: number): ImageData => {
  const data = imageData.data
  const scale = Math.pow(1/2, layer)
  let count = 0
  for (let theta = 0; theta <= 2*Math.PI; theta += Math.PI/500) {
    let P = 6
    const out = net(Math.sin(P*theta), 0, layer, 1)
    const rmax = Math.abs(out[3]) * (width / 2 - 20) + 20
    for (let r = 1; r <= rmax; r+=1) {
      const [red, green, blue, rmax] = net(Math.sin(P*theta), r, layer, 1)
      const x = Math.floor(r * Math.cos(theta) * scale + width / 2)
      const y = Math.floor(height / 2 - r * Math.sin(theta) * scale)
      const colorIndices = getColorIndicesForCoord(x, y, width)
      const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices
      data[redIndex] = Math.floor(red * 255)
      data[greenIndex] = Math.floor(green * 255)
      data[blueIndex] = Math.floor(blue * 255)
      count++
    }
  }
  console.log('count: ', count)
  return imageData
}

export default (net: Function, ctx: CanvasRenderingContext2D, width: number, height: number): ImageData => {
  const imageData = ctx.getImageData(0, 0, width, height)
  drawLayer(net, imageData, 0, width, height)
  drawLayer(net, imageData, 1, width, height)
  drawLayer(net, imageData, 2, width, height)
  return imageData
}