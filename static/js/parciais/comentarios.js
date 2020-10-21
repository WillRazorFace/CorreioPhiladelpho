function abrirFormulario(id){
    var comentario = document.getElementById(id);

    if(document.contains(document.getElementById("resposta"))){
        document.getElementById("resposta").remove();
    }

    comentario.insertAdjacentHTML(
        "afterend",
        '<form method="POST" id="resposta" action="" id="form-comentario"> \
            <textarea name="conteudo" cols="40" rows="5" maxlength="5000" placeholder="Digite para responder" required="" id="id_conteudo"></textarea> \
        </form>'
    )
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