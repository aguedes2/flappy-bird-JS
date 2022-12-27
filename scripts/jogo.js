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
  isDead: false,
  velocidade: 0,
  gravity: 0.25,
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
  update() {
    this.dead()
    if (this.y + this.altura < canvas.height && !this.isDead) {
      this.velocidade += this.gravity
      this.y += this.velocidade
    }
  },
  pula() {
    if (!this.isDead) {
      addEventListener('click', () => {
        this.y -= 20
        this.velocidade = 0
      })
    }
  },
  dead() {
    if (this.y + this.velocidade >= canvas.height - 112) {
      this.isDead = true
      mudaTela(Telas.GAME_OVER)
    }
  },
  init() {
    this.isDead = false
    this.y = 50
    this.velocidade = 0
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

///mensagem GetReady
const mensagemGetReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: canvas.width / 2 - 87,
  y: canvas.height * 0.25,
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
  }
}

const mensagemGameOver = {
  spriteX: 134,
  spriteY: 152,
  largura: 256,
  altura: 201,
  x: canvas.width / 2 - 110,
  y: canvas.height * 0.2,
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
  }
}

/**
 * Telas
 */
let telaAtiva = {}
function mudaTela(novaTela) {
  telaAtiva = novaTela
}
const Telas = {
  INICIO: {
    draw() {
      Telas.JOGO.draw()
      mensagemGetReady.draw()
    },
    update() {
      flappyBird.init()
      addEventListener('click', () => {
        mudaTela(Telas.JOGO)
      })
    }
  },
  JOGO: {
    draw() {
      fundo.draw()
      chao.draw()
      flappyBird.draw()
    },
    update() {
      flappyBird.update()
    }
  },
  GAME_OVER: {
    draw() {
      fundo.draw()
      chao.draw()
      flappyBird.draw()
      mensagemGameOver.draw()
    },
    update() {
      addEventListener('click', () => {
        mudaTela(Telas.INICIO)
      })
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  telaAtiva.draw()
  telaAtiva.update()

  requestAnimationFrame(loop)
}

mudaTela(Telas.INICIO)
flappyBird.pula()
loop()
