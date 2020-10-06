window.onload = function(){
    const campo_de_pesquisa = document.querySelector("#campo-de-pesquisa");
    const div_posts = document.querySelector("#conteudo-mutavel");

    let funcao_programada = false;
    
    let chamada_ajax = function(url, termo){
        fetch(url + "?p=" + termo)
        .then((response) => {
            response.json().then(function (data){
                div_posts.innerHTML = data["html"];
            })
        })
    }
    // Pesquisa o termo caso tenha sido passado por parâmetro na URL
    if (campo_de_pesquisa.value){
        chamada_ajax(POSTS_BUSCA_URL, campo_de_pesquisa.value);
    }

    // Pesquisa o termo cada vez que o usuário digita esperando 0.5 segundos
    // para não sobrecarregar o servidor com muitas requisições
    campo_de_pesquisa.addEventListener("keyup", () => {
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(chamada_ajax, 500, POSTS_BUSCA_URL, campo_de_pesquisa.value);
    })
}