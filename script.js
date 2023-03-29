let myCat = {
    name: 'Spoon',
    age: 3,
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e85429118480783.6089d0a6a636e.jpeg',
    favorite: false
}

let myCat2 = {
    name: 'Slime',
    age: 1,    
    favorite: true
}

const box = document.querySelector('.container');

/* начало создания карточки, код универсальный, меняется только обЬект*/
function createCard(cat, el = box) { /* чтобы функция заработала передать аргументы, второй из которых родительский элемент */
    /* создание обычной карточки через жс */
    /* все cat вместо myCat */
    const card = document.createElement('div');
    card.className = 'card';
    if (!cat.image) {
        card.classList.add('defoult');
        } else {
            card.style.backgroundImage = `url(${cat.image})`
        }; /* если нет фото - алтернатива или фото */
    const name = document.createElement('h3');
    name.innerText = cat.name;
    const like = document.createElement('i');
    like.className = 'fa-heart card__like';
    like.classList.add(cat.favorite ? 'fa-solid' : 'fa-regular'); /* закрашивание сердечка при нажатии */
    card.append(like, name);
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

fetch(path + '/show')
.then(function(res) {
    console.log(res);
    if (res.statusText === 'OK') {
        return res.json() /* все методы респонс возвращают промис */
    }
})
.then(function(data) { /* data ответ сервера */
console.log(data.length);
    for (let c of data) {
        createCard(c);
    }
})

/* создание функции добавления и удаления кота через форму */
function addCat(cat) {

}
