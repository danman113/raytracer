import { Line } from './line'
import './style.css'
import { ZERO, angle, degToRad, multiply, radToDeg, scale, sub, sum, v3 } from './vector'

const width = 300
const height = 300
const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = width
canvas.height = height

const c: CanvasRenderingContext2D = canvas.getContext('2d')!

const a = v3(50, 0, 0)
const b = v3(50, 50, 0)
const camera = v3(width / 2, height / 2, 0)
const cameraScale = v3(1, -1, 1)

const drawLine = (start: v3, end: v3) => {
  c.beginPath()
  c.moveTo(start[0], start[1])
  c.lineTo(end[0], end[1])
  c.stroke()
  c.closePath()
}

const drawVector = (end: v3, start: v3 = ZERO) => {
  const normalizedStart = sum(camera, multiply(start, cameraScale))
  const normalizedEnd = sum(camera, multiply(end, cameraScale))
  drawLine(normalizedStart, normalizedEnd)
}

const drawPoint = (point: v3, size = 5) => {
  const halfSize = size / 2
  const [x, y, _z] = sum(camera, multiply(point, cameraScale))
  
  c.fillRect(x - halfSize, y - halfSize, size, size)
}

const drawCircle = (point: v3, radius = 5) => {
  const [x, y, _z] = sum(camera, multiply(point, cameraScale))
  
  c.arc(x, y, radius, 0, Math.PI * 2)
  c.fill()
}

const colors = [
  'red',
  'green',
  'blue',
  'cyan',
  'magenta',
  'brown',
  'yellow',
  'purple'
]

const topLeft = v3(width / -2, height / 2)
const bottomRight = v3(width / 2, height / -2)

const midnight = v3(0, 1)
const oneThirty = v3(1, 1)
const three = v3(1, 0)
const fourThirty = v3(1, -1)
const six = v3(0, -1)


let degrees = 0
const circleScale = 25
const offsets = v3(
  Math.cos(degToRad(degrees)) * circleScale,
  Math.sin(degToRad(degrees)) * circleScale,
  0
)
let start = v3(0, -50)
let circlePoint = v3(-50, 50)
const circleRadius = 40

const screenToWorld = (v: v3) => {
  const inverseCameraScale = scale(cameraScale, -1)
  const inverseCamera = multiply(camera, inverseCameraScale)
  return sum(inverseCamera, multiply(v, cameraScale))
}

canvas.addEventListener('click', (e) => {
  const mouse = v3(e.offsetX, e.offsetY)
  start = screenToWorld(mouse)
})

canvas.addEventListener('wheel', (e) => {
  degrees += (e.deltaY / 50)
  offsets[0] = Math.cos(degToRad(degrees)) * circleScale
  offsets[1] = Math.sin(degToRad(degrees)) * circleScale
})

canvas.addEventListener('contextmenu', (e) => {
  const mouse = v3(e.offsetX, e.offsetY)
  circlePoint = screenToWorld(mouse)
})


const draw = () => {
  c.clearRect(0, 0, width, height)
  const vectors = [midnight, oneThirty, three, fourThirty, six]
  // for (let i = 0; i < vectors.length; i++) {
  //   c.strokeStyle = colors[i]
  //   const line = new Line(ZERO, sum(vectors[i], ZERO))
  //   const bounds = line.getBorderPointsInBoundingCube(topLeft, bottomRight)
  //   const [left, right] = bounds
  //   drawVector(left, right)
  //   c.fillStyle = 'red'
  //   drawPoint(left, 10)
  //   drawPoint(right, 10)
  // }

  {
    const line = new Line(start, offsets)
    const [min, max] = line.getBorderPointsInBoundingCube(topLeft, bottomRight)
    c.strokeStyle = 'red'
    c.lineWidth = 1
    drawVector(min, max)
    c.fillStyle = 'blue'
    drawPoint(min, 10)
    drawPoint(max, 10)
    c.strokeStyle = 'purple'
    c.lineWidth = 4
    drawVector(start, sum(start, offsets))
    c.fillStyle = 'purple'
    drawVector(start, sum(start, scale(line.normal, 25)))
    
    const distance = Math.abs(line.getSignedDistanceFromPoint(circlePoint))
    c.fillStyle = distance < circleRadius ? 'red' : 'cyan'
    drawCircle(circlePoint, circleRadius)
  }
  
  // for(let i = 0; i < vectors.length; i++) {
  //   c.strokeStyle = colors[i]
  //   c.lineWidth = 4
  //   drawVector(vectors[i])
  // }
  c.fillStyle = 'purple'
  drawPoint(topLeft, 20)
  drawPoint(bottomRight, 20)
  c.fillStyle = 'black'
  c.fillText(`Angle: ${radToDeg(angle(a, b))}`, 10, 10)
  requestAnimationFrame(draw)
}

draw()