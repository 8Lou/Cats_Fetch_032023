/* создание объекта вместо тегов*/
let myCat = {
    name: 'Spoon',
    age: 3,
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e85429118480783.6089d0a6a636e.jpeg',
    favorite: false
}

let myCat2 = {
    name: 'Хрюндель',
    age: 1,    
    favorite: true
}

/* создание контейнера */
const box = document.querySelector('.container');

/* начало создания карточки, код универсальный, меняется только обЬект*/
function createCard(cat, el = box) { /* чтобы функция заработала передать аргументы, второй из которых родительский элемент */
    /* создание обычной карточки через жс */
    /* все myCat заменены cat */
    const card = document.createElement('div');
    card.className = 'card';

    if (!cat.image) {
        card.classList.add('defoult');
        } else {
            card.style.backgroundImage = `url(${cat.image})`
        }; /* если нет фото - алтернатива или фото */

    const name = document.createElement('h3');
    name.innerText = cat.name; /* добавить имя кота */
    const like = document.createElement('i');
    like.className = 'fa-heart card__like'; /* сердечко-лайк */
    like.classList.add(cat.favorite ? 'fa-solid' : 'fa-regular'); /* заливка цветом при нажатии */
    like.addEventListener("click", e => { /* обработка нажатия на сердечко-лайк */
        e.stopPropagation(); /* остановить удаление карточек при нажатии */
        if (cat.id) {
            fetch(`${path}/update/${cat.id}`, { /* логика но с интерполяцией */
                method: "PUT", /* изменить/обновить данные */
                headers: {
                    "Content-Type": "application/json" /* ЗАПОМНИТЬ эту комбинацию! */
                },
                body: JSON.stringify({ favorite: !cat.favorite }) /* если было true - станет false и наоборот */
            })
                .then(res => {
                    if (res.status === 200) {
                        like.classList.toggle("fa-solid");
                        like.classList.toggle("fa-regular");
                    }
                })
        }
    })


    card.append(like, name); /* добавление карточки с атрибутами */
    
    if (cat.age >= 0) {
        const age = document.createElement('span');
        age.innerText = cat.age;
        card.append(age);
    }
    el.append(card); /* box заменили на el */
}

/* проверка и вызов функций и передача аргумента */
createCard(myCat);
createCard(myCat2)

/* использование промисов
создание юзера */
const user = '8Lou';
const path = `https://cats.petiteweb.dev/api/single/${user}`;

/* AJAX (отправить запрос на сарвер без перезагрузки страницы. Фитч заменил старый xhr - XMLHttpRequest / axios),
Async, JavaScript, XTML - асинхронные запросы */

fetch(path + "/show")
    .then(function (res) {
        console.log(res);
        if (res.statusText === "OK") {
            /*
                Все методы res (респонс) возвращают Promise
                res.text() => возвращает текстовое содержимое (HTML-файл)
                res.blob() => возвращает двоичный код (бинарный формат данных) 10 => 00001010 => 0a => файлы (картинки / файл)
                res.json() => отображает данные в ввиде объекта
            */
            return res.json();
        }
    })
    .then(function (data) {
        // data - отввет от сервера
        // console.log(data);
        for (let c of data) {
            createCard(c, box);
        }
    }) 
/*
request fetch:
    1) path - путь запроса
    2) http-заголовки - объект со всеми параметрами запроса (method, headers, body - то что отправляется на сервер (данные))

    Из объекта в строку
    JSON.stringify(obj) <> {a: 123} => '{"a": 123}' 
    Из стргоки в объект
    JSON.parse(str) <> '{"a": 123}'=> {a: 123}
*/
let ids = [];
fetch(path + "/ids")  /* собрать все id */
    .then(res => res.json())
    .then(data => {
        console.log(data);
        ids = [...data]; /* все id */
        myCat.id = ids.length ? ids[ids.length - 1] + 1 : 1; /* последний id увеличить на 1 */
        // myCat.id = 7;
        // addCat(myCat); /* добавить последующий порядковый номер*/
    })
/* создание функции добавления и удаления кота через форму */
function addCat(cat) {
    fetch(path + "/add", { /* запрос на сервер */
        method: "POST", // та же логика прописывается к put и patch-запросам
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}


