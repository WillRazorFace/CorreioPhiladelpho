document.querySelector("#categorias")
.addEventListener("wheel", event => 
{
    if(event.deltaY < 0)
    {
        event.target.scrollBy(300, 0)  //Scroll up
    }
    else
    {
        event.target.scrollBy(-300, 0) //Scroll down
    }
})