window.onload = () => {
    const selectCategoria = document.getElementById("select-categoria");
    const div_posts = document.getElementById("conteudo-mutavel");

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
    if (selectCategoria.value){
        chamada_ajax(POSTS_BUSCA_URL, selectCategoria.value);
    }

    // Pesquisa o termo cada vez que o usuário digita esperando 0.5 segundos
    // para não sobrecarregar o servidor com muitas requisições
    selectCategoria.addEventListener("change", () => {
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(chamada_ajax, 500, POSTS_BUSCA_URL, selectCategoria.value);
    })
}