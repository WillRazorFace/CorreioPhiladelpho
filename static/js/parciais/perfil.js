window.onload = function(){
    const direitaMutavel = document.getElementById("perfil-direita-mutavel");
    const infoSecaoMenu = document.getElementById("info");
    const comentariosSecaoMenu = document.getElementById("comentarios");
    const publicacoesSecaoMenu = document.getElementById("pubs-curtidas");

    // Input customizado para trocar a foto de perfil

    const botaoTrocarFoto = document.getElementById("trocar-foto-botao");
    const botaoSubmitTrocarFoto = document.getElementById("trocar-foto-submit")
    const inputImagem = document.getElementById("id_foto");
    const formTrocarFoto = document.getElementById("form-trocar-foto");
    const fotoUsuario = document.getElementById("foto-usuario");

    botaoTrocarFoto.addEventListener("click", () => {
        inputImagem.click();
    })

    inputImagem.addEventListener("change", () => {
        if(inputImagem.value){
            botaoTrocarFoto.classList.add("nao-dispor");
            botaoSubmitTrocarFoto.classList.remove("nao-dispor");
        }
    })

    formTrocarFoto.addEventListener("submit", (event) => {
        event.preventDefault();

        form = new FormData(formTrocarFoto);

        fetch(URL_ALTERAR_FOTO_DE_PERFIL, {
            method: "POST",
            body: form,
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            if(resposta.status == 200){
                resposta.json().then((dados) => {
                    fotoUsuario.src = dados["nova-foto"];

                    botaoSubmitTrocarFoto.classList.add("nao-dispor");
                    botaoTrocarFoto.classList.remove("nao-dispor");
                })
            } else {
                let modal = document.getElementById("modal-feedback");
                let modal_titulo = document.getElementById("modal-titulo");
                let modal_icone = document.getElementById("modal-icone");
                let modal_mensagem = document.getElementById("modal-mensagem");
                let modal_botao = document.getElementById("modal-botao");
    
                let smallVerificado = document.getElementById("is_verified");

                modal.classList.add("modal-erro");
                modal_titulo.innerHTML = "Algo deu errado";
                modal_icone.classList.add("fa-exclamation");
                modal_mensagem.innerHTML = "Um erro aconteceu durante a requisição. Tente de novo. Se o problema continuar, contate o suporte."

                modal.style.display = "grid";

                modal_botao.addEventListener("click", () => {
                    modal.style.display = "none";
                })
            }
        })
    })

    let secaoInformacoes = function(){
        fetch(URL_DISPOR_SECAO_PERFIL, {
            method: "POST",
            body: JSON.stringify({secao: "info"}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                direitaMutavel.innerHTML = dados["html"];
    
                infoSecaoMenu.classList.add("ativo");
    
                let formAlterarPerfil = document.getElementById("form-alterar-perfil");
    
                let botaoAlterarPerfil = document.getElementById("botao-alterar-perfil");
                let botaoSalvarPerfil = document.getElementById("botao-salvar-perfil");
    
                let inputNome = document.getElementById("nome");
                let inputSobrenome = document.getElementById("sobrenome");
                let inputEmail = document.getElementById("email");
                let inputNewsletter = document.getElementById("newsletter");
    
                let erroDivNome = document.getElementById("erro-div-nome");
                let erroDivSobrenome = document.getElementById("erro-div-sobrenome");
                let erroDivEmail = document.getElementById("erro-div-email");
    
                let labelNome = document.getElementById("label-nome");
                let labelSobrenome = document.getElementById("label-sobrenome");
                let labelEmail = document.getElementById("label-email");
                let labelNewsletter = document.getElementById("label-newsletter");

                let botaoReenviarEmailAtivacao = document.getElementById("reenviar-email-ativacao-link");
    
                let dispor_erro = function(input, div, label, erro){
                    input.classList.add("erro-input-alterar-perfil");
    
                    div.innerText = erro;
                    div.classList.remove("nao-dispor");
                                    
                    label.style.color = "red";
                }
    
                let remover_erro = function(input, div, label){
                    input.classList.remove("erro-input-alterar-perfil");
    
                    div.innerText = "";
                    div.classList.add("nao-dispor");
    
                    label.style.color = "";
                }
    
                botaoAlterarPerfil.addEventListener("click", (event) => {
                    event.preventDefault();
    
                    botaoAlterarPerfil.classList.add("nao-dispor");
                    botaoSalvarPerfil.classList.remove("nao-dispor");
    
                    inputNome.disabled = false;
                    inputSobrenome.disabled = false;
                    inputEmail.disabled = false;
                    inputNewsletter.disabled = false;
    
                    labelNome.classList.remove("label-alterar-perfil-desabilitado");
                    labelSobrenome.classList.remove("label-alterar-perfil-desabilitado");
                    labelEmail.classList.remove("label-alterar-perfil-desabilitado");
                    labelNewsletter.classList.remove("label-alterar-perfil-desabilitado");
    
                    inputNome.focus();
                })
    
                formAlterarPerfil.addEventListener("submit", (event) => {
                    event.preventDefault();
    
                    fetch(URL_ALTERAR_PERFIL, {
                        method: "POST",
                        body: JSON.stringify({
                            nome: inputNome.value,
                            sobrenome: inputSobrenome.value,
                            email: inputEmail.value,
                            newsletter: inputNewsletter.checked,
                        }),
                        headers: {"X-CSRFToken": CSRFTOKEN},
                    }).then((resposta) => {
                        if(resposta.status == 409){
                            resposta.json().then((dados) => {
                                let field = dados["field"];
                                let erro = dados["erro"];
    
                                if(field == "nome"){
                                    dispor_erro(inputNome, erroDivNome, labelNome, erro);
    
                                    remover_erro(inputSobrenome, erroDivSobrenome, labelSobrenome);
                                    remover_erro(inputEmail, erroDivEmail, labelEmail);
                                } else if(field == "sobrenome"){
                                    dispor_erro(inputSobrenome, erroDivSobrenome, labelSobrenome, erro);
    
                                    remover_erro(inputNome, erroDivNome, labelNome);
                                    remover_erro(inputEmail, erroDivEmail, labelEmail);
                                } else if(field == "email"){
                                    dispor_erro(inputEmail, erroDivEmail, labelEmail, erro);
    
                                    remover_erro(inputNome, erroDivNome, labelNome);
                                    remover_erro(inputSobrenome, erroDivSobrenome, labelSobrenome);
                                }
                            })
                        } else {
                            resposta.json().then((dados) => {
                                botaoSalvarPerfil.classList.add("nao-dispor");
                                botaoAlterarPerfil.classList.remove("nao-dispor");
    
                                inputNome.disabled = true;
                                inputSobrenome.disabled = true;
                                inputEmail.disabled = true;
                                inputNewsletter.disabled = true;

                                remover_erro(inputNome, erroDivNome, labelNome);
                                remover_erro(inputSobrenome, erroDivSobrenome, labelSobrenome);
                                remover_erro(inputEmail, erroDivEmail, labelEmail);
    
                                labelNome.classList.add("label-alterar-perfil-desabilitado");
                                labelSobrenome.classList.add("label-alterar-perfil-desabilitado");
                                labelEmail.classList.add("label-alterar-perfil-desabilitado");
                                labelNewsletter.classList.add("label-alterar-perfil-desabilitado");
    
                                let resultadoAlterarPerfil = document.getElementById("resultado-alterar-perfil");
                                
                                if(dados["mensagem"]){
                                    resultadoAlterarPerfil.innerText = dados["mensagem"];
                                    resultadoAlterarPerfil.classList.remove("nao-dispor");
                                }
    
                                if(dados["email_alterado"]){
                                    let modal = document.getElementById("modal-feedback");
                                    let modal_titulo = document.getElementById("modal-titulo");
                                    let modal_icone = document.getElementById("modal-icone");
                                    let modal_mensagem = document.getElementById("modal-mensagem");
                                    let modal_botao = document.getElementById("modal-botao");
    
                                    let smallVerificado = document.getElementById("is_verified");
    
                                    smallVerificado.innerText = "Não";
    
                                    modal.classList.add("modal-aviso");
                                    modal_titulo.innerHTML = "Email alterado";
                                    modal_icone.classList.add("fa-envelope");
                                    modal_mensagem.innerHTML = "Um e-mail de confirmação foi enviado para o seu novo endereço. Confirme-o para poder interagir com a plataforma";
    
                                    modal.style.display = "grid";
    
                                    modal_botao.addEventListener("click", () => {
                                        modal.style.display = "none";
                                    })
                                }
    
                                setTimeout(() => {
                                    resultadoAlterarPerfil.innerText = "";
                                    resultadoAlterarPerfil.classList.add("nao-dispor");
                                }, 5000);
                            })
                        }
                    })
                })

                botaoReenviarEmailAtivacao.addEventListener("click", () => {
                    fetch(URL_REENVIAR_EMAIL_ATIVACAO).then((resposta) => {
                        console.log(resposta.status);
                        
                        let modal = document.getElementById("modal-feedback");
                        let modal_titulo = document.getElementById("modal-titulo");
                        let modal_icone = document.getElementById("modal-icone");
                        let modal_mensagem = document.getElementById("modal-mensagem");
                        let modal_botao = document.getElementById("modal-botao");
    
                        let smallVerificado = document.getElementById("is_verified");

                        if(resposta.status == 200){
                            smallVerificado.innerText = "Não";
    
                            modal.classList.add("modal-aviso");
                            modal_titulo.innerHTML = "Verifique seu e-mail";
                            modal_icone.classList.add("fa-envelope");
                            modal_mensagem.innerHTML = "Um e-mail de confirmação foi enviado para o seu endereço. Confirme-o para poder interagir com a plataforma.";
    
                            modal.style.display = "grid";
    
                            modal_botao.addEventListener("click", () => {
                                modal.style.display = "none";
                            })
                        } else {
                            modal.classList.add("modal-erro");
                            modal_titulo.innerHTML = "Algo deu errado";
                            modal_icone.classList.add("fa-exclamation");
                            modal_mensagem.innerHTML = "Um erro aconteceu durante a requisição. Tente de novo. Se o problema continuar, contate o suporte."

                            modal.style.display = "grid";

                            modal_botao.addEventListener("click", () => {
                                modal.style.display = "none";
                            })
                        }
                    })
                })
            })
        })
    }

    secaoInformacoes();

    infoSecaoMenu.addEventListener("click", () => {
        secaoInformacoes();

        infoSecaoMenu.classList.add("ativo");
        comentariosSecaoMenu.classList.remove("ativo");
        publicacoesSecaoMenu.classList.remove("ativo");
    });

    comentariosSecaoMenu.addEventListener("click", () => {
        fetch(URL_DISPOR_SECAO_PERFIL, {
            method: "POST",
            body: JSON.stringify({secao: "comentarios"}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                direitaMutavel.innerHTML = dados["html"];

                comentariosSecaoMenu.classList.add("ativo");
                infoSecaoMenu.classList.remove("ativo");
                publicacoesSecaoMenu.classList.remove("ativo");
            })
        })
    });

    publicacoesSecaoMenu.addEventListener("click", () => {
        fetch(URL_DISPOR_SECAO_PERFIL, {
            method: "POST",
            body: JSON.stringify({secao: "pubs"}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                direitaMutavel.innerHTML = dados["html"];

                publicacoesSecaoMenu.classList.add("ativo");
                infoSecaoMenu.classList.remove("ativo");
                comentariosSecaoMenu.classList.remove("ativo");
            })
        })
    });
}