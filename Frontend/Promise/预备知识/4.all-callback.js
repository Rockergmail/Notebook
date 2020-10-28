function after (times, callback) {
    let data = {}
    return (key, value) => {
        data[key] = value;
        if (--times === 0) {
            callback(data);
        }
    }
}

let out = after(2, (result) => {
    console.log(result)
})

const fs = require('fs');
const path = require('path');
fs.readFile(path.resolve(__dirname, './1.txt'), 'utf8', (error, result) => {
    if (error) {
        console.log(error)
        return;
    }
    out('one', result)
})

fs.readFile(path.resolve(__dirname, './2.txt'), 'utf8', (error, result) => {
    if (error) {
        console.log(error)
        return;
    }
    out('two', result)
})