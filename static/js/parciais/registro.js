// Input customizado de imagem no form de registro

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

// Chamada Ajax para criação de usuário

document.getElementById("form-registro").addEventListener("submit", function(event){
    event.preventDefault();

    botao_submit.disabled = true;
    botao_submit.innerText = "";
    botao_submit.innerHTML = '<div class="spinner"></div>';

    let formRegistro = new FormData(document.getElementById("form-registro"));
    let modal = document.getElementById("modal-registro");
    let modal_titulo = document.getElementById("modal-titulo");
    let modal_icone = document.getElementById("modal-icone");
    let modal_mensagem = document.getElementById("modal-mensagem");
    let modal_botao = document.getElementById("modal-botao");

    fetch(URL_CRIAR_USUARIO,{
        method: "POST",
        body: formRegistro,
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 201){
            document.getElementById("form-registro").reset();

            modal.classList.add("modal-aviso");
            modal_titulo.innerHTML = "Verifique seu e-mail";
            modal_icone.classList.add("fa-envelope");
            modal_mensagem.innerHTML = "Um link foi enviado ao seu e-mail para verificação. Após verificado, você poderá interagir com a plataforma."

            modal.style.display = "grid";

            modal_botao.style.display = "none";

            setTimeout(() => {
                window.location.href = REDIRECIONAR;
            }, 7000);
        } else {
            botao_submit.innerHTML = "";
            botao_submit.innerText = "Cadastrar-se";
            botao_submit.disabled = false;

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

// Validação de fields no form de registro

const botao_submit = document.getElementById("botao-submit");

let erros = {
    'nome': false,
    'sobrenome': false,
    'email': false,
    'senha': false,
    'senha_confirmacao': false,
};

let funcao_programada = false;

let chamada_ajax_validacao = function(url, field){
    let promise = new Promise(function(resolve, reject){
        fetch(url, {
            method: "POST",
            body: JSON.stringify({valor: field.value}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                resolve(dados);
            })
        })
    })

    return promise;
}

let dispor_erro = function(field, label, div_erro, erro){
    field.style.borderColor = "red";
    
    label.style.color = "red";
    label.style.fontWeight = "bold";

    div_erro.innerHTML = erro;
    div_erro.style.display = "block";

    botao_submit.disabled = true;
}

let remover_erro = function(field, label, div_erro){
    field.style.borderColor = "";

    label.style.color = "";
    label.style.fontWeight = "";

    div_erro.innerHTML = "";
    div_erro.style.display = "";
}

let manipular_botao = function(field_erro, estado=false){
    erros[field_erro] = estado;

    for(field in erros){
        if(erros[field] == true){
            botao_submit.disabled = true;
            return
        }
    }

    botao_submit.disabled = false;
}

const nome_field = document.getElementById("id_nome");
const nome_label = document.getElementById("nome-label");
const div_erro_nome = document.getElementById("invalido-nome");

// Validação de nome

nome_field.addEventListener("keyup", () => {
    if (nome_field.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_NOME, nome_field)
            .then((resposta) => {
                if(resposta["status"] == "inválido"){
                    dispor_erro(nome_field, nome_label, div_erro_nome, resposta["erro"]);
                    manipular_botao('nome', true);
                } else if(resposta["status"] == "válido"){
                    remover_erro(nome_field, nome_label, div_erro_nome);
                    manipular_botao('nome', false);
                }
            })
        }, 500);
    } else {
        remover_erro(nome_field, nome_label, div_erro_nome);
        manipular_botao('nome', false);
    }
})

const sobrenome_field = document.getElementById("id_sobrenome");
const sobrenome_label = document.getElementById("sobrenome-label");
const div_erro_sobrenome = document.getElementById("invalido-sobrenome");

// Validação de sobrenome

sobrenome_field.addEventListener("keyup", () => {
    if (sobrenome_field.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_SOBRENOME, sobrenome_field)
            .then((resposta) => {
                if(resposta["status"] == "inválido"){
                    dispor_erro(sobrenome_field, sobrenome_label, div_erro_sobrenome, resposta["erro"]);
                    manipular_botao('sobrenome', true);
                } else if(resposta["status"] == "válido"){
                    remover_erro(sobrenome_field, sobrenome_label, div_erro_sobrenome);
                    manipular_botao('sobrenome', false);
                }
            })
        }, 500);
    } else {
        remover_erro(sobrenome_field, sobrenome_label, div_erro_sobrenome);
        manipular_botao('sobrenome', false);
    }
})

const email_field = document.getElementById("id_email");
const email_label = document.getElementById("email-label");
const div_erro_email = document.getElementById("invalido-email");

// Validação de e-mail

email_field.addEventListener("keyup", () => {
    if (email_field.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_EMAIL, email_field)
            .then((resposta) => {
                if(resposta["status"] == "inválido"){
                    dispor_erro(email_field, email_label, div_erro_email, resposta["erro"]);
                    manipular_botao('email', true);
                } else if(resposta["status"] == "válido"){
                    remover_erro(email_field, email_label, div_erro_email);
                    manipular_botao('email', false);
                }
            })
        }, 500);
    } else {
        remover_erro(email_field, email_label, div_erro_email);
        manipular_botao('email', false);
    }
})

const senha_field = document.getElementById("id_password");
const senha_label = document.getElementById("password-label");
const div_erro_senha = document.getElementById("invalido-password");

const senha_confirmacao_field = document.getElementById("id_password_confirmacao");
const senha_confirmacao_label = document.getElementById("password-confirmacao-label");
const div_erro_senha_confirmacao = document.getElementById("invalido-password-confirmacao");

// Validação dos campos de senha

senha_field.addEventListener("keyup", () => {
    if (senha_field.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_SENHA, senha_field)
            .then((resposta) => {
                if(resposta["status"] == "inválido"){
                    dispor_erro(senha_field, senha_label, div_erro_senha, resposta["erro"]);
                    manipular_botao('senha', true);
                } else if(resposta["status"] == "válido"){
                    remover_erro(senha_field, senha_label, div_erro_senha);
                    manipular_botao('senha', false);
                }

                if(senha_field.value != senha_confirmacao_field.value){
                    dispor_erro(senha_confirmacao_field, senha_confirmacao_label, div_erro_senha_confirmacao, "As senhas devem ser idênticas");
                    manipular_botao('senha_confirmacao', true);
                }
            })
        }, 500);
    } else {
        remover_erro(senha_field, senha_label, div_erro_senha);
        remover_erro(senha_confirmacao_field, senha_confirmacao_label, div_erro_senha_confirmacao);
        manipular_botao('senha', false);
    }
})

// Validação de confirmação de senha

senha_confirmacao_field.addEventListener("keyup", () => {
    if (senha_confirmacao_field.value == senha_field.value){
        remover_erro(senha_confirmacao_field, senha_confirmacao_label, div_erro_senha_confirmacao);
        manipular_botao('senha_confirmacao', false);
    } else {
        dispor_erro(senha_confirmacao_field, senha_confirmacao_label, div_erro_senha_confirmacao, "As senhas devem ser idênticas");
        manipular_botao('senha_confirmacao', true);
    }
})