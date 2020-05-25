import "@babel/polyfill";
import "regenerator-runtime/runtime";
import * as model from './articles.js';

async function testArticles() {
    let articles = await model.getAll();


    let ind = Math.floor(Math.random() * articles.length);
    let firstId = articles[ind].id;

    let article = await model.getOne(firstId);
    console.log(article)

    let remove = await model.remove(firstId);
    console.log('что с удалением?' + remove);

    let articlesRefreshed = await model.getAll();


    // let addRes = await model.addFormData({
    //     title: 'another one article',
    //     content: 'ESSKETTIT'
    // })
    // console.log(addRes)

    let ind2 = Math.floor(Math.random() * articlesRefreshed.length);
    let newId = articlesRefreshed[ind2].id;

    let secArticle = articlesRefreshed[ind2];
    console.log(secArticle);
    console.log(ind2, newId);

    let editedArticle = await model.editDataJSON(secArticle.id, {
        title: '123',
        content: '321'
    })

    let articlesRefreshed2 = await model.getAll();
    console.log(articlesRefreshed2)

}

testArticles();
