const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
// jogo vai ser 2D >
const contexto = canvas.getContext('2d');

//função feita para montar o FPS (frames por segundo, imagen lisa)
function loop(){

// começo a recortar as imagens 1
contexto.drawImage(
    sprites, //escolho o arquivo
    0, 0, //distancias da borda da primeira imagem
    34, 24,  // o tamanho ocupado pela imagem para recortar
    10, 50, //aonde vai aparecer na tela
    34, 24, //qual o tamanho dentro do canva
);
requestAnimationFrame(loop);
}
loop(); //chamo a função

