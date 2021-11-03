/** @type {HTMLCanvasElement} */
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

class Root { 
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speedX = randomValue(-2, 2)
    this.speedY = randomValue(-2, 2)
    this.maxSize = randomValue(5, 12)
    this.size = randomValue(2, 3)
    this.angle = randomValue(0, Math.PI * 2)
  }

  update() {
    this.angle += 0.1
    this.x += this.speedX * Math.sin(this.angle)
    this.y += this.speedY * Math.cos(this.angle)
    this.size += 0.1
    if (this.size < this.maxSize) {
      drawCircle({ x: this.x, y: this.y, radius: this.size, hue: 140 })
      requestAnimationFrame(this.update.bind(this))
    }
  }
}



let frame, finalFrame,
  magnitudeFactor, mousedown
function init() {
  mousedown = false
  frame = 0
  finalFrame = 1000
  magnitudeFactor = randomValue(1, 3)
  angleFactor = randomValue(0, 1) * randomSign()
  initialHue = Math.random() * 360
  hueGrowth = randomValue(0, 0.5) * randomSign()
  growthFactor = Math.random() * 10

  window.addEventListener('pointerdown', e => {
    mousedown = true
  })
  window.addEventListener('pointerup', e => {
    mousedown = false
  })
  window.addEventListener('pointermove', e => {
    if (mousedown) {
      const root = new Root(e.x, e.y)
      for(var i = 0; i < 6; i++) {
        root.update()
      }
    }
  })
}


init()
