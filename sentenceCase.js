// Primera letra mayúscula, resto minúsculas

const word = 'pAlAbRa'

const sentenceCase = (sentence) => {
    let temp = [sentence.toLowerCase()]
    let result = []
    for (let i = 0; i < temp.length; i++) {
        result.push(temp[i][0].toUpperCase() + temp[i].slice(1))
    }
    return result.join(' ')
}

console.log(sentenceCase(word))