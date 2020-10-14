if (localStorage.getItem("modoEscuro")){
    document.body.classList.add('modo-escuro');
}

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

const nome_field = document.getElementById("id_nome");
const invalido_nome = document.getElementById("invalido-nome");

// Validação de nome

nome_field.addEventListener("keyup", () => {
    if(nome_field.value.length > 0){
        fetch(URL_VALIDAR_NOME,{
            method: "POST",
            body:  JSON.stringify({'nome': nome_field.value}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                console.log(dados);

                if(dados["status_nome"] == "inválido"){
                    nome_field.style.borderColor = "red";

                    invalido_nome.innerHTML= dados["erro"];
                    invalido_nome.style.display = "block";
                } else if(dados["status_nome"] == "válido"){
                    nome_field.style.borderColor = "";

                    invalido_nome.innerHTML = "";
                    invalido_nome.style.display = "none";
                }
            })
        })
    } else {
        nome_field.style.borderColor = "";

        invalido_nome.innerHTML = "";
        invalido_nome.style.display = "none";
    }
})

const sobrenome_field = document.getElementById("id_sobrenome");
const invalido_sobrenome = document.getElementById("invalido-sobrenome");

// Validação de sobrenome

sobrenome_field.addEventListener("keyup", () => {
    if(sobrenome_field.value.length > 0){
        fetch(URL_VALIDAR_SOBRENOME,{
            method: "POST",
            body:  JSON.stringify({'sobrenome': sobrenome_field.value}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                console.log(dados);

                if(dados["status_sobrenome"] == "inválido"){
                    sobrenome_field.style.borderColor = "red";

                    invalido_sobrenome.innerHTML= dados["erro"];
                    invalido_sobrenome.style.display = "block";
                } else if(sobrenome_field.value === nome_field.value){
                    sobrenome_field.style.borderColor = "red";

                    invalido_sobrenome.innerHTML= "Seu sobrenome não deve ser igual a seu nome";
                    invalido_sobrenome.style.display = "block";
                } else if(dados["status_sobrenome"] == "válido"){
                    sobrenome_field.style.borderColor = "";

                    invalido_sobrenome.innerHTML = "";
                    invalido_sobrenome.style.display = "none";
                }
            })
        })
    } else {
        sobrenome_field.style.borderColor = "";

        invalido_sobrenome.innerHTML = "";
        invalido_sobrenome.style.display = "none";
    }
})

const email_field = document.getElementById("id_email");
const invalido_email = document.getElementById("invalido-email");

// Validação de e-mail

email_field.addEventListener("keyup", () => {
    if(email_field.value.length > 0){
        fetch(URL_VALIDAR_EMAIL,{
            method: "POST",
            body:  JSON.stringify({'email': email_field.value}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                console.log(dados);

                if(dados["status_email"] == "inválido"){
                    email_field.style.borderColor = "red";

                    invalido_email.innerHTML= dados["erro"];
                    invalido_email.style.display = "block";
                } else if(dados["status_email"] == "válido") {
                    email_field.style.borderColor = "";

                    invalido_email.innerHTML = "";
                    invalido_email.style.display = "none";
                }
            })
        })
    } else {
        email_field.style.borderColor = "";

        invalido_email.innerHTML = "";
        invalido_email.style.display = "none";
    }
})

const senha_field = document.getElementById("id_password");
const invalido_senha = document.getElementById("invalido-password");
const senha_confirmacao_field = document.getElementById("id_password_confirmacao");
const invalido_senha_confirmacao = document.getElementById("invalido-password-confirmacao");

// Validação dos campos de senha

senha_field.addEventListener("keyup", () => {
    if(senha_field.value.length > 0){
        fetch(URL_VALIDAR_SENHA,{
            method: "POST",
            body:  JSON.stringify({'senha': senha_field.value}),
            headers: {"X-CSRFToken": CSRFTOKEN},
        }).then((resposta) => {
            resposta.json().then((dados) => {
                console.log(dados);

                if(dados["status_senha"] == "inválido"){
                    senha_field.style.borderColor = "red";

                    invalido_senha.innerHTML= dados["erro"];
                    invalido_senha.style.display = "block";
                } else if(dados["status_senha"] == "válido") {
                    senha_field.style.borderColor = "";

                    invalido_senha.innerHTML = "";
                    invalido_senha.style.display = "none";
                }

                if(senha_field.value != senha_confirmacao_field.value){
                    senha_confirmacao_field.style.borderColor = "red";

                    invalido_senha_confirmacao.innerHTML= "As senhas devem ser idênticas";
                    invalido_senha_confirmacao.style.display = "block";
                }
            })
        })
    } else {
        senha_field.style.borderColor = "";

        invalido_senha.innerHTML = "";
        invalido_senha.style.display = "none";
    }
})

// Validação de confirmação de senha

senha_confirmacao_field.addEventListener("keyup", () => {
    if (senha_confirmacao_field.value == senha_field.value){
        senha_confirmacao_field.style.borderColor = "";

        invalido_senha_confirmacao.innerHTML= "";
        invalido_senha_confirmacao.style.display = "none";
    } else {
        senha_confirmacao_field.style.borderColor = "red";

        invalido_senha_confirmacao.innerHTML= "As senhas devem ser idênticas";
        invalido_senha_confirmacao.style.display = "block";
    }
})