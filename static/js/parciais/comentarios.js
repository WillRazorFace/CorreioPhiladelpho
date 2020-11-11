function abrirFormulario(id){
    var comentario = document.getElementById("mostrar-" + id);

    if(document.contains(document.getElementById("resposta"))){
        document.getElementById("resposta").remove();
    }

    if(!comentario){
        comentario = document.getElementById("responder-" + id);
    }

    comentario.insertAdjacentHTML(
        "afterend",
        '<form method="POST" id="resposta" action="" id="form-comentario" onsubmit="enviarResposta(event, ' + id + ')" style="position: relative"> \
            <textarea name="conteudo" cols="40" rows="5" maxlength="5000" placeholder="Digite para responder" required="" id="id_conteudo"></textarea> \
            \
            <button class="fechar-formulario-comentario" onclick="fecharFormulario()">x</button> \
            <button type="submit" class="botao-comentar">Responder</button> \
        </form>'
    )
}

function fecharFormulario(){
    document.getElementById("resposta").remove();
}

function abrir(id){
    var respostas = document.getElementById(id);

    if(respostas.classList.contains("nao-dispor")){
        respostas.classList.remove("nao-dispor");
    } else {
        respostas.classList.add("nao-dispor");
    }
}

const formularioComentar = document.getElementById("id_conteudo");

formularioComentar.addEventListener("click", () => {
    if(document.contains(document.getElementById("resposta"))){
        document.getElementById("resposta").remove();
    }
})

function enviarResposta(event, comentario_pai){
    event.preventDefault();

    let botaoComentar = document.getElementsByClassName("botao-comentar")[1];

    console.log(botaoComentar);

    botaoComentar.disabled = true;

    let formResposta = new FormData(event.target);
    let modal = document.getElementById("modal-feedback");
    let modal_titulo = document.getElementById("modal-titulo");
    let modal_icone = document.getElementById("modal-icone");
    let modal_mensagem = document.getElementById("modal-mensagem");
    let modal_botao = document.getElementById("modal-botao");

    formResposta.append('usuario', USUARIO_ATUAL);
    formResposta.append('comentario_pai', comentario_pai);
    formResposta.append('tipo', 'resposta')

    fetch(URL_ENVIAR_COMENTARIO, {
        method: "POST",
        body: formResposta,
        headers:  {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        botaoComentar.disabled = false;

        if(resposta.status == 201){
            let respostas = document.getElementById("respostas-de-" + comentario_pai);

            respostas.insertAdjacentHTML(
                "afterbegin",
                '<li class="novo analise"> \
                    <div class="comentario-foto-usuario" style="background-image: url(' + FOTO_USUARIO_ATUAL + ');"></div> \
                    \
                    <div> \
                        <div class="usuario">Você</div> \
                        <div class="data">agora mesmo</div> \
                        <div class="usuario">(Enviado para análise)</div> \
                        <div class="comentario">\
                            ' + formResposta.get('conteudo') + ' \
                        </div> \
                    </div> \
                </li>'
            );

            respostas.classList.remove("nao-dispor")

            event.target.remove();
        } else {
            event.target.remove();

            modal.classList.add("modal-erro");
            modal_titulo.innerHTML = "Algo deu errado";
            modal_icone.classList.add("fa-exclamation");
            modal_mensagem.innerHTML = "Um erro aconteceu durante a requisição. Tente de novo."

            modal.style.display = "grid";

            modal_botao.addEventListener("click", () => {
                modal.style.display = "none";
            })
        }
    })
}

function enviarComentario(event, post){
    event.preventDefault();

    let botaoComentar = document.getElementsByClassName("botao-comentar")[0]

    botaoComentar.disabled = true;

    let formComentario = new FormData(event.target);
    let modal = document.getElementById("modal-feedback");
    let modal_titulo = document.getElementById("modal-titulo");
    let modal_icone = document.getElementById("modal-icone");
    let modal_mensagem = document.getElementById("modal-mensagem");
    let modal_botao = document.getElementById("modal-botao");

    formComentario.append('usuario', USUARIO_ATUAL);
    formComentario.append('post', post);
    formComentario.append('tipo', 'comentario');

    fetch(URL_ENVIAR_COMENTARIO, {
        method: "POST",
        body: formComentario,
        headers:  {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        botaoComentar.disabled = false;

        if(resposta.status == 201){
            event.target.insertAdjacentHTML(
                "afterend",
                '<div class="novo analise"> \
                    <div class="comentario-foto-usuario" style="background-image: url(' + FOTO_USUARIO_ATUAL + ');"></div> \
                    \
                    <div> \
                        <div class="usuario">Você</div> \
                        <div class="data">agora mesmo</div> \
                        <div class="usuario">(Enviado para análise)</div> \
                        <div class="comentario">\
                            ' + formComentario.get('conteudo') + ' \
                        </div> \
                    </div> \
                </div>'
            );
            event.target.reset();

            if(document.contains(document.getElementById("sem-comentarios"))){
                document.getElementById("sem-comentarios").remove();
            }
        } else {
            event.target.reset();

            modal.classList.add("modal-erro");
            modal_titulo.innerHTML = "Algo deu errado";
            modal_icone.classList.add("fa-exclamation");
            modal_mensagem.innerHTML = "Um erro aconteceu durante a requisição. Tente de novo."

            modal.style.display = "grid";

            modal_botao.addEventListener("click", () => {
                modal.style.display = "none";
            })
        }
    })
}