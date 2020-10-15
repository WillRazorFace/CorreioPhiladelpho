const email_field_login = document.getElementById("id_email_login");
const email_label_login = document.getElementById("label-email-login");

const senha_field_login = document.getElementById("id_password_login");
const senha_label_login = document.getElementById("label-password-login");

const div_erro_login = document.getElementById("div-erro-login");

let dispor_erro = function(field, label){
    field.style.borderColor = "red";
    
    label.style.color = "red";
    label.style.fontWeight = "bold";
}

let remover_erro = function(field, label){
    field.style.borderColor = "";

    label.style.color = "";
    label.style.fontWeight = "";
}

document.getElementById("form-login").addEventListener("submit", function(event){
    event.preventDefault();

    let formLogin = new FormData(document.getElementById("form-login"));
    let div_erro_login = document.getElementById("div-erro-login");

    fetch(URL_FAZER_LOGIN,{
        method: "POST",
        body: formLogin,
        headers: {"X-CSRFToken": CSRFTOKEN},
    }).then((resposta) => {
        if(resposta.status == 200){
            remover_erro(email_field_login, email_label_login);
            remover_erro(senha_field_login, senha_label_login);

            window.location.href = REDIRECIONAR_LOGIN;
        } else if(resposta.status == 404){
            div_erro_login.innerHTML = "E-mail ou senha incorretos";
            div_erro_login.style.display = "block";

            dispor_erro(email_field_login, email_label_login);
            dispor_erro(senha_field_login, senha_label_login);
        } else if(resposta.status == 409){
            div_erro_login.innerHTML = "Ocorreu um erro durante sua requisição. Veja se digitou as suas informações corretamente.";
            div_erro_login.style.display = "block";

            dispor_erro(email_field_login, email_label_login);
            dispor_erro(senha_field_login, senha_label_login);
        }
    })
})