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

    if(respostas.style.display == "none" || respostas.style.display == ""){
        respostas.style.display = "block";
    } else {
        respostas.style.display = "none";
    }
}

const formularioComentar = document.getElementById("id_conteudo");

formularioComentar.addEventListener("click", () => {
    console.log('sim');

    if(document.contains(document.getElementById("resposta"))){
        document.getElementById("resposta").remove();
    }
})

function enviarResposta(event, comentario_pai){
    event.preventDefault();

    let formResposta = new FormData(event.target);
    formResposta.append('usuario', USUARIO_ATUAL);
    formResposta.append('comentario_pai', comentario_pai);
    formResposta.append('tipo', 'resposta')

    fetch(URL_ENVIAR_COMENTARIO, {
        method: "POST",
        body: formResposta,
        headers:  {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        resposta.json().then((dados) => {
            console.log('enviado');
        })
    })
}

function enviarComentario(event, post){
    event.preventDefault();

    let formComentario = new FormData(event.target);
    formComentario.append('usuario', USUARIO_ATUAL);
    formComentario.append('post', post);
    formComentario.append('tipo', 'comentario');

    fetch(URL_ENVIAR_COMENTARIO, {
        method: "POST",
        body: formComentario,
        headers:  {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        resposta.json().then((dados) => {
            console.log('enviado');
        })
    })
}