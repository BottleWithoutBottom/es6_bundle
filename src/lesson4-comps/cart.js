import {Parody, dom} from '../lesson4-parody/main.js';
import InputNumber from './input.js';

export default class Cart extends Parody {
    constructor(props) {
        super(props);

        this.initState({
            products: [
                {price: 2000, max: 12, current: 1},
                {price: 3200, max: 20, current: 4}
            ]
        })
    }

    checkChanges(ind,val) {
        this.state.products[ind].current = val
        this.render()
    }

    // Для того, чтобы в react-подобной пародии обновить хтмл ветвь, нужно обновить обьект this.state.
    // Это делается при помощи ФИЗИЧЕСКОГО копирования уже существующего массива и добавления к нему обьекта
    addField = () => {
        this.state.products.push({
            price: 200,
            max: 20,
            current: 5
        })
        console.log(this.state.products)
        /*
        let products = [...this.state.products, {
            price: 300,
            max: 10,
            current: 1
        }];
        this.setState({products})
        */
    }

    removeField(index) {
        this.state.products.splice(index, 1)
        /*
        let products = [...this.state.products];
        products.splice(index,1);
        this.setState({products})
        */
    }


            //JSX позволяет использовать обьекты в качестве тегов
            //для этого нужно прописывать в качестве аттрибутов свойства документа
    render() {

        let summar = this.state.products.reduce((total, item) => {return total + (item.price * item.current)}, 0);

        let inputs = this.state.products.map((item, i) => {

            return <div>
                        <InputNumber min={1} max={item.max} value={item.current}
                                change={this.checkChanges.bind(this,i)}/>
                        <input type="button" value="X" onclick={this.removeField.bind(this, i)} />
                    </div>
        })
        return super.render(
        <div>   
            {inputs}
            <hr/>
            <input type="button" onclick={this.addField} value="+" />
            <hr/>
            <div>{summar}</div>

        </div>
        );
    }
}
