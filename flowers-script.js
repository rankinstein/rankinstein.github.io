const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.globalCompositeOperation = 'destination-over'


function clearCanvas() {
  ctx.clearRect(0,0, canvas.width, canvas.height)
}

function randomSign() {
  return Math.sign(Math.random() - 0.5)
}

function randomValue(min, max) {
  return Math.random() * (max - min) + min
}

function hslString(hue, saturation, lightness) {
  return `hsl(${hue},${saturation}%,${lightness}%)`
}

function drawCircle({ x, y, radius, hue = 1 }) {
  ctx.fillStyle = hslString(hue, 100, 50)
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

let frame, finalFrame,
  magnitudeFactor
function init() {
  frame = 0
  finalFrame = 1000
  magnitudeFactor = randomValue(1, 3)
  angleFactor = randomValue(0, 1) * randomSign()
  initialHue = Math.random() * 360
  hueGrowth = randomValue(0, 0.5) * randomSign()
  growthFactor = Math.random() * 10
  console.log({
    magnitudeFactor,
    angleFactor,
    initialHue,
    hueGrowth,
    growthFactor
  })
}

function update() {
  frame++
  const angle = frame
  return {
    x: magnitudeFactor * frame * Math.cos(-angle*angleFactor) + canvas.width / 2,
    y: magnitudeFactor * frame * Math.sin(-angle*angleFactor) + canvas.height / 2,
    radius: Math.sqrt(frame * growthFactor),
    hue: (initialHue + frame) * hueGrowth
  }
}

function draw(state) {
  drawCircle(state)
}

function animate() {
  //clearCanvas()
  const state = update()
  draw(state)
  if (frame > finalFrame) {
    return
  }
  // animate()
  requestAnimationFrame(animate)
}
init()
animate()
