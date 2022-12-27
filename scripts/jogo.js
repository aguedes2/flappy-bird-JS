const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const spritesheet = new Image()
spritesheet.src = '/flappy-bird-JS/assets/sprites/sprites.png'

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravity: 0.7,
  draw() {
    ctx.drawImage(
      spritesheet, //image
      this.spriteX,
      this.spriteY, //Sprite X, Sprite Y
      this.largura,
      this.altura, //Tamanho do recorte na spritesheet
      this.x,
      this.y, //Posição x e y para desenhar
      this.largura,
      this.altura //tamanho da imagem a printar
    )
  },
  move() {
    if (this.y + this.altura < canvas.height) {
      this.y += this.gravity
    }
  },
  pula() {
    addEventListener('click', () => {
      this.y -= 20
    })
  }
}
//chao
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  draw() {
    ctx.drawImage(
      spritesheet,
      this.spriteX,
      this.spriteY,
      this.largura,
      this.altura,
      this.x,
      this.y,
      this.largura,
      this.altura
    )
    ctx.drawImage(
      spritesheet,
      this.spriteX,
      this.spriteY,
      this.largura,
      this.altura,
      this.x + this.largura,
      this.y,
      this.largura,
      this.altura
    )
  }
}
//fundo
const fundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 276,
  altura: 204,
  x: 0,
  y: canvas.width - 112,
  draw() {
    ctx.fillStyle = '#70C5CE'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      spritesheet,
      this.spriteX,
      this.spriteY,
      this.largura,
      this.altura,
      this.x,
      this.y,
      this.largura,
      this.altura
    )
    ctx.drawImage(
      spritesheet,
      this.spriteX,
      this.spriteY,
      this.largura,
      this.altura,
      this.x + this.largura,
      this.y,
      this.largura,
      this.altura
    )
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  fundo.draw()
  chao.draw()
  flappyBird.draw()
  // flappyBird.move()

  requestAnimationFrame(loop)
}

loop()
