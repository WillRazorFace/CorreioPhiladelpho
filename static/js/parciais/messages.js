const messages = document.getElementsByClassName("alert");

if(messages){
    setTimeout(() => {
        while(messages.length > 0){
            messages[0].remove();
        }
    }, 5000);
}