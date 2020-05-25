function regUser() {

    return new Promise(function(resolve,reject) {
        setTimeout(()=> {
            let num = Math.random();
            num > 0.5 ? resolve({msg: 'good', id: 1}) : reject(`reg hasn't happened`);
        }, 500)
    })
}

function authUser(id) {
    return new Promise(function (resolve, reject) {
        setTimeout(()=> {
            let num = Math.random();
            num > 0.5 ? resolve({msg: 'good', token: 12322123123}) : reject(`Wrong auth info!`)
        }, 500)
    })
}

function getUserData(token) {
    return new Promise(function(resolve,reject) {
        setTimeout(()=> {
            let num = Math.random();
            num > 0.5 ? resolve({name: 'Jack', age: 35, msg: 'You got this!'}) : reject({msg: 'what the??....'})
        })
    })
}


function TIMEOUT_PROMISE(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve,time);
    });
}
export {regUser, authUser, getUserData}

