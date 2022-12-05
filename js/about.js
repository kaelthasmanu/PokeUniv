const Nav = document.querySelector("#checkbox_toggle")


Nav.addEventListener("click" ,() =>{
    const cb = document.querySelector('#checkbox_toggle');
    if(cb.checked){
        const about = document.querySelector(".about")
        about.style.marginTop = "135px"
    }
    else{
        const about = document.querySelector(".about")
        about.style.marginTop = "0px"
    }
})