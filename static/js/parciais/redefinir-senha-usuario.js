const senhaAtualField = document.getElementById("id_old_password");
const senhaField = document.getElementById("id_new_password1");
const senhaConfirmacaoField = document.getElementById("id_new_password2");

const senhaAtualLabel = document.getElementById("senha-label-atual");
const senhaLabel = document.getElementById("senha-label");
const senhaLabelConfirmacao = document.getElementById("senha-label-confirmacao");

const divErroSenhaAtual = document.getElementById("invalido-senha-atual");
const divErroSenha = document.getElementById("invalido-senha");
const divErroSenhaConfirmacao = document.getElementById("invalido-senha-confirmacao");

const botaoSubmitSenha = document.getElementById("botao-submit-senha");

const formRedefinirSenha = document.getElementById("form-redefinir-senha");

let erros = {
    'senha_atual': false,
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
            botaoSubmitSenha.disabled = true;
            return
        }
    }

    botaoSubmitSenha.disabled = false;
}

senhaAtualField.addEventListener("keyup", () => {
    if (senhaAtualField.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_SENHA_ATUAL, senhaAtualField)
            .then((dados) => {
                if(dados["status"] == "inválido"){
                    dispor_erro(senhaAtualField, senhaAtualLabel, divErroSenhaAtual, dados["erro"]);
                    manipular_botao('senha_atual', true);
                } else if(dados["status"] == "válido"){
                    remover_erro(senhaAtualField, senhaAtualLabel, divErroSenhaAtual,);
                    manipular_botao('senha_atual', false);
                }
            })
        }, 500);
    } else {
        remover_erro(senhaAtualField, senhaAtualLabel, divErroSenhaAtual,);
        manipular_botao('senha_atual', false);
    }
})

senhaField.addEventListener("keyup", () => {
    if (senhaField.value.length > 0){
        if (funcao_programada){
            clearTimeout(funcao_programada);
        }

        funcao_programada = setTimeout(function(){chamada_ajax_validacao(URL_VALIDAR_SENHA, senhaField)
            .then((dados) => {
                if(senhaField.value == senhaAtualField.value){
                    dispor_erro(senhaField, senhaLabel, divErroSenha, "Digite uma senha diferente da sua atual");
                    manipular_botao('senha', true);
                } else if(dados["status"] == "inválido"){
                    dispor_erro(senhaField, senhaLabel, divErroSenha, dados["erro"]);
                    manipular_botao('senha', true);
                } else if(dados["status"] == "válido"){
                    remover_erro(senhaField, senhaLabel, divErroSenha);
                    manipular_botao('senha', false);
                }

                if(senhaField.value != senhaConfirmacaoField.value){
                    dispor_erro(senhaConfirmacaoField, senhaLabelConfirmacao, divErroSenhaConfirmacao, "As senhas devem ser idênticas");
                    manipular_botao('senha_confirmacao', true);
                }
            })
        }, 500);
    } else {
        remover_erro(senhaField, senhaLabel, divErroSenha);
        remover_erro(senhaConfirmacaoField, senhaLabelConfirmacao, divErroSenhaConfirmacao);
        manipular_botao('senha', false);
    }
})

senhaConfirmacaoField.addEventListener("keyup", () => {
    if (senhaConfirmacaoField.value == senhaField.value){
        remover_erro(senhaConfirmacaoField, senhaLabelConfirmacao, divErroSenhaConfirmacao);
        manipular_botao('senha_confirmacao', false);
    } else {
        dispor_erro(senhaConfirmacaoField, senhaLabelConfirmacao, divErroSenhaConfirmacao, "As senhas devem ser idênticas");
        manipular_botao('senha_confirmacao', true);
    }
})

formRedefinirSenha.addEventListener("submit", () => {
    botaoSubmitSenha.disabled = true;
    botaoSubmitSenha.innerText = "";
    botaoSubmitSenha.innerHTML = '<div class="spinner"></div>'
})