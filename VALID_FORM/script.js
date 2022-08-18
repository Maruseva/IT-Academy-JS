const formInfo = document.forms.info;
formInfo.addEventListener('submit',validateInfoForm);

function changeStyle (elementsName, styleValue) {

    return elementsName.nextSibling.style.cssText = "display: " + styleValue;
}

// Поле разработчики не должно содержать цифры
const dev = formInfo.elements.developers;
dev.addEventListener('blur', handleDev);

function handleDev (event) {

    devValid(event.target.value);
};

function devValid(devValue) {
    
    for (let i = 0; i <= devValue.length; i++) {

        if ((isNaN(Number(devValue[i])) === false) || (devValue === "")) {

            return changeStyle(dev, "inline");
        };
    };

    changeStyle(dev, "none");
    return true;
};

// Назавание сайта не должно превышать 20 символов
const title = formInfo.elements.title;
title.addEventListener('blur', handleTitle);

function handleTitle (event) {

    titleValid(event.target.value);
};

function titleValid (titleValue) {
    
    if ((titleValue.length > 20) || (titleValue.length === 0) ) {

        return changeStyle(title, "inline");
    };

    changeStyle(title, "none");
    return true;
};

// Доменное имя сайта должно заканчиваться на .com
const url = formInfo.elements.url;
url.addEventListener('blur', handleUrl);

function handleUrl(event) {

    urlValid(event.target.value);
};

function urlValid (urlValue) {

    urlValue = urlValue.trim();

    if (urlValue.length - (urlValue.lastIndexOf(".com")) !== 4) {

        return changeStyle(url, "inline");
    };

    changeStyle(url, "none");
    return true;
};

// Дата запуска не должна быть ранее 01.01.2020
const date = formInfo.elements.date;
date.addEventListener('blur', handleDate);

function handleDate (event) {

    dateValid(event.target.value);
};

function dateValid(dateValue) {

    dateValue = dateValue.split("-");

    if (Number(dateValue[0]) < 2020) {

        return changeStyle(date, "inline");
    };

    changeStyle(date, "none");
    return true;
};

//Посетителей должно быть минимум 20
const visitors = formInfo.elements.visitors;
visitors.addEventListener('blur', handleVisitors);

function handleVisitors (event) {

    visitorsValid (event.target.value);
};

function visitorsValid(visitorsValue) {

    if (visitorsValue < 20) {

        return changeStyle(visitors, "inline");
    };

    changeStyle(visitors, "none");
    return true;
};

// Поле должно содержать @
const mail = formInfo.elements.mail;
mail.addEventListener('blur', handleMail);

function handleMail (event) {

    mailValid (event.target.value);
};

function mailValid (mailValue) {

    if (!(mailValue.includes("@"))) {

        return changeStyle(mail, "inline");
    };

    changeStyle(mail, "none");
    return true;
};

// Рубрика "домашний уют" недоступна
const heading = formInfo.elements.heading;
heading.addEventListener('change', handleHeading);

function handleHeading (event) {

    headingValid (event.target.value);
};

function headingValid (headingValue) {

    if ((headingValue === "2") || (headingValue === "1")) {

        return changeStyle(heading, "inline");
    };

    changeStyle(heading, "none");
    return true;
};

// Вариант "бесплатное" недоступен
const accommodation = document.getElementById('radioAccommodation');
accommodation.addEventListener('click', handleAccommodation);

function handleAccommodation (event) {

    accommodationValid (event.target.value);
};

function accommodationValid(accommodationValue) {

    if ((accommodationValue === "1") || accommodationValue === "") {

        return changeStyle(accommodation.nextSibling, "inline");
    };

    changeStyle(accommodation.nextSibling, "none");
    return true;
};

// Необходимо разрешить отзывы
const reviews = formInfo.elements.reviews;
reviews.addEventListener('click', handleReviews);

function handleReviews (event) {

    reviewsValid (event.target.value);
};

function reviewsValid (reviewsValue) {

    reviewsValue = reviews.checked;

    if (reviewsValue === false) {

        return changeStyle(reviews, "inline");
    };

    changeStyle(reviews, "none");
    return true;
};

// Минимум 20 символов
const description = formInfo.elements.description;
description.addEventListener('blur', handleDescription);

function handleDescription (event) {

    descriptionValid (event.target.value);
};

function descriptionValid (descriptionValue) {
   
    if (descriptionValue.length < 20) {

        return changeStyle(description, "inline");
    };

    changeStyle(description, "none");
    return true;
};

function validateInfoForm(event) {

    try { 
        if (descriptionValid(event.target.description.value) !== true) {

            event.preventDefault();
            event.target.description.focus();
        };

        if (reviewsValid(event.target.reviews.value) !== true) {

            event.preventDefault();
            event.target.reviews.focus();
        };

        if (accommodationValid(event.target.accommodation.value) !== true) {

            event.preventDefault();
            document.getElementById("free").scrollIntoView();
        };

        if (headingValid(event.target.heading.value) !== true) {

            event.preventDefault();
            event.target.heading.focus();
        };

        if (mailValid(event.target.mail.value) !== true) {

            event.preventDefault();
            event.target.mail.focus();
        };

        if (visitorsValid(event.target.visitors.value) !== true) {

            event.preventDefault();
            event.target.visitors.focus();
        };

        if (dateValid(event.target.date.value) !== true) {

            event.preventDefault();
            event.target.date.focus();
        };

        if (urlValid(event.target.url.value) !== true) {

            event.preventDefault();
            event.target.url.focus();
        };

        if (titleValid(event.target.title.value) !== true) {

            event.preventDefault();
            event.target.title.focus();
        };

        if (devValid(event.target.developers.value) !== true) {

            event.preventDefault();
            event.target.developers.focus();
        };
    }

    catch(ex) {

        alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
        event.preventDefault();
    };
};