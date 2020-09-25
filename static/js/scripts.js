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