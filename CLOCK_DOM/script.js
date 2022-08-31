const button = document.getElementById('button');
button.addEventListener("click", showClock);

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
    hourHand.style.width = `${text/25}px`; /* ширина часовой стрелки 1/25 диаметра циферблата*/
    hourHand.style.height = `${text/2*0.5}px`; /* длина часовой стрелки 50% радиуса циферблата*/
    minuteHand.style.width = `${text/35}px`; /* ширина минутной стрелки 1/35 диаметра циферблата*/
    minuteHand.style.height = `${text/2*0.6}px`; /* длина минутной стрелки 60% радиуса циферблата*/
    secondHand.style.width = `${text/50}px`; /* ширина секундной стрелки 1/50 диаметра циферблата*/
    secondHand.style.height = `${text/2*0.9}px`; /* длина секундной стрелки 90% радиуса циферблата*/

    for(let i = 0; i < clockHands.length; i++) {

        clockHands[i].style.background = `black`;
        clockHands[i].style.borderRadius = `50px`;
        clockHands[i].style.position = `absolute`;
        clockHands[i].style.left = `${clockFace.offsetWidth/2+clockFace.offsetLeft-clockHands[i].offsetWidth/2}px`;
        clockHands[i].style.top = `${clockFace.offsetHeight/2-clockHands[i].offsetHeight+clockHands[i].offsetHeight*0.1}px`; /*короткий край стрелки 10% ее длины*/
        // clockHands[i].style.transform = `rotate(${360/60}deg)`; /*на циферблате 60 делений */
        // clockHands[i].style.transformOrigin = `50% 90% 0`;
        clockHands[i].style.zIndex = `2`;
    };

    for(let i = 12; i > 0; i--) { /*на циферблате 12 часов*/

        let hour = document.createElement('div');
        let span = document.createElement('span');

        span.innerText = `${i}`;
        hour.appendChild(span);

        

        hour.style.background = `#3f9e3f`;
        hour.style.color = `black`;
        hour.style.textAlign = `center`;
        hour.style.fontSize = `${text/12}px`; /* размер шрифта в 12 раз меньше размера диаметра циферблата*/
        hour.style.borderRadius = `50%`;
        hour.style.width = `${text/10}px`; /* диаметр цифр в 10 раз меньше даиметра циферблата*/
        hour.style.height = `${text/10}px`; /* диаметр цифр в 10 раз меньше даиметра циферблата*/
        hour.style.position = `absolute`;

        let left = `${clockFace.offsetWidth/2+clockFace.offsetLeft-hour.offsetWidth/2}px`;
        let top = `${text/12}px`;
        hour.style.left = `${left}`;
        hour.style.top = `${top}`;

        clockFace.appendChild(hour);
    };


    


}


