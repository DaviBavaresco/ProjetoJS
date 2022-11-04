const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
// jogo vai ser 2D >
const contexto = canvas.getContext('2d');
let frames=0;
const impact = new Audio()
impact.src='impacto.wav';

function criaFlappByrd() {
    const FlappyByrd = {
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 7,
        pula() { //basicamente eu tiro o valor do pula da gravidade, se ela era 20 depois do pulo vira 13 pois diminui 7, meio que reseto ela
            console.log("devo pular")
            FlappyByrd.velocidade = -FlappyByrd.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        desce() {
            if (fazColisao(FlappyByrd, globais.chao)) {
                console.log("faz colisao")
                impact.play();// quanto ele toca no chao, da play no audio e ja troca a tela
                mudaParaTela(telas.INICIO)
                return;
            }
            FlappyByrd.velocidade += +FlappyByrd.gravidade, //ele pega a velocidade e vai aumentando o,25 com o passar dos frames
                FlappyByrd.y += +1 + FlappyByrd.velocidade; // ele descendo, pega o ponto atual dele e aumenta 1 ponto fazendo com que ele caia
            //atualização ele pega a velocidade e quanto ele esta caindo para aumentar a velocidade
        },
        movimentos:[
            {spriteX:0, spriteY:0, },//asa normal
            {spriteX:0, spriteY:26, },//asa no meio
            {spriteX:0, spriteY:52, },//asa baixa
            {spriteX:0, spriteY:26, },//asa no meio
        ],
        frameAtual:0,
        atualizaFrameAtual(){
            const intervaloFrames= 10;
            const passouIntervalo = frames % intervaloFrames===0;
            if(passouIntervalo){
            const baseIncremento=1;
            const incremento = baseIncremento+FlappyByrd.frameAtual;
            const baseRepeticao = FlappyByrd.movimentos.length;
            FlappyByrd.frameAtual = incremento % baseRepeticao;
            }
            
        },
        desenha() {
            FlappyByrd.atualizaFrameAtual();
            const  {spriteX,spriteY} = FlappyByrd.movimentos[FlappyByrd.frameAtual];
            contexto.drawImage(
                sprites, //escolho o arquivo
                spriteX, spriteY, //distancias da borda da primeira imagem
                FlappyByrd.largura, FlappyByrd.altura,  // o tamanho ocupado pela imagem para recortar
                FlappyByrd.x, FlappyByrd.y, //aonde vai aparecer na tela
                FlappyByrd.largura, FlappyByrd.altura //qual o tamanho dentro do canva
            );
        }
    }
    return FlappyByrd;
}
// transformo o nosso personagem em um objeto


function fazColisao(FlappyByrd, chao) {
    const FlappyByrdY = FlappyByrd.y + FlappyByrd.altura;
    const chaoY = chao.y;

    if (FlappyByrdY >= chaoY) {
        return true
    }
    return false
}
function moveChao(){
    const chao = {
    spriteX: 0,
    spriteY: 607,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112, // empurro ele todo para baixo, subo só a altura dele deixando ele perfeito no canva
        atualiza(){
            const movimentoChao=1;//crio a "velocidade"
            const repeteEm= chao.largura / 2;
            const movimentacao = chao.x-movimentoChao; // fica chao atual = chao atual  menos um ai ele se move 
            chao.x=movimentacao % repeteEm; //sempre quando chegar na metade do chao ele volta ao inicio
        },
    desenha() {
        contexto.drawImage( //primeiro chao
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage( //segundo chao duplicado
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y, //esse metodo usado para empurar a imagem pego ele grudado na parede e empuro ele usando a largura para cobrir a tela
            chao.largura, chao.altura,
        );
    }
}
return chao;
};
// preparação do chão


const fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204, //jogo toda pra baixo, e subu só sua altura para cobrir a tela

    desenha() {
        contexto.fillStyle = '#70c5ce'; //escolho a cor de fundo
        contexto.fillRect(0, 0, canvas.width, canvas.height) // mostro quais cordenadas ela vai cobrir, começando no topo no caso 0,0 e vai ir ate o final do canva.
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura,
        )
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            (fundo.x + fundo.largura), fundo.y,
            fundo.largura, fundo.altura,
        );
    }
}

//tela de inicio
const inicio = {
    sprintX: 134,
    sprintY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            inicio.sprintX, inicio.sprintY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura
        );
    }
}
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
    
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
function criaCanos() {
    const canos = {
      largura: 52,
      altura: 400,
      chao: {
        spriteX: 0,
        spriteY: 169,
      },
      ceu: {
        spriteX: 52,
        spriteY: 169,
      },
      espaco: 80,
      desenha() {
        canos.pares.forEach(function(par) {
          const yRandom = par.y;
          const espacamentoEntreCanos = 100;
    
          const canoCeuX = par.x;
          const canoCeuY = yRandom; 
  
          // [Cano do Céu]
          contexto.drawImage(
            sprites, 
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY,
            canos.largura, canos.altura,
          )
          
          // [Cano do Chão]
          const canoChaoX = par.x;
          const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
          contexto.drawImage(
            sprites, 
            canos.chao.spriteX, canos.chao.spriteY,
            canos.largura, canos.altura,
            canoChaoX, canoChaoY,
            canos.largura, canos.altura,
          )
  
          par.canoCeu = {
            x: canoCeuX,
            y: canos.altura + canoCeuY
          }
          par.canoChao = {
            x: canoChaoX,
            y: canoChaoY
          }
        })
      },
      temColisaoComOFlappyBird(par) {
        const cabecaDoFlappy = globais.FlappyByrd.y;
        const peDoFlappy = globais.FlappyByrd.y + globais.FlappyByrd.altura;
        
        if((globais.FlappyByrd.x + globais.FlappyByrd.largura) >= par.x) {
          if(cabecaDoFlappy <= par.canoCeu.y) {
            return true;
          }
  
          if(peDoFlappy >= par.canoChao.y) {
            return true;
          }
        }
        return false;
      },
      pares: [],
      atualiza() {
        const passou100Frames = frames % 100 === 0;
        if(passou100Frames) {
          console.log('Passou 100 frames');
          canos.pares.push({
            x: canvas.width,
            y: -150 * (Math.random() + 1),
          });
        }
  
  
  
        canos.pares.forEach(function(par) {
          par.x = par.x - 2;
  
          if(canos.temColisaoComOFlappyBird(par)) {
            console.log('Você perdeu!')
            impact.play();
            mudaParaTela(telas.GAME_OVER);
          }
  
          if(par.x + canos.largura <= 0) {
            canos.pares.shift();
          }
        });
  
      }
    }
  
    return canos
  };

const telas = {
    INICIO: { //monto a tela de inicio com o personagem parado, e es
        inicializa(){
           globais.FlappyByrd= criaFlappByrd();
           globais.chao= moveChao();
           globais.canos = criaCanos();
        },
        desenha() {
            fundo.desenha();
            globais.FlappyByrd.desenha();
            
            globais.chao.desenha();
            inicio.desenha();

        },
        click() {
            mudaParaTela(telas.jogo);
        },
        desce() {
            globais.chao.atualiza()
            globais.canos.atualiza();
        }
    }

};
telas.jogo = { //monto a tela de jogo com o personagem se mechendo
    desenha() {
        fundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.FlappyByrd.desenha();
    },
    click() {
        globais.FlappyByrd.pula();
    },
    desce() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.FlappyByrd.desce();

    }
};
//função feita para montar o FPS (frames por segundo, imagen lisa)
function loop() {

    telaAtiva.desenha();
    telaAtiva.desce();
    frames+=1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click()) {
        telaAtiva.click();
    }
});
mudaParaTela(telas.INICIO);
loop(); //chamo a função

