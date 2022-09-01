const svgns = "http://www.w3.org/2000/svg";

const button = document.getElementById('button');
button.addEventListener("click", showClock);

const coefHourCircle = 20; /* радиус цифр в 20 раз меньше даиметра циферблата*/
const angl = 30; /*угол в одном часе 360/12, расстояние между цифрами*/
const coefHourPosition = 0.4 /* центр круга с цифрами распологается от центра циферблата на растоянии 40% диаметра циферблата*/
const coefFontSize = 12; /* размер шрифта в 12 раз меньше размера диаметра циферблата*/
const coefWidthHour = 25; /* ширина часовой стрелки 1/25 диаметра циферблата*/
const coefWidthMinute = 35; /* ширина минутной стрелки 1/35 диаметра циферблата*/
const coefWidthSecond = 50; /* ширина секундной стрелки 1/50 диаметра циферблата*/
const coefHeightHour = 0.25; /* длина часовой стрелки 25% диаметра циферблата*/
const coefHeightMinute = 0.3; /* длина минутной стрелки 30% диаметра циферблата*/
const coefHeightSecond = 0.45; /* длина секундной стрелки 45% диаметра циферблата*/
const coefClockHands = 0.1; /*короткий край стрелки 10% ее длины*/
const coefDegrees = 6; /* градусов на одном делении циферблата, 360/60*/ 

let startDate = new Date ();
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);
startDate.setMilliseconds(0);

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
        hour.setAttribute('cx', hourCenterX.toString());
        hour.setAttribute('cy', hourCenterY.toString());

        hourNumber.setAttribute('x', hourCenterX.toString());
        hourNumber.setAttribute('y', hourCenterY.toString());
        hourNumber.style.fill = `black`;
        hourNumber.style.fontSize = `${text/coefFontSize}px`; 
        hourNumber.style.textAnchor = `middle`;

        hourPosition += -angl;
    }

    const secondHand = document.createElementNS(svgns, "rect");
    svg[0].appendChild(secondHand);

    secondHand.style.width = `${text/coefWidthSecond}px`;
    secondHand.style.height = `${text*coefHeightSecond}px`; 
    secondHand.style.rx = `15`;
    secondHand.style.ry = `5`;
    secondHand.style.transformOrigin = `50% 90% 0`;
    secondHand.setAttribute('x', `${text/2-text/2/coefWidthSecond}`);
    secondHand.setAttribute('y', `${text/2-text*coefHeightSecond+text*coefHeightSecond*coefClockHands}`);
     
    const minuteHand = document.createElementNS(svgns, "rect");
    svg[0].appendChild(minuteHand);

    minuteHand.style.width = `${text/coefWidthMinute}px`;
    minuteHand.style.height = `${text*coefHeightMinute}px`; 
    minuteHand.style.rx = `15`;
    minuteHand.style.ry = `5`;
    minuteHand.style.transformOrigin = `50% 90% 0`;
    minuteHand.setAttribute('x', `${text/2-text/2/coefWidthMinute}`);
    minuteHand.setAttribute('y', `${text/2-text*coefHeightMinute+text*coefHeightMinute*coefClockHands}`);

    const hourHand = document.createElementNS(svgns, "rect");
    svg[0].appendChild(hourHand);

    hourHand.style.width = `${text/coefWidthHour}px`;
    hourHand.style.height = `${text*coefHeightHour}px`; 
    hourHand.style.rx = `15`;
    hourHand.style.ry = `5`;
    hourHand.style.transformOrigin = `50% 90% 0`;
    hourHand.setAttribute('x', `${text/2-text/2/coefWidthHour}`);
    hourHand.setAttribute('y', `${text/2-text*coefHeightHour+text*coefHeightHour*coefClockHands}`);

    setInterval(updateTime,1000);

    function updateTime() {

        const newDate = new Date();
        const newDateStr = formatDateTime(newDate);
        console.log (newDateStr);
        const date = document.createElementNS(svgns, "text");
        svg[0].appendChild(date);

        date.textContent = newDateStr;
        date.style.fontSize = `${text/coefFontSize}px`;
        date.setAttribute ('x', `${text/2}px`);
        date.setAttribute ('y', `${text/4}px`);
        date.style.textAnchor = `middle`;
        
        function formatDateTime(dt) {

            const hours=dt.getHours();
            const minutes=dt.getMinutes();
            const seconds=dt.getSeconds();
            return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
        }

        function str0l(val,len) {
            let strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        }

        moveSecond ();

        if (newDate.getSeconds() === 0) {
            
            moveMinute ();
        }

        if (newDate.getMinutes()%12 === 0 && newDate.getSeconds() === 0) { /*часовая стрелка проходит одно деление за 12 минут(60/5)*/

            moveHour ();
        }
    }

    function moveSecond () {

    const degrees = (new Date().setMilliseconds(0) - startDate)/1000*coefDegrees; 
    secondHand.style.transform = `rotate(${degrees}deg)`;
    } 

    function moveMinute () {

        const degrees = (new Date().setMilliseconds(0) - startDate)/60000*coefDegrees; /*в минуте 60000 миллисекунд*/
        minuteHand.style.transform = `rotate(${degrees}deg)`;
    } 

    function moveHour () {

        const degrees = (new Date().setMilliseconds(0) - startDate)/720000*coefDegrees; /*часовая стрелка проходит одно деление за 12 минут(60/5), в них 720000 миллисекунд(12*60000)*/
        hourHand.style.transform = `rotate(${degrees}deg)`;
    }

    updateTime();
    moveSecond();
    moveMinute();
    moveHour();
}