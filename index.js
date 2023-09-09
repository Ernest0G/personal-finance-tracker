const fs = require('fs');
const os = require('os');
const path = require('path');

(async () => {
    const parameters = process.argv.splice(2);

    if (parameters.length > 3) {
        throw new Error('You made more than 3 entries for an expense. Make sure your entries follows the following format: name category cost')
    }

    const [name, category, cost] = parameters;
    const timestamp = new Date();
    const item = { name, category, cost, timestamp }

    const userHomeDirectory = os.homedir();
    const documentsFolderPath = path.join(userHomeDirectory, 'Documents');
    const ledgerFilePath = path.join(documentsFolderPath, 'GeneralLedger.json');
    const doesLedgerFileExist = fs.existsSync(ledgerFilePath);

    if (doesLedgerFileExist) {
        try {
            console.log('Expense successfully added to ledger.')
        } catch (error) {
            throw new Error('Could not create ledger file: ' + error.message)
        }
    } else {
        try {
            const items = [item]
            fs.writeFileSync(ledgerFilePath, JSON.stringify({ items }))
            console.log('Expense successfully added to new ledger.')
        } catch (error) {
            throw new Error('Could not create ledger file: ' + error.message)
        }

    }
})();
