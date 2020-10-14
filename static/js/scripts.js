// Menu Hambúrguer na barra de navegação

function mostrarMenu(element){
    element.classList.toggle("toggle-fechar");

    var menu = document.getElementById("menu");
    var barra = document.getElementById("nav");

    if (menu.className === "menu"){
        menu.className += " colapsavel";
    } else {
        menu.className = "menu";
    }

    if (barra.className === "barra-de-navegacao"){
        barra.className += " colapsavel";
    } else {
        barra.className = "barra-de-navegacao"
    }
}

// Pegar cookie CSRF_TOKEN

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Envio de feedback Ajax

document.querySelector('#form-feedback').addEventListener('submit', (enviarFeedback));

function enviarFeedback(event){
    event.preventDefault();

    let formFeedback = new FormData(document.getElementById("form-feedback"));
    let modal = document.getElementById("modal-feedback");
    let modal_titulo = document.getElementById("modal-titulo");
    let modal_icone = document.getElementById("modal-icone");
    let modal_mensagem = document.getElementById("modal-mensagem");
    let modal_botao = document.getElementById("modal-botao");

    fetch(FEEDBACK_URL, {
        method: "POST",
        body: formFeedback,
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 201){
            document.getElementById("form-feedback").reset();

            modal.classList.add("modal-sucesso");
            modal_titulo.innerHTML = "Feedback enviado";
            modal_icone.classList.add("fa-paper-plane");
            modal_mensagem.innerHTML = "Obrigado! Leremos o que você tem a dizer assim que possível."

            modal.style.display = "grid";

            modal_botao.addEventListener("click", () => {
                modal.style.display = "none";
            })
        } else {
            document.getElementById("form-feedback").reset();

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

// Modo escuro

const modoEscuro = document.querySelector("#modo-escuro-switch");
const modoEscuroStorage = localStorage.getItem("modoEscuro");

if (modoEscuroStorage){
    document.body.classList.add('modo-escuro');

    modoEscuro.checked = true;
}

modoEscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');

    if (document.body.classList.contains('modo-escuro')){
        localStorage.setItem("modoEscuro", true);
        return;
    }

    localStorage.removeItem("modoEscuro");
})

// Muda o display do botão para o topo para block se o usuário tiver dado scroll suficiente

window.addEventListener("scroll", () => {
    var botao_topo = document.querySelector("#voltar");

    if (window.pageYOffset > 100) {
        botao_topo.style.display = "block";
    } else {
        botao_topo.style.display = "none";
    }
})