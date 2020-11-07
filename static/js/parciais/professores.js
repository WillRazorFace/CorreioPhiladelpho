const botaoPubs = document.getElementById("botao-pubs");
const botaoComentarios = document.getElementById("botao-comentarios");

const secaoPublicacoes = document.getElementById("secao-publicacoes");
const secaoComentarios = document.getElementById("secao-comentarios");

const infoPublicacoes = document.getElementById("info-publicacoes");
const infoComentarios = document.getElementById("info-comentarios");

const divResultado = document.getElementById("resultado-aprovar-deletar");

botaoPubs.addEventListener("click", (event) => {
    botaoComentarios.classList.remove("ativo");
    event.target.classList.add("ativo");

    secaoComentarios.classList.add("nao-dispor"); 
    secaoPublicacoes.classList.remove("nao-dispor");

    infoComentarios.classList.add("nao-dispor");
    infoPublicacoes.classList.remove("nao-dispor");
})

botaoComentarios.addEventListener("click", (event) => {
    botaoPubs.classList.remove("ativo");
    event.target.classList.add("ativo");

    secaoPublicacoes.classList.add("nao-dispor");
    secaoComentarios.classList.remove("nao-dispor");

    infoPublicacoes.classList.add("nao-dispor");
    infoComentarios.classList.remove("nao-dispor");
})

const aprovar = function(id){
    fetch(URL_APROVAR_COMENTARIO,{
        method: "POST",
        body: JSON.stringify({comentario_id: id}),
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 200){
            let comentarioAprovado = document.getElementById("comentario-" + id);

            comentarioAprovado.remove();

            divResultado.innerText = "Comentário aprovado com sucesso";
            divResultado.classList.remove("nao-dispor");

            setTimeout(() => {
                divResultado.innerText = "";
                divResultado.classList.add("nao-dispor");
            }, 5000)
        } else if(resposta.status == 409){
            let modal = document.getElementById("modal-feedback");
            let modal_titulo = document.getElementById("modal-titulo");
            let modal_icone = document.getElementById("modal-icone");
            let modal_mensagem = document.getElementById("modal-mensagem");
            let modal_botao = document.getElementById("modal-botao");

            modal.classList.add("modal-erro");
            modal_titulo.innerHTML = "Algo deu errado";
            modal_icone.classList.add("fa-exclamation");
            modal_mensagem.innerHTML = "Um erro aconteceu durante a aprovação do comentário. Tente de novo."

            modal.style.display = "grid";

            modal_botao.addEventListener("click", () => {
                modal.style.display = "none";
            })
        }
    })
}

const deletar = function(id){
    fetch(URL_DELETAR_COMENTARIO,{
        method: "POST",
        body: JSON.stringify({comentario_id: id}),
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 200){
            let comentarioDeletado = document.getElementById("comentario-" + id);

            comentarioDeletado.remove();

            divResultado.innerText = "Comentário deletado com sucesso";
            divResultado.classList.remove("nao-dispor");

            setTimeout(() => {
                divResultado.innerText = "";
                divResultado.classList.add("nao-dispor");
            }, 5000)
        } else if(resposta.status == 409){
            let modal = document.getElementById("modal-feedback");
            let modal_titulo = document.getElementById("modal-titulo");
            let modal_icone = document.getElementById("modal-icone");
            let modal_mensagem = document.getElementById("modal-mensagem");
            let modal_botao = document.getElementById("modal-botao");

            modal.classList.add("modal-erro");
            modal_titulo.innerHTML = "Algo deu errado";
            modal_icone.classList.add("fa-exclamation");
            modal_mensagem.innerHTML = "Um erro aconteceu durante a deleção do comentário. Tente de novo."

            modal.style.display = "grid";

            modal_botao.addEventListener("click", () => {
                modal.style.display = "none";
            })
        }
    })
}