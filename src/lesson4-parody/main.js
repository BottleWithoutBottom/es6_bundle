// Это базовый компонент, от которого будут наследоватсья все остальные компоненты
export class Parody {
    constructor(props) {
        if(typeof props !== 'object') {
            props = {};
        }
        this.props = props;

        this.isMounted = false;
        this.nodeTarget;
    }

    setState(newState) {
        Object.assign(this.state, newState)
        console.log(this.state)
        this.render();
    }

    initState(obj) {
        this.state = watchObj(obj, this.render.bind(this))
        console.log(this.state.products)
    }


    bindMountTarget(selector) {
        this.isMounted = true;
        this.nodeTarget = document.querySelector(selector);
        return this;
    }

    render(node) {
        if (this.isMounted) {
            this.nodeTarget.innerHTML = '';
            this.nodeTarget.appendChild(node);
        }
        return node;
    }

}

export function createNode(tagName, props) {
    let node = document.createElement(tagName);
    
    for (let name in props) {
        node[name] = props[name];
    }
    return node;
}
// Функция, реализующая JSX, позволяет писать ХТМЛ разметку в ее исходном виде внутри js;
export function dom(tag, props, ...children) {
    //проверяем поступающий tag на то, является ли он ХТМЛэлементом или же классом, т.е. функцией
    if(typeof tag == "function") {
        return (new tag(props).render());
    }

    let node = document.createElement(tag);

    function checkChild(child) {
        if (child instanceof HTMLElement) {
            node.append(child)
        } else if(typeof child === "object") {
            for (let ch of child) {
                checkChild(ch)
            }
        } else {
            let nodeText = document.createTextNode(child);
            node.append(nodeText)
        }
    }


    children.forEach(checkChild) 
    //привязывает аттрибуты к каждому тегу
    Object.assign(node, props);
    return node;
}

function watchObj(obj, callback) {
    //Создать список функций, которые будут реактивными, и не будут возвращаться с правильным контекстом
    let reactiveFunctions = {
        push: true,
        pop: true,
        splice: true,
        slice: true,
        shift: true,
        unshift: true,
        sort: true,
    }
    return new Proxy (obj, {
        //target в данном случае - это obj
        set (target, name, value) {
            target[name] = value;

            callback(name, value)
            return true;
        },

        get(target, name) {
            if (typeof target[name] === "function") {
                if (name in reactiveFunctions) {
                    //Если функция входит в список функций для изменения текущего массива, то нужно
                    //Ее выполнить и заставить компонент ререндериться
                    return function(...args) {
                        let res = target[name].apply(target, args);
                        //где коллбек - this.render()
                        callback();
                        return res;
                    }
                } else {
                    return target[name].bind(target);
                }
            } else {
                return watchObj(target[name], callback);
            }
        }
    })
}