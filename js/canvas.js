//import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

var gravity = 1
var friction = 0.59

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', function () {
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction
    } else {
      this.dy += gravity
      console.log(this.dy)
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Implementation
let objects
var ball
//var balls
function init() {
  //ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red')
  balls = []

  //console.log(ball)
  
  for (let i = 0; i < 200; i++) {
    var radius = randomIntFromRange(8, 30)
    var x = randomIntFromRange(radius, canvas.width - radius)
    var y = randomIntFromRange(0, canvas.height - radius)
    var dx = randomIntFromRange(-2, 2)
    var dy = randomIntFromRange(-2, 2)
    var color = randomColor(colors)
    balls.push(new Ball (x, y, dx, dy, radius, color))
  }
  console.log(balls)
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  
  c.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < balls.length; i++) {
    balls[i].update()
  }
  //ball.update()
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
