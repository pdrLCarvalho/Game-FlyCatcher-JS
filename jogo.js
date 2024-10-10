function ajustaTamanhoPalcoJogo(){
    let altura = window.innerHeight
    let largura = window.innerWidth
    return {altura, largura}
}

//recuperando o nível selecionado pelo usuário
let nivel = window.location.search
nivel = nivel.replace('?','')

//criando a variável que vai ajustar a dificuldade com base no nível selecionado
let dificuldade

if(nivel==='facil'){
    dificuldade = 1500
}else if(nivel === 'medio'){
    dificuldade = 1000
}else if(nivel === 'dificil'){
    dificuldade = 750
}

//gerando tamanhos aleatórios de mosquitos
function tamanhoAleatorio(){
    let tamanhoMosquito = Math.floor(Math.random()*3)
    return tamanhoMosquito
}

//gerando lados aleatorios para os moquitos
function ladoAleatorio(){
    let ladoMosquito = Math.floor(Math.random()*2)

    ladoMosquito = ladoMosquito == 0 ? 'ladoA' : 'ladoB'
    return ladoMosquito
}

//gerando posições aleatórias para os mosquitos
let vidas = 3

function posicaoRandomica(){
    //verificar se existe um mosquito, e caso exista removê-lo
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        //Fazendo a validação de quantas vidas foram perdidas:
        //Se for maior do que 3 o jogo precisa ser pausado.
        //Se não continuar decrementando o total de vidas
        if(vidas<=0){
            window.location.href= 'fim_de_jogo.html'
        }else{
            document.getElementById(`vida${vidas}`).src="image/coracao_vazio.png"
            vidas--
        }
    }
    
    let tamanhoTela = ajustaTamanhoPalcoJogo()
    let tamanhoMosquito = tamanhoAleatorio()
    let ladoMosquito = ladoAleatorio()

    let posicaoX = Math.floor(Math.random()*tamanhoTela.largura) -90
    let posicaoY = Math.floor(Math.random()*tamanhoTela.altura) -90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //criar o elemento html
    let mosquito = document.createElement('img')
    mosquito.src = 'image/mosca.png'
    mosquito.className = `mosquito${tamanhoMosquito} ${ladoMosquito}`
    mosquito.style.left = `${posicaoX}px`
    mosquito.style.top = `${posicaoY}px`
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)
}

//criando um timer pro jogo
let tempoDeJogo = 15
let cronometro = setInterval(function(){
    tempoDeJogo -= 1

    if(tempoDeJogo< 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href='vitoria.html'
    }else{
        document.getElementById('timer').innerHTML = tempoDeJogo
    }
},1000)



