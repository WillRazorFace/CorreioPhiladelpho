const campo_de_pesquisa = document.querySelector("#campo-de-pesquisa");
const div_posts = document.querySelector("#conteudo-mutavel");

campo_de_pesquisa.addEventListener("keyup", () => {
    fetch(POSTS_BUSCA_URL + "?p=" + campo_de_pesquisa.value)
    .then((response) => {
        response.json().then(function (data) {
            console.log(POSTS_BUSCA_URL + "?p=" + campo_de_pesquisa.value);

            div_posts.innerHTML = data["html"];
        })
    })
})