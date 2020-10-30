function perform(anyMehotd, wrappers) {
    return function () {
        wrappers.forEach(wrapper => wrapper.initial());
        anyMehotd();
        wrappers.forEach(wrapper => wrapper.close());
    }
}

let newFn = perform(() => {
    console.log('say')
}, [
    {
        initial() {
            console.log('wrapper1 initial')
        },
        close() {
            console.log('wrapper1 close')
        }   
    },
    {
        initial() {
            console.log('wrapper2 initial')
        },
        close() {
            console.log('wrapper2 close')
        }   
    }
])

newFn()