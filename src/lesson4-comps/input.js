import {Parody, createNode, dom} from '../lesson4-parody/main.js';

export default class InputNumber extends Parody {
    constructor(props) {
        super(props);

        this.onChange = ('change' in props) ? props.change : function(val) {};
    }

    _borderValue(val) {
        let correctVal = parseInt(val);
        if (isNaN(correctVal) || correctVal < this.props.min) {
            correctVal = this.props.min
        } else if(correctVal > this.props.max) {
            correctVal = this.props.max
        }

        this.onChange(correctVal);
    }

    render() {
        let num = document.createElement('input');
        num.className = 'num_value';
        num.setAttribute('type', 'text');
        num.value = this.props.value;
        num.addEventListener('change', (e) => {
            this._borderValue(e.target.value)
        });

        let butPlus = document.createElement('input');
        butPlus.setAttribute('type', 'button');
        butPlus.value = '+';
        butPlus.addEventListener('click', () => {
            this._borderValue(this.props.value + 1)
        })

        let butMinus = document.createElement('input');
        butMinus.setAttribute('type', 'button');
        butMinus.value = '-';
        butMinus.addEventListener('click', () => {
            this._borderValue(this.props.value - 1)
        });

        let textarea = createNode('textarea', {
            className: 'textPlus',
            onclick: () => {
                this._borderValue(this.props.value + 1)
                console.log('yeah')
            },

        })

 

        let form = document.createElement('div');
        form.appendChild(butMinus)
        form.appendChild(num)
        form.appendChild(butPlus);
        form.appendChild(textarea);



        return super.render(
            <div className="inputs">
                <input type="button" value="+" onclick={(() => {
                    this._borderValue(this.props.value + 1)
                })} />
                <input type="text" value={this.props.value} />
                <input type="button" value="-" onclick={(() => {
                    this._borderValue(this.props.value - 1)
                })} />

            </div>
        );
    }
}