const emailField = document.getElementById("id_email");
const emailLabel = document.getElementById("email-label");
const divErroEmail = document.getElementById("invalido-email");
const botaoSubmitEmail = document.getElementById("botao-submit-email");

let erros = {
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

let dispor_erro = function(field, label, div_erro, erro, botao){
    field.style.borderColor = "red";
    
    label.style.color = "red";
    label.style.fontWeight = "bold";

    div_erro.innerHTML = erro;
    div_erro.style.display = "block";
}

let remover_erro = function(field, label, div_erro, botao){
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

emailField.addEventListener("keyup", () => {
    if (emailField.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_EMAIL, emailField)
            .then((dados) => {
                if(dados["status"] == 'válido'){
                    remover_erro(emailField, emailLabel, divErroEmail);

                    botaoSubmitEmail.disabled = false;
                } else if (dados["status"] == 'inválido'){
                    dispor_erro(emailField, emailLabel, divErroEmail, dados["erro"]);

                    botaoSubmitEmail.disabled = true;
                }
            })
        }, 500);
    } else {
        remover_erro(emailField, emailLabel, divErroEmail);

        botaoSubmitEmail.disabled = false;
    }
})
