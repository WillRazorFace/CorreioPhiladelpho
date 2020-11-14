if(! localStorage.boasVindasIndex){
    const conteudoIndex = document.getElementById("conteudo-index");
    let indexBoasVindas = 1;

    conteudoIndex.insertAdjacentHTML("afterbegin",
        '<div class="boas-vindas-wrapper" id="boas-vindas"> \
            <div class="boas-vindas-container"> \
                <img src="' + IMAGEM_1 + '" id="imagem-boas-vindas"> \
                \
                <div class="texto"> \
                    <h2 id="titulo-boas-vindas">Bem-vindo ao Correio Philadelpho</h2> \
                    <p id="texto-boas-vindas">Veja essa explicação rápida para ter a melhor experiência no site</p> \
                </div> \
                \
                <div class="botoes"> \
                    <div id="fechar-boas-vindas" class="fechar"><i class="fas fa-times-circle fa-2x"></i></div> \
                    <div id="anterior-boas-vindas" class="proximo"><i class="fas fa-arrow-left fa-2x"></i></div> \
                    <div id="proximo-boas-vindas" class="anterior"><i class="fas fa-arrow-right fa-2x"></i></div> \
                </div> \
            </div> \
        </div>'
    )

    const botaoFechar = document.getElementById("fechar-boas-vindas");
    const botaoProximo = document.getElementById("proximo-boas-vindas");
    const botaoAnterior = document.getElementById("anterior-boas-vindas");

    const imagemBoasVindas = document.getElementById("imagem-boas-vindas");
    const tituloBoasVindas = document.getElementById("titulo-boas-vindas");
    const textoBoasVindas = document.getElementById("texto-boas-vindas");

    botaoFechar.addEventListener("click", () => {
        document.getElementById("boas-vindas").remove();
    });

    function mudarIndex(){
        if(indexBoasVindas == 1){
            imagemBoasVindas.src = IMAGEM_1;

            tituloBoasVindas.innerText = "Bem-vindo ao Correio Philadelpho";
            textoBoasVindas.innerText = "Veja essa explicação rápida para ter a melhor experiência no site";
        } else if(indexBoasVindas == 2){
            imagemBoasVindas.src = IMAGEM_2;

            tituloBoasVindas.innerText = "Pesquisando";
            textoBoasVindas.innerText = "Caminhe pelas publicações pesquisando através da lupa na barra de navegação";
        } else if(indexBoasVindas == 3){
            imagemBoasVindas.src = IMAGEM_3;

            tituloBoasVindas.innerText = "Categorias";
            textoBoasVindas.innerText = "Veja o que mais te interressa! Filtre as publicações por categoria através da barra de navegação";
        } else if(indexBoasVindas == 4){
            imagemBoasVindas.src = IMAGEM_4;

            tituloBoasVindas.innerText = "Modo Escuro";
            textoBoasVindas.innerText = "Olhos cansados? Experimente ativar o modo escuro";
        } else if(indexBoasVindas == 5){
            imagemBoasVindas.src = IMAGEM_5;

            tituloBoasVindas.innerText = "Seções";
            textoBoasVindas.innerText = "Veja o conteúdo mais recente e as publicações com mais acessos nas seções da página inicial";
        } else if(indexBoasVindas == 6){
            imagemBoasVindas.src = IMAGEM_6;

            tituloBoasVindas.innerText = "Painel de Usuário";
            textoBoasVindas.innerText = "Entre ou cadastre-se para ter acesso a toda a plataforma";
        } else if(indexBoasVindas == 7){
            imagemBoasVindas.src = IMAGEM_7;

            tituloBoasVindas.innerText = "Feedback";
            textoBoasVindas.innerText = "Deixe-nos saber sua opinião! Ela será importante para futuras melhorias. Você pode nos enviar um feedback através do rodapé";
        } else if(indexBoasVindas == 8){
            imagemBoasVindas.src = IMAGEM_1;

            tituloBoasVindas.innerText = "Boa sorte";
            textoBoasVindas.innerText = "Você está por sua conta daqui pra frente";
        } else if(indexBoasVindas == 9){
            document.getElementById("boas-vindas").remove();
        }
    }

    botaoAnterior.addEventListener("click", () => {
        if(indexBoasVindas > 1){
            indexBoasVindas--;
        }

        mudarIndex();
    })

    botaoProximo.addEventListener("click", () => {
        indexBoasVindas++;

        mudarIndex();
    })

    localStorage.boasVindasIndex = true;
}