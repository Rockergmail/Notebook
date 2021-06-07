/*
Lion interface :

roar()
*/

class AfricanLion {
    roar() { }
}

class AsianLion {
    roar() { }
}

class Hunter {
    hunt(lion) {
        // ... some code before
        lion.roar()
        //... some code after
    }
}

// This needs to be added to the game
// Adaptee
class WildDog {
    bark() {
    }
}

// Adapter around wild dog to make it compatible with our game
// Adapter
class WildDogAdapter {

    constructor(dog) {
        this.dog = dog;
    }

    roar() {
        this.dog.bark();
    }
}

wildDog = new WildDog()
wildDogAdapter = new WildDogAdapter(wildDog)

hunter = new Hunter()
hunter.hunt(wildDogAdapter)