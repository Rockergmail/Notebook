function after(times, callback) {
    return () => {
        if (--times === 0) {
            callback();
        }
    }
}

let newFn = after(3, () => {
    console.log('say');
})

newFn()
newFn()
newFn()
newFn()