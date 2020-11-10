const botaoPubs = document.getElementById("botao-pubs");
const botaoComentarios = document.getElementById("botao-comentarios");

const secaoPublicacoes = document.getElementById("secao-publicacoes");
const secaoComentarios = document.getElementById("secao-comentarios");

const infoPublicacoes = document.getElementById("info-publicacoes");
const infoComentarios = document.getElementById("info-comentarios");

const divResultadoComentario = document.getElementById("resultado-aprovar-deletar");
const divResultadoPublicacao = document.getElementById("resultado-editar-deletar");

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

const modal = document.getElementById("modal-feedback");
const modal_titulo = document.getElementById("modal-titulo");
const modal_icone = document.getElementById("modal-icone");
const modal_mensagem = document.getElementById("modal-mensagem");
const modal_botao = document.getElementById("modal-botao");
const modal_botao_confirmar = document.getElementById("modal-botao-confirmar");

const aprovar = function(id){
    fetch(URL_APROVAR_COMENTARIO,{
        method: "POST",
        body: JSON.stringify({comentario_id: id}),
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 200){
            let comentarioAprovado = document.getElementById("comentario-" + id);

            comentarioAprovado.remove();

            divResultadoComentario.innerText = "Comentário aprovado com sucesso";
            divResultadoComentario.classList.remove("nao-dispor");

            setTimeout(() => {
                divResultadoComentario.innerText = "";
                divResultadoComentario.classList.add("nao-dispor");
            }, 5000)
        } else if(resposta.status == 409){
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

            divResultadoComentario.innerText = "Comentário deletado com sucesso";
            divResultadoComentario.classList.remove("nao-dispor");

            setTimeout(() => {
                divResultadoComentario.innerText = "";
                divResultadoComentario.classList.add("nao-dispor");
            }, 5000)
        } else if(resposta.status == 409){
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

const mostrarMensagemDeletarPublicacao = function(slug){
    modal.classList.add("modal-aviso");
    modal_titulo.innerHTML = "Deletar publicação";
    modal_icone.classList.add("fa-envelope");
    modal_mensagem.innerHTML = "Tem certeza que deseja excluir a publicação? Ela não poderá ser recuperada após isso.";
    modal_botao_confirmar.innerText = "Excluir";
    modal_botao_confirmar.setAttribute("onClick", "deletarPublicacao('" + slug + "')");
    modal_botao_confirmar.classList.remove("nao-dispor");

    modal.style.display = "grid";

    modal_botao.addEventListener("click", () => {
        modal.style.display = "none";
        modal_botao_confirmar.classList.add("nao-dispor");
    })

    modal_botao_confirmar.addEventListener("click", () => {
        modal.style.display = "none";
        modal_botao_confirmar.classList.add("nao-dispor");
    });
}

const deletarPublicacao = function(slug){    
    fetch(URL_DELETAR_PUBLICACAO, {
        method: "POST",
        body: JSON.stringify({slug: slug}),
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 204){
            let publicacaoDeletada = document.getElementById("publicacao-" + slug);
            
            publicacaoDeletada.remove();
            
            divResultadoPublicacao.innerText = "Publicação deletada com sucesso";
            divResultadoPublicacao.classList.remove("nao-dispor");

            setTimeout(() => {
                divResultadoPublicacao.innerText = "";
                divResultadoPublicacao.classList.add("nao-dispor");
            }, 5000)
        } else if(resposta.status == 409){
            modal.className = "modal-wrapper modal-erro";
            modal_titulo.innerHTML = "Algo deu errado";
            modal_icone.className = "fa fa-4x fa-exclamation";
            modal_mensagem.innerHTML = "Um erro aconteceu durante a deleção da publicação. Tente de novo."

            modal.style.display = "grid";

            modal_botao.addEventListener("click", () => {
                modal.style.display = "none";
            })
        }
    })
}