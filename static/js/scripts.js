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

    formFeedback.append('csrfmiddlewaretoken', CSRFTOKEN);

    fetch(FEEDBACK_URL, {
        method: "POST",
        body: formFeedback,
    }).then((result) => {
        let nav = document.getElementById("nav");
        let modal = document.getElementById("feedback-modal-sucesso");
        
        document.getElementById("form-feedback").reset();

        modal.style.display = "grid";

        document.querySelector('#modal-feedback-botao').addEventListener('click', () => {
            let modal = document.getElementById("feedback-modal-sucesso");

            modal.style.display = "none";
        });
    })
}

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

    console.log(pageYOffset);

    if (window.pageYOffset > 100) {
        botao_topo.style.display = "block";
    } else {
        botao_topo.style.display = "none";
    }
})