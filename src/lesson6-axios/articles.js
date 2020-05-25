import { get } from "https";
import server from './server.js';

export async function getAll() {
    // axios возвращает полный ответ, у которого есть поле data, следовательно возвращать нужно не data, а response.data
    let response = await server.get('/js-frontend-api/articles.php');
    return response.data; 
}

export async function getOne(id) {
    let data = await getResponse(`/js-frontend-api/articles.php?${id}`);
    return data; 
}

export async function remove(id) {
    // let response = await server.delete(`/js-frontend-api/articles.php`, {
    //     params: {id}
    // })
}

export async function addFormData(articleFields = {}) {
    let requestBody = new FormData();

    for (let key in articleFields) {
        requestBody.append(key, articleFields[key])
    }

    // Для того, чтобы добавлять какие-либо данные на сервер, нужно уточнить, какие данные сервер хочет принять:
    //  либо через PUT в формате JSON
    //  либо через POST в формате formData

    let data = await getResponse(`/js-frontend-api/articles.php`, {
        method: 'POST',
        // Нужно передать полученные данные в формате FormData в тело запроса post
        body: requestBody
    });

    return data;
}

export async function editDataJSON(id, articleFields = {}) {
    let forServer = {
        ...articleFields,
        id
    }
    let data = await getResponse(`/js-frontend-api/articles.php`, {
        method: 'PUT',
        body: JSON.stringify(forServer)
    });

    return data;
}

//Вспомогательная функция для работы с ответами, которая принимает столько же параметров, сколько и fetch(2)
//Она будет выполнять всю цепочку развертывания промисов в данные: fetch = promise -> response.json = promise -> data = promise

function getResponse(url, options = {}) {
    return fetch(url, options).then((response) => {

        if(response.status !== 200) {
            return response.text().then((text) => {
                throw new Error(text)
            })
        }
        return response.json()
    })
}

