const button = document.getElementById('button');
button.addEventListener("click", showClock);

const coefWidthHour = 25; /* ширина часовой стрелки 1/25 диаметра циферблата*/
const coefWidthMinute = 35; /* ширина минутной стрелки 1/35 диаметра циферблата*/
const coefWidthSecond = 50; /* ширина секундной стрелки 1/50 диаметра циферблата*/
const coefHeightHour = 0.25; /* длина часовой стрелки 25% диаметра циферблата*/
const coefHeightMinute = 0.3; /* длина минутной стрелки 30% диаметра циферблата*/
const coefHeightSecond = 0.45; /* длина секундной стрелки 45% диаметра циферблата*/
const coefFontSize = 12; /* размер шрифта в 12 раз меньше размера диаметра циферблата*/
const coefHourCircle = 10; /* диаметр цифр в 10 раз меньше даиметра циферблата*/
const coefDegrees = 6; /* градусов на одном делении циферблата, 360/60*/ 
const coefClockHands = 0.1; /*короткий край стрелки 10% ее длины*/
const angl = 30; /*угол в одном часе 360/12, расстояние между цифрами*/

let startDate = new Date ();
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);
startDate.setMilliseconds(0);

function showClock() {

    const text = document.getElementById('text').value;
    const inputs = document.getElementById('input');
    const clockFace = document.getElementById('clock_face');
    const clockHands = document.getElementsByClassName('clock_hands')
    const hourHand = document.getElementById('hour_hand');
    const minuteHand = document.getElementById('minute_hand');
    const secondHand = document.getElementById('second_hand');

    inputs.style.display = "none";
    clockFace.style.cssText = `background: #d5c06d; border-radius: 50%; width: ${text}px; height: ${text}px; `;
    hourHand.style.width = `${text/coefWidthHour}px`; 
    hourHand.style.height = `${text*coefHeightHour}px`;
    minuteHand.style.width = `${text/coefWidthMinute}px`; 
    minuteHand.style.height = `${text*coefHeightMinute}px`; 
    secondHand.style.width = `${text/coefWidthSecond}px`; 
    secondHand.style.height = `${text*coefHeightSecond}px`; 
    
    for(let i = 0; i < clockHands.length; i++) {

        clockHands[i].style.background = `black`;
        clockHands[i].style.borderRadius = `50px`;
        clockHands[i].style.position = `absolute`;
        clockHands[i].style.left = `${clockFace.offsetWidth/2+clockFace.offsetLeft-clockHands[i].offsetWidth/2}px`;
        clockHands[i].style.top = `${clockFace.offsetHeight/2+clockFace.offsetTop-clockHands[i].offsetHeight+clockHands[i].offsetHeight*coefClockHands}px`; 
        clockHands[i].style.transformOrigin = `50% 90% 0`;
        clockHands[i].style.zIndex = `2`;
    }

    let hourPosition = 0;

    for(let i = 12; i > 0; i--) { /*на циферблате 12 часов*/

        const hour = document.createElement('div');
        const span = document.createElement('span');

        span.innerText = `${i}`;
        hour.appendChild(span);
        clockFace.appendChild(hour);

        hour.style.background = `#3f9e3f`;
        hour.style.color = `black`;
        hour.style.textAlign = `center`;
        hour.style.fontSize = `${text/coefFontSize}px`; 
        hour.style.borderRadius = `50%`;
        hour.style.width = `${text/coefHourCircle}px`; 
        hour.style.height = `${text/coefHourCircle}px`;
        hour.style.position = `absolute`;

        const clockFaceCenterX = clockFace.offsetLeft+clockFace.offsetWidth/2;
        const clockFaceCenterY = clockFace.offsetTop+clockFace.offsetHeight/2;

        const hourCenterX = clockFaceCenterX+text/2*0.8*Math.sin(hourPosition/180*Math.PI);
        const hourCenterY = clockFaceCenterY-text/2*0.8*Math.cos(hourPosition/180*Math.PI);

        hour.style.left = Math.round(hourCenterX-hour.offsetWidth/2)+'px';
        hour.style.top = Math.round(hourCenterY-hour.offsetHeight/2)+'px';

        hourPosition += -angl;
    }

    setInterval(updateTime,1000);

    function updateTime() {

        const newDate = new Date();
        const newDateStr = formatDateTime(newDate);
        console.log (newDateStr);
        const date = document.getElementById('date');

        date.innerHTML = newDateStr;
        date.style.fontSize = `${text/coefFontSize}px`;
        date.style.position = `absolute`;
        date.style.left = `${clockFace.offsetWidth/2+clockFace.offsetLeft-date.offsetWidth/2}px`;
        date.style.top = `${clockFace.offsetHeight/4+clockFace.offsetTop-date.offsetHeight/2}px`;
        
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