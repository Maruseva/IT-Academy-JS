const svgns = "http://www.w3.org/2000/svg";

const button = document.getElementById('button');
button.addEventListener("click", showClock);

const coefHourCircle = 20; /* радиус цифр в 20 раз меньше даиметра циферблата*/
const angl = 30; /*угол в одном часе 360/12, расстояние между цифрами*/
const coefHourPosition = 0.4 /* центр круга с цифрами распологается от центра циферблата на растоянии 40% диаметра циферблата*/
const coefFontSize = 12; /* размер шрифта в 12 раз меньше размера диаметра циферблата*/

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

        const hour = document.createElementNS(svgns, "circle");
        svg[0].appendChild(hour);
        const hourNumber = document.createElementNS(svgns, "text");
        hourNumber.textContent = `${i}`;
        svg[0].appendChild(hourNumber);
        
        const hourCenterX = text/2+text*coefHourPosition*Math.sin(hourPosition/180*Math.PI);
        const hourCenterY = text/2-text*coefHourPosition*Math.cos(hourPosition/180*Math.PI);

        hour.style.fill = `#3f9e3f`;
        hour.style.r = `${text/coefHourCircle}`; 
        hour.style.cx = `${hourCenterX}`;
        hour.style.cy = `${hourCenterY}`;

        hourNumber.style.x = `${hourCenterX}`;
        hourNumber.style.y = `${hourCenterY}`;
        hourNumber.style.fill = `black`;
        hourNumber.style.fontSize = `${text/coefFontSize}px`; 


        hourPosition += -angl;
    }





}

