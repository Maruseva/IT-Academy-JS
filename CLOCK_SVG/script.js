const button = document.getElementById('button');
button.addEventListener("click", showClock);

const coefHourCircle = 20; /* радиус цифр в 20 раз меньше даиметра циферблата*/
const angl = 30; /*угол в одном часе 360/12, расстояние между цифрами*/

function showClock() {

    const text = document.getElementById('text').value;
    const inputs = document.getElementById('input');
    inputs.style.display = "none";

    const svg = document.getElementsByTagName('svg');
    svg[0].style.width = `${text}`;
    svg[0].style.height = `${text}`;

    const clockFace = document.getElementById('clock_face');
    clockFace.style.cx = `${text/2}`;
    clockFace.style.cy = `${text/2}`;
    clockFace.style.r = `${text/2}`;
    clockFace.style.fill = `#d5c06d`;

    let hourPosition = 0; 
// debugger
    for(let i = 12; i > 0; i--) { /*на циферблате 12 часов*/

        const hour = document.createElement('circle');
        svg[0].appendChild(hour);
        // const span = document.createElement('span');
        // span.innerText = `${i}`;
        // hour.appendChild(span);
        
        
        const hourCenterX = text/2+text/2*0.8*Math.sin(hourPosition/180*Math.PI);
        const hourCenterY = text/2-text/2*0.8*Math.cos(hourPosition/180*Math.PI);
        

        hour.style.fill = `#3f9e3f`;
        // hour.style.color = `black`;
        // hour.style.textAlign = `center`;
        // hour.style.fontSize = `${text/coefFontSize}px`; 
        hour.style.r = `${text/coefHourCircle}`; 
        // hour.style.height = `${text/coefHourCircle}px`;
        hour.style.cx = `${hourCenterX}`;
        hour.style.cy = `${hourCenterY}`;

        console.log(hourCenterX)


        hourPosition += -angl;
    }





}

