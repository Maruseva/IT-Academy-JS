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
const coefHourPosition = 0.4 /* центр круга с цифрами распологается от центра циферблата на растоянии 40% диаметра циферблата*/
const angl = 30; /*угол в одном часе 360/12, расстояние между цифрами*/
const coefMinuts = 12; /*часовая стрелка проходит одно деление за 12 минут(60/5)*/

function showClock() {

    const diametr = document.getElementById('text').value;
    const radius = diametr/2;
    const inputs = document.getElementById('input');
    inputs.style.display = "none";

    setInterval(updateTime,1000);

    function updateTime() {

        const clockFace = document.getElementById('clock_face');
        const context = clockFace.getContext('2d');
        clockFace.setAttribute(`width`, `${diametr}`);
        clockFace.setAttribute(`height`, `${diametr}`);
        
        context.fillStyle='#d5c06d';
        context.beginPath();
        context.arc( diametr/2, diametr/2, radius, 0, 360, false);
        context.fill();

        let hourPosition = 0;

        for(let i = 12; i > 0; i--) { /*на циферблате 12 часов*/

            const hourCenterX = radius+diametr*coefHourPosition*Math.sin(hourPosition/180*Math.PI);
            const hourCenterY = radius-diametr*coefHourPosition*Math.cos(hourPosition/180*Math.PI);
   
            context.fillStyle='#3f9e3f';
            context.beginPath();
            context.arc( hourCenterX, hourCenterY, radius/coefHourCircle, 0, 360, false);
            context.fill();

            context.fillStyle = 'black';
            context.beginPath();
            context.font = `normal ${diametr/coefFontSize}px Arial`;
            context.fillText (i, hourCenterX, hourCenterY);
            context.textAlign = `center`;
            context.textBaseline = `middle`;

            hourPosition += -angl;
        }

        const newDate = new Date();
        const newDateStr = formatDateTime(newDate);
        console.log (newDateStr);
            
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

        context.fillStyle = 'black';
        context.beginPath();
        context.font = `normal ${diametr/coefFontSize}px Arial`;
        context.fillText (newDateStr, radius, radius/2);
        context.textAlign = `center`;
        context.textBaseline = `middle`;

        context.beginPath();
        context.lineWidth=diametr/coefWidthSecond;
        context.lineCap='round';
        context.moveTo(radius,radius-diametr*coefHeightSecond+diametr*coefHeightSecond*coefClockHands);
        context.lineTo(radius,radius+diametr*coefHeightSecond*coefClockHands);
        context.rotate(new Date().getSeconds()*coefDegrees/180*Math.PI);
        context.stroke();

        context.beginPath();
        context.lineWidth=diametr/coefWidthMinute;
        context.lineCap='round';
        context.translate(radius*(-1), radius*(-1));
        context.rotate(new Date().getMinutes()*coefDegrees/180*Math.PI);
        
        context.moveTo(radius,radius-diametr*coefHeightMinute+diametr*coefHeightMinute*coefClockHands);
        context.lineTo(radius,radius+diametr*coefHeightMinute*coefClockHands);
       
        context.stroke();


        context.beginPath();
        context.lineWidth=diametr/coefWidthHour;
        context.lineCap='round';
        context.moveTo(radius,radius-diametr*coefHeightHour+diametr*coefHeightHour*coefClockHands);
        context.lineTo(radius,radius+diametr*coefHeightHour*coefClockHands);
        context.translate(-radius, -radius);
        context.rotate((new Date().getHours()*angl+Math.floor(new Date().getMinutes()/coefMinuts)*coefDegrees)/180*Math.PI);
        context.stroke();

    }

    updateTime()
}