/*=========================================
    MENSAJE
=========================================*/

const message = `Gracias por llenar mi vida de momentos tan hermosos, dulces e inolvidables.

Cada día contigo florece como los tulipanes que tanto amas; es tan dulce como esa fruta que lleva tu nombre y tan mágico como ese universo de luces, cámaras y transiciones que refleja tu creatividad.

Contigo aprendí que el hogar no siempre es un lugar; a veces tiene un nombre, una sonrisa y un abrazo.

Eres mi lugar favorito.

Gracias por cada risa, cada aventura, cada fotografía que guarda nuestros recuerdos y cada instante que convierte un día cualquiera en uno inolvidable.

Hoy solo quiero recordarte lo mucho que significas para mí.

Feliz Día de la Novia, mi amor.

Te amo infinitamente. ❤️`;

const intro = document.querySelector("#intro");
const story = document.querySelector("#story");
const ending = document.querySelector("#ending");

const start = document.querySelector("#start");
const loveButton = document.querySelector("#loveButton");

const typing = document.querySelector("#typing");

const music = document.querySelector("#music");

let index = 0;

function typeWriter(){

    if(index < message.length){

        typing.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeWriter,38);

    }

}

start.addEventListener("click",()=>{

    intro.style.opacity="0";

    setTimeout(()=>{

        intro.style.display="none";

        story.style.display="flex";

        music.play();

        setTimeout(typeWriter,2500);

    },1000);

});

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=

    Math.random()*25+15+"px";

    heart.style.animationDuration=

    Math.random()*3+4+"s";

    document.querySelector(".hearts")

    .appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },7000);

}

setInterval(createHeart,450);

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.innerHTML="🌸";

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=

    Math.random()*6+6+"s";

    petal.style.fontSize=

    Math.random()*18+12+"px";

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },12000);

}
setInterval(createPetal,700);

loveButton.addEventListener("click",()=>{

    for(let i=0;i<120;i++){

        setTimeout(createHeart,i*40);

    }

    if(navigator.vibrate){

        navigator.vibrate([200,100,200]);

    }

    setTimeout(()=>{

        story.style.display="none";

        ending.style.display="flex";

    },5000);

});

function sparkle(){

    const spark=document.createElement("div");

    spark.className="sparkle";

    spark.innerHTML="✨";

    spark.style.left=

    Math.random()*280+"px";

    spark.style.top=

    Math.random()*280+"px";

    document.querySelector(".photo")

    .appendChild(spark);

    setTimeout(()=>{

        spark.remove();

    },1800);

}

setInterval(sparkle,450);

setTimeout(()=>{

document
.querySelector("#envelopeScene")
.style.display="flex";

setTimeout(()=>{

document
.querySelector(".letter-paper")
.style.transform="translateY(0px)";

},800);

},6500);

const endingMessage=`

Si pudiera elegir un lugar donde quedarme para siempre...

volvería a elegir tus abrazos.

Gracias por enseñarme que el amor también puede sentirse en una fotografía,

en una flor,

en una canción,

en una mirada,

y en todos esos pequeños momentos que compartimos.

Prometo seguir llenando esa Polaroid de recuerdos contigo.

Porque mis recuerdos favoritos...

todavía no los hemos vivido.

Te amo infinitamente.

❤️
`;