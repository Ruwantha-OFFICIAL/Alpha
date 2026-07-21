let navbarload = false;

function Nav() {
  console.log("click")
  if(!navbarload){
    let nav = document.querySelector("#Nav");
    nav.classList.toggle("show")
  }
}
