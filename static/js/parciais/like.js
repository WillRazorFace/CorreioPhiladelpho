const botaoLike = document.getElementById("botao-curtir");
const iconeCurtir = document.getElementById("icone-curtir");

botaoLike.addEventListener("click", () => {
    if(botaoLike.classList.contains('curtido')){
        fetch(URL_CURTIR_POST, {
            method: "POST",
            body: JSON.stringify({'post': POST_ATUAL, 'curtido': 'não'}),
            headers:  {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            if(resposta.status == 200){

            } else {
                let modal = document.getElementById("modal-feedback");
                let modal_titulo = document.getElementById("modal-titulo");
                let modal_icone = document.getElementById("modal-icone");
                let modal_mensagem = document.getElementById("modal-mensagem");
                let modal_botao = document.getElementById("modal-botao");

                modal.classList.add("modal-erro");
                modal_titulo.innerHTML = "Algo deu errado";
                modal_icone.classList.add("fa-exclamation");
                modal_mensagem.innerHTML = "Um erro aconteceu ao descurtir a publicação. Tente de novo."

                modal.style.display = "grid";

                modal_botao.addEventListener("click", () => {
                    modal.style.display = "none";
                })
            }
        })

        botaoLike.classList.remove("curtido");
        iconeCurtir.title = "Curtir";
    } else {
        fetch(URL_CURTIR_POST, {
            method: "POST",
            body: JSON.stringify({'post': POST_ATUAL, 'curtido': 'sim'}),
            headers:  {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            if(resposta.status == 200){

            } else {
                let modal = document.getElementById("modal-feedback");
                let modal_titulo = document.getElementById("modal-titulo");
                let modal_icone = document.getElementById("modal-icone");
                let modal_mensagem = document.getElementById("modal-mensagem");
                let modal_botao = document.getElementById("modal-botao");

                modal.classList.add("modal-erro");
                modal_titulo.innerHTML = "Algo deu errado";
                modal_icone.classList.add("fa-exclamation");
                modal_mensagem.innerHTML = "Um erro aconteceu ao curtir a publicação. Tente de novo."

                modal.style.display = "grid";

                modal_botao.addEventListener("click", () => {
                    modal.style.display = "none";
                })
            }
        })

        botaoLike.classList.add('curtido');
        iconeCurtir.title = "Curtido";
    }
})