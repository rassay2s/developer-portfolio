// close icon
function colseNav(){
    let navMenu = document.getElementById('navmenu');
    navMenu.style.right = "-300px";
}
function openNav(){
    let navMenu = document.getElementById('navmenu');
    navMenu.style.right = "0";
}
window.addEventListener('scroll', function(){

    const services = document.querySelector('.allservices');
    const scrollnum= 1800;
    if(window.scrollY > scrollnum){
        services.classList.add('visible');
}else {
        services.classList.remove('visible');
    }
});
