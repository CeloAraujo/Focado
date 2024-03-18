const html =
  document.querySelector(
    "html"
  ); /*Armazenando a tag HTML, ou seja, representando todo o nosso documento*/
const focoBt = document.querySelector(
  ".app__card-button--foco"
); /*Armazenando a classe app__card-button--foco*/
const curtoBt = document.querySelector(
  ".app__card-button--curto"
); /*Armazenando a classe app__card-button--curto*/
const longoBt = document.querySelector(
  ".app__card-button--longo"
); /*Armazenando a classe app__card-button--longo*/
const banner =
  document.querySelector(
    ".app__image"
  ); /*Armazenando a classe app_image que está aplicada na tag <img>*/
const titulo =
  document.querySelector(
    ".app__title"
  ); /*Armazenando a classe app_tittle que está aplicada ao <h1>*/
const botoes =
  document.querySelectorAll(
    ".app__card-button"
  ); /*Pegando todos os elementos app__card-button*/
const musicaFocoInput = document.querySelector("#alternar-musica"); //Pegando o objeto alternar-musica
const musica = new Audio("sons/luna-rise-part-one.mp3"); //Criando um objeto de áudio do JS
const startPauseBt = document.querySelector("#start-pause"); // Referenciando o botão start-pause pelo ID
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iconePlayPause = document.querySelector(
  ".app__card-primary-butto-icon"
); /*Armazenando a classe app__card-primary-butto-icon que está aplicada na tag <img>*/
const tempoNaTela = document.querySelector("#timer");
const playBt = new Audio("sons/play.wav"); //Criando um objeto de áudio do JS
const pauseBt = new Audio("sons/pause.mp3"); //Criando um objeto de áudio do JS
const beep = new Audio("sons/beep.mp3"); //Criando um objeto de áudio do JS
const audioStart = new Audio("sons/play.wav")
const audioPause = new Audio("sons/pause.mp3")
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null; //Será usada na função iniciar

//Utilizando if - evento change - pause/play do objeto de música
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

//Código com o uso da função
focoBt.addEventListener("click", () => {
  alterarContexto("foco");
});
curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

//Criando a função - switch case - innerHTML - forEach - classList
function alterarContexto(contexto) {
  //mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Torne-se Produtivo,<br><strong class="app__title-strong">FOCA</strong> no que importa.`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Uma pausa para relaxar,<br><strong class="app__title-strong">descanse um pouco, beba água!.</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Agora, pare por um momento,<br><strong class="app__title-strong">alivie a tensão.</strong>`;
      break;
    default:
      break;
  }
}

//Função Mostrar o tempo dentro do Card
function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}
// /* Temporizador Automatizado v18*/
function contagemRegressiva() {
  if (tempoDecorridoEmSegundos <= 0) {
    alert("tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
  console.log("Temporizador: " + tempoDecorridoEmSegundos);
}
//Função para a contagem Regressiva
// const contagemRegressiva = () => {
//     if(tempoDecorridoEmSegundos <= 0){
//         alert('Tempo finalizado!');
// 			zerar();
//         return
//     }
//     tempoDecorridoEmSegundos -= 1;
//     mostrarTempo();
// 	console.log('Temporizador: ' + tempoDecorridoEmSegundos);
// }

//Função para Zerar o contador
function zerar() {
	clearInterval(intervaloId);
	iniciarOuPausarBt.textContent = "Começar";
	iconePlayPause.setAttribute("src", `imagens/play_arrow.png`);
	intervaloId = null;
  }

//Função para iniciar ou pausar o contador
function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
	audioPause.pause();
	audioPause.currentTime=0;
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iconePlayPause.setAttribute("src", `imagens/pause.png`);
  audioStart.currentTime=0;
  audioStart.play();
  
}


//Botão Começar / Pausar
startPauseBt.addEventListener("click", iniciarOuPausar);

//Chamada da função mostrarTempo
mostrarTempo();

//Alterando cores e imagens

/* Código sem uso da função*/
focoBt.addEventListener("click", () => {
  html.setAttribute("data-contexto", "foco");
  banner.setAttribute("src", "imagens/foco.png");
});
curtoBt.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-curto");
  banner.setAttribute("src", "imagens/descanso-curto.png");
});
longoBt.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-longo");
  banner.setAttribute("src", "imagens/descanso-longo.png");
});
