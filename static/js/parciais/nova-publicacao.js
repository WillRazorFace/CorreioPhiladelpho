const campoTitulo = document.getElementById('id_titulo');
const campoSubtitulo = document.getElementById('id_subtitulo');
const campoConteudo = document.getElementById('id_conteudo');
const campoCategoria = document.getElementById('id_categoria');

const labelTitulo = document.getElementById('titulo-label');
const labelSubtitulo = document.getElementById('subtitulo-label');
const labelConteudo = document.getElementById('conteudo-label');
const labelCategoria = document.getElementById('categoria-label');

const divErroTitulo = document.getElementById('invalido-titulo');
const divErroSubtitulo = document.getElementById('invalido-subtitulo');
const divErroConteudo = document.getElementById('invalido-conteudo');
const divErroCategoria = document.getElementById('invalido-categoria');

document.querySelector("#form-post").addEventListener("submit", (event) => {
    event.preventDefault();
    formPublicacao = new FormData(document.getElementById("form-post"));

    formPublicacao.append('usuario', USUARIO_ATUAL);

    console.log(formPublicacao);

    campoTitulo.style.borderColor = "";
    campoSubtitulo.style.borderColor = "";
    campoConteudo.style.borderColor = "";
    campoCategoria.style.borderColor = "";

    labelTitulo.style.color = "";
    labelTitulo.style.fontWeight = "";
    labelSubtitulo.style.color = "";
    labelSubtitulo.style.fontWeight = "";
    labelConteudo.style.color = "";
    labelConteudo.style.fontWeight = "";
    labelCategoria.style.color = "";
    labelCategoria.style.fontWeight = "";

    divErroTitulo.innerText = "";
    divErroTitulo.style.display = "none";
    divErroSubtitulo.innerText = "";
    divErroSubtitulo.style.display = "none";
    divErroConteudo.innerText = "";
    divErroConteudo.style.display = "none";
    divErroCategoria.innerText = "";
    divErroCategoria.style.display = "none";

    fetch(URL_SALVAR_PUBLICACAO, {
        method: "POST",
        body: formPublicacao,
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 409){
            resposta.json().then((dados) => {
                erros = dados["erros"];

                for(var erro in erros){
                    let divErroCampo = document.getElementById('invalido-' + erro);
                    let labelCampo = document.getElementById(erro + '-label');
                    let campo = document.getElementById('id_' + erro);
                
                    campo.style.borderColor = "red";
                    
                    labelCampo.style.color = "red";
                    labelCampo.style.fontWeight = "bold";

                    divErroCampo.style.display = "block";
                    divErroCampo.innerText = erros[erro];
                }
            })
        } else if(resposta.status == 200){
            resposta.json().then((dados) => {
                window.location.href = dados['url'];
            })
        }
    })
})

// Input customizado de imagem

const input_imagem = document.getElementById("id_foto");
const botao_customizado = document.getElementById("foto-perfil-input");
const texto_customizado = document.getElementById("foto-perfil-texto");

botao_customizado.addEventListener("click", function() {
    input_imagem.click();
});

input_imagem.addEventListener("change", function() {
    if(input_imagem.value){
        texto_customizado.innerHTML = input_imagem.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    } else {
        texto_customizado.innerHTML = "Nenhuma imagem selecionada";
    }
})