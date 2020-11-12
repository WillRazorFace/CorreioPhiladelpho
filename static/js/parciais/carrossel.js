const wrapperCarrossel = document.getElementById("wrapper-carrossel");
const items = document.getElementById("carrossel").children;
const anterior = document.getElementById("carrossel-anterior");
const proximo = document.getElementById("carrossel-proximo");
const pontosIndicadores = document.getElementById("pontos-indicadores");

let index = 0;

function autoMudar(){
    proximoItem();
    atualizarPontos();
    resetarTimer();
}

function proximoItem(){
    if(index == items.length-1){
        index = 0;
    } else{
        index++;
    }

    mudarItem();
}

function itemAnterior(){
    if(index == 0){
        index = items.length - 1;
    } else {
        index--;
    }

    mudarItem();
}

function mudarItem(){
    for(let i = 0; i < items.length; i ++){
        items[i].classList.remove("ativo");
    }

    items[index].classList.add("ativo");
}

let timer = setInterval(autoMudar, 10000);

function criarPontosIndice(){
    for(let i = 0; i < items.length; i++){
        const div = document.createElement("div");

        div.setAttribute("onclick", "pontoIndicarIndice(this.id)");
        div.setAttribute("id", i);

        if(i == 0){
            div.className = "ativo";
        }

        pontosIndicadores.appendChild(div);
    }
}

criarPontosIndice();

function pontoIndicarIndice(id){
    index = id;
    
    mudarItem();
    atualizarPontos();
    resetarTimer();
}

function atualizarPontos(){
    for(let i = 0; i < pontosIndicadores.children.length; i ++){
        pontosIndicadores.children[i].classList.remove("ativo");
    }

    pontosIndicadores.children[index].classList.add("ativo");
}

// Arrows para mudança manual

anterior.addEventListener("click", () => {
    itemAnterior();
    atualizarPontos();
    resetarTimer();
})

proximo.addEventListener("click", () => {
    proximoItem();
    atualizarPontos();
    resetarTimer();
})

wrapperCarrossel.addEventListener("mouseover", () => {
    clearInterval(timer);
})

wrapperCarrossel.addEventListener("mouseout", () => {
    timer = setInterval(autoMudar, 10000);
})

function resetarTimer(){
    clearInterval(timer);
    timer = setInterval(autoMudar, 10000);
}
