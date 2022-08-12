var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];

function dynForm (arr) {

  let body = document.getElementById('body');

  let form = document.createElement('form');

  form.action = "https://fe.it-academy.by/TestForm.php";
  form.method = "post";

  let label;

  function addElement (tagName, item) {

    let div = document.createElement ('div');
    form.appendChild(div);

    label = document.createElement ('label');
    div.appendChild(label);

    let tag = document.createElement (tagName);
    div.appendChild(tag);

    label.htmlFor = `${item.name}`;
    tag.id = `${item.name}`;
    tag.name = `${item.name}`;

    label.textContent = `${item.label}`;
    div.style.cssText = "margin-bottom: 5px";
    form.style.cssText = "border-top: solid 1px; margin: 5px 0";
    
    return tag;
  };

  for (let i = 0; i < arr.length; i++) {

    if (arr[i].kind === 'longtext') {

      let input = addElement('input', arr[i]);

      input.style.cssText = "width: 100%";
    };

    if (arr[i].kind === "number") {

      let input = addElement('input', arr[i]);

      input.type = "number";
    };

    if (arr[i].kind === "shorttext") {

      addElement('input', arr[i]);
    };

    if (arr[i].kind === 'combo') {

      let select = addElement('select', arr[i]);

      for (let j = 0; j < arr[i].variants.length; j++) {

        let option = document.createElement ('option');
        select.appendChild(option);

        option.value = `${arr[i].variants[j].value}`;
        option.innerText = `${arr[i].variants[j].text}`;
      };
    };

    if (arr[i].kind === 'radio') {

      let p = document.createElement ('p');
      form.appendChild(p);
      p.innerText = `${arr[i].label}`

      for (let j = 0; j < arr[i].variants.length; j++) {

        let input = addElement('input', arr[i]);

        input.type = 'radio';
        input.value = `${arr[i].variants[j].value}`;

        label.innerText = `${arr[i].variants[j].text}`;
      };
    };

    if (arr[i].kind === 'check') {

      let input = addElement('input', arr[i]);

      input.type = 'checkbox';
    };

    if (arr[i].kind === 'memo') {

      let textArea = addElement('textArea', arr[i]);

      textArea.style.cssText = "width: 100%";
    };

    if (arr[i].kind === 'submit') {

      let input = document.createElement ('input');
      form.appendChild(input);

      input.type = `${arr[i].kind}`;
      input.value = `${arr[i].caption}`;
    };
  };

  body.appendChild(form);
};

dynForm(formDef1);
dynForm(formDef2);