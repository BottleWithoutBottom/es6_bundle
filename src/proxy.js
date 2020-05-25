export default function watchNode(node, callback) {
    return new Proxy (node, {
        set (target, name, value) {
            target[name] = value;
            callback(name, value)
            return true;
        },

        get(target, name) {
            switch (typeof target[name]) {
                case 'object':
                return watchNode(target[name], callback);

                default: 
                return target[name]
            }

        }
    })
}