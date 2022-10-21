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
    gravidade: 0.25,
    velocidade: 0,
    desce(){
        FlappyByrd.velocidade+=+FlappyByrd.gravidade, //ele pega a velocidade e vai aumentando o,25 com o passar dos frames
        FlappyByrd.y+=+1+FlappyByrd.velocidade; // ele descendo, pega o ponto atual dele e aumenta 1 ponto fazendo com que ele caia
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
        ); } }

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
        ); } }

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
        ); } }

//função feita para montar o FPS (frames por segundo, imagen lisa)
function loop() {
    FlappyByrd.desce();
    fundo.desenha();
    chao.desenha();
    FlappyByrd.desenha();
    
    requestAnimationFrame(loop);
}
loop(); //chamo a função

