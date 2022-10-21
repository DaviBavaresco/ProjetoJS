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

    desenha() {
        contexto.drawImage(
            sprites, //escolho o arquivo
            FlappyByrd.spriteX, FlappyByrd.spriteY, //distancias da borda da primeira imagem
            FlappyByrd.largura, FlappyByrd.altura,  // o tamanho ocupado pela imagem para recortar
            FlappyByrd.x, FlappyByrd.y, //aonde vai aparecer na tela
            FlappyByrd.largura, FlappyByrd.altura //qual o tamanho dentro do canva
        );
    }
}
//função feita para montar o FPS (frames por segundo, imagen lisa)
function loop() {
    FlappyByrd.desenha();


    requestAnimationFrame(loop);
}
loop(); //chamo a função

