console.log('main.js');

const minDistance = 200; //distance in pixels
var lastPos = {
    x: 0,
    y: 0
}

var imgList = [
    "./assets/p1.jpg",
    "./assets/p2.jpg",
    "./assets/p3.jpg",
    "./assets/p4.jpg",
    "./assets/p5.jpg",
    "./assets/p6.jpg",
];

var index = 0;

// 01. RENDER 1 IMAGE

function createFloatingImage(posX, posY){
    //create img element
    const img = document.createElement("img");
    //load the image
    img.src = imgList[index];
    img.style.width = "300px";
    img.style.height = "auto";
    img.style.position = "absolute";
    img.style.scale = 0;
    img.style.opacity = 0;
    img.style.top = `${posY -75}px`;
    img.style.left = posX - (113.5) + "px";
    img.style.zIndex = Math.round(Math.random() * 10);
    document.body.appendChild(img); //put the img before everything else

    gsap.to(img, {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
    });

    if (index >= imgList.length - 1){
        index = 0;
    } else{
        index += 1;
    }

    setTimeout(function(){
        gsap.to(img, {
            duration: 1,
            opacity: 0,
            scale: 0.5,
            y: 300,
            ease: "power2.inOut",
            onComplete(){
                img.remove(); //remove the image from the DOM
            }
        });
    }, 1000); //wait 2 seconds before removing the image
    
};


// 02. Renderizar “n” imágenes.
//create an event listener
// window.addEventListener("mousemove", function(eventData) { //event being listened for, funtion that will be executed upon hearing the event
//     createFloatingImage(eventData.clientX, eventData.clientY); //get the x and y position of the mouse
// });
window.addEventListener('mousemove', function(eventData){
    console.log(eventData);
    // Calcular distancia entre el mouse y la última imagen creada evaluar nuestra condición
    //1. Calcular distancia 
    var dx = eventData.clientX - lastPos.x;
    dx = Math.abs(dx);

    var dy = Math.abs(eventData.clientY - lastPos.y);

    if (dx >= minDistance || dy >= minDistance) {
        createFloatingImage(eventData.clientX, eventData.clientY);
        lastPos.x = eventData.clientX;
        lastPos.y = eventData.clientY; 
    }
});



// 03. Posicionarlas según el mouse.
// 04. Mostrarlas en ciclo.
// 05. Desaparecerlas después de “x” tiempo.
// 06. Hacer su animación de salida.
// 07. Hacer su animación de entrada.
// 08. Renderizarlas cada “x” distancia.
// 09. Renderizarlas adelante y atrás de cada letra.
