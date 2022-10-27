const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
// jogo vai ser 2D >
const contexto = canvas.getContext('2d');



// transformo o nosso personagem em um objeto
const FlappyByrd = {
    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    x: 10,
    y: 50,
    pulo:7,
    pula(){ //basicamente eu tiro o valor do pula da gravidade, se ela era 20 depois do pulo vira 13 pois diminui 7, meio que reseto ela
     console.log("devo pular") 
     FlappyByrd.velocidade=-FlappyByrd.pulo;  
    },
    gravidade: 0.25,
    velocidade: 0,
    desce() {
        if(fazColisao(FlappyByrd, chao)){
            console.log("faz colisao")
            mudaParaTela(telas.INICIO)
            return;
        }
        FlappyByrd.velocidade += +FlappyByrd.gravidade, //ele pega a velocidade e vai aumentando o,25 com o passar dos frames
        FlappyByrd.y += +1 + FlappyByrd.velocidade; // ele descendo, pega o ponto atual dele e aumenta 1 ponto fazendo com que ele caia
        //atualização ele pega a velocidade e quanto ele esta caindo para aumentar a velocidade
        console.log(FlappyByrd.y)
    },

    desenha() {
        contexto.drawImage(
            sprites, //escolho o arquivo
            FlappyByrd.spriteX, FlappyByrd.spriteY, //distancias da borda da primeira imagem
            FlappyByrd.largura, FlappyByrd.altura,  // o tamanho ocupado pela imagem para recortar
            FlappyByrd.x, FlappyByrd.y, //aonde vai aparecer na tela
            FlappyByrd.largura, FlappyByrd.altura //qual o tamanho dentro do canva
        );
    },
};

function fazColisao(FlappyByrd, chao){
const FlappyByrdY = FlappyByrd.y + FlappyByrd.altura;
const chaoY = chao.y;

if(FlappyByrdY>=chaoY){
    return true 
}
return false
};
// preparação do chão
const chao = {
    spriteX: 0,
    spriteY: 607,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112, // empurro ele todo para baixo, subo só a altura dele deixando ele perfeito no canva

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

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
};

const telas = {
    INICIO: { //monto a tela de inicio com o personagem parado, e es
        desenha() {
            fundo.desenha();
            chao.desenha();
            FlappyByrd.desenha();
            inicio.desenha();

        },
        click(){
            mudaParaTela(telas.jogo);
        },
        desce() {

        }
    }

};
telas.jogo = { //monto a tela de jogo com o personagem se mechendo
    desenha() {
        fundo.desenha();
        chao.desenha();
        FlappyByrd.desenha();
    },
    click(){
        FlappyByrd.pula();
    },
    desce() {
        FlappyByrd.desce();
    }
}
//função feita para montar o FPS (frames por segundo, imagen lisa)
function loop() {

    telaAtiva.desenha();
    telaAtiva.desce();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
 if(telaAtiva.click()){
    telaAtiva.click();
 }
});
mudaParaTela(telas.INICIO);
loop(); //chamo a função

