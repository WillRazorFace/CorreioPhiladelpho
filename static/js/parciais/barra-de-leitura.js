function barraDeProgresso(){
    const barra_de_progresso = document.querySelector("#barra-de-progresso");
    const conteudo = document.querySelector("#conteudo-pub");
    const scroll = window.pageYOffset;

    const fim_da_publicacao = conteudo.offsetTop + conteudo.offsetHeight - window.innerHeight;

    const progresso_de_leitura = Math.min(Math.ceil(scroll / fim_da_publicacao * 100), 100);
    barra_de_progresso.style.width = `${progresso_de_leitura}%`;
    
    const main = document.getElementById("main");

    if(barra_de_progresso.style.width == "100%"){
        barra_de_progresso.style.display = "none";
    } else {
        barra_de_progresso.style.display = "block";
    }
}

window.onload = function(){
    barraDeProgresso();

    document.addEventListener("scroll", barraDeProgresso);
}