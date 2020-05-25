let articlesStorage = [
    {
        id: 1,
        title: 'Профисификация кода',
        dt: '2018-12-06',
        text: 'Код без промисов бывает жестью, но и с ними можно изобразить много странного.'
    },
    {
        id: 2,
        title: 'Итераторы и генераторы',
        dt: '2018-12-01',
        text: 'Сначала пугают всех, кто к ним прикасается, а Symbol кажется бредом.'
    },
    {
        id: 5,
        title: 'Javascript',
        dt: '2018-12-02',
        text: 'Всё равно хороший язык программирования.'
    }
];

let mapArticles = {};

articlesStorage.forEach((item, i) => {
    mapArticles[item.id] = i;
});

/* --------------------------------------------------- */

const GLOBAL_PROBABILITY = 1;
const BAD_JSON_PROBABILITY = 0.5;

/* --------------------------------------------------- */

export function getAllArticles() {
    return new Promise((resolve, reject) => {
        let num = Math.random();
        num < GLOBAL_PROBABILITY ? resolve(serverAnswer(articlesStorage)) : reject(serverAnswer('unknown error: lvl 1'));
    })
}

export function getOneArticle(id) {
    return new Promise((resolve, reject) => {
        let num = Math.random();
        num < GLOBAL_PROBABILITY ? resolve(serverAnswer(articlesStorage[mapArticles[id]])) : reject(serverAnswer('unknown error: lvl 2'))
    })
}

export function removeArticle(id) {
    return new Promise((resolve, reject) => {
        let num = Math.random();
        if (num < GLOBAL_PROBABILITY) {
            resolve(function() {
                if (id in mapArticles) {
                    let articleNumber = mapArticles[id];
                    delete mapArticles[id];
                    articlesStorage.splice(articleNumber, 1);
                    serverAnswer(true);
                    return articlesStorage;
                } else {
                    return false;
                }
            })

        } else {
            reject(function() {
                serverAnswer('', 228, 'removing probability error')
            })
        }
    })
}

/* ---------------------------------------------------- */

function serverAnswer(data, code = 200, status = 'ok') {
    if (Math.random() < BAD_JSON_PROBABILITY) {
        return 'incorrect JSON answer';
    }
    return JSON.stringify({code, status, data})
}

/* АЛЬТЕРНАТИВНЫЙ И ПРОДВИНУТЫЙ ВАРИАНТ НА ФУНКЦИИ TIMEOUTPROBABILITY */

function timeOutProbability(time, probability) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let prob = Math.random();
            prob < probability ? resolve() : reject({message: 'probability error'});
        }, time)
    })
}

// функция таймАутПробабилити позволяет не составлять коллбек каждый раз в каждой функции

export function getAllArticlesAdv() {
    return timeOutProbability(300, GLOBAL_PROBABILITY).then(() => {
        return serverAnswer(articlesStorage)
    });
}

export function getOneArticleAdv(id) {
    return timeOutProbability(300, GLOBAL_PROBABILITY).then(() => {
        return serverAnswer(articlesStorage[mapArticles[id]]);
    })
}

export function removeArticleAdv(id) {
    return timeOutProbability(300, GLOBAL_PROBABILITY).then(() => {
        if (id in mapArticles) {
            let articleNumber = mapArticles[id];
            delete mapArticles[id];
            articlesStorage.splice(articleNumber, 1);
            return serverAnswer(true)
        } else {
            return false;
        }
    })
}
