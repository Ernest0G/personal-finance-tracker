const fs = require('fs');
const os = require('os');
const path = require('path');

const flags = process.argv.splice(2);

const userHomeDirectory = os.homedir();
const documentsFolderPath = path.join(userHomeDirectory, 'Documents');
const ledgerFilePath = path.join(documentsFolderPath, 'GeneralLedger.json');
const doesLedgerFileExist = fs.existsSync(ledgerFilePath);

if (doesLedgerFileExist) {
    const items = JSON.parse(fs.readFileSync(ledgerFilePath)).items;
    if (flags.length > 0) {

    } else {
        console.table(items)
    }
} else {
    throw new Error('Could not find ledger file.');
}
