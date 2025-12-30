const fs = require('fs');

const readFile = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./user.txt", 'utf8', (err, data) => {
            if (err) { return reject(err) }
            const tempArr = data.split(" ");
            resolve({ userCode: tempArr[1], passCode: tempArr[3] });
        });
    });
}

const writeFile = async (newPassword) => {
    const newText = `userCode admin passCode ${newPassword}`
    fs.writeFileSync("./user.txt", newText, err => {
        if (err) {
            return console.error(err)
        }
    })
}

module.exports = { readFile, writeFile }