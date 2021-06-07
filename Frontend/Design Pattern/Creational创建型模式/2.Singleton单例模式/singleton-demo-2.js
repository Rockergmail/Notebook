const president = (function(){
    const presidentsPrivateInformation = 'Super private'

    const name = 'Turd Sandwich'

    const getName = () => name

    return {
        getName
    }
}())

president.getName() // Outputs 'Turd Sandwich'
president.name // Outputs undefined
president.presidentsPrivateInformation // Outputs undefined