// close icon
let isLoadEventActive = false;

function colseNav(){
    let navMenu = document.getElementById('navmenu');
    let social = document.getElementById('socialId');
    navMenu.style.right = "-300px";
    social.style.right = "-300px";
}
function openNav(){
    let navMenu = document.getElementById('navmenu');
    let social = document.getElementById('socialId');
    navMenu.style.right = "0";
    social.style.right = "0";
}
window.addEventListener('scroll', function(){

    const services = document.querySelector('.allservices');
    const scrollnum= 1800;
    if(isLoadEventActive) return;
    if(window.scrollY > scrollnum ){
        services.classList.add('visible');
}else {
        services.classList.remove('visible');
    }
});
window.addEventListener('load', function (e) {
    const serv = document.getElementById('all');
    serv.classList.add('visible');
    isLoadEventActive = true;

});

