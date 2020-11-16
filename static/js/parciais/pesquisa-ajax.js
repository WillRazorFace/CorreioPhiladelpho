const campo_de_pesquisa = document.querySelector("#campo-de-pesquisa");
const selectCategoria = document.getElementById("select-categoria");
const div_posts = document.querySelector("#conteudo-mutavel");

let chamada_ajax = function(url, termo, categoria, pagina=1){
    fetch(url + "?t=" + termo + "&categoria=" + categoria + "&p=" + pagina)
    .then((response) => {
        response.json().then(function (data){
            div_posts.innerHTML = data["html"];
        })
    })
}

window.onload = function(){
    let funcao_programada = false;

    // Pesquisa o termo caso tenha sido passado por parâmetro na URL
    if (campo_de_pesquisa.value){
        chamada_ajax(POSTS_BUSCA_URL, campo_de_pesquisa.value, selectCategoria.value);
    }

    // Pesquisa o termo cada vez que o usuário digita esperando 0.5 segundos
    // para não sobrecarregar o servidor com muitas requisições
    campo_de_pesquisa.addEventListener("keyup", () => {
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(chamada_ajax, 500, POSTS_BUSCA_URL, campo_de_pesquisa.value, selectCategoria.value);
    })

    selectCategoria.addEventListener("change", () => {
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(chamada_ajax, 500, POSTS_BUSCA_URL, campo_de_pesquisa.value, selectCategoria.value);
    })
}

function mudarPagina(pagina){
    chamada_ajax(POSTS_BUSCA_URL, campo_de_pesquisa.value, selectCategoria.value, pagina);

    irParaOTopo(1000);
}

function irParaOTopo(duracao) {
    if (document.scrollingElement.scrollTop === 0) return;

    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duracao;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}