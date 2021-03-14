import TestWeave from 'testweave-sdk';
import Arweave from 'arweave';
const fs = require('fs');

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
});

async function main() {
  const testWeave = await TestWeave.init(arweave);
  console.log("Root JWK", await arweave.wallets.getAddress(testWeave.rootJWK));
  fs.writeFileSync('.keys/root-key.json', JSON.stringify(testWeave.rootJWK));
  
  for (let i=1; i<=10; i++) {
    let jkw = await arweave.wallets.generate();
    let generatedAddr = await arweave.wallets.getAddress(jkw)
    console.log(i, "generated wallet", generatedAddr);
    fs.writeFileSync(`.keys/user-${i}-key_addr_${generatedAddr}.json`, JSON.stringify(jkw));
    
    let transaction = await arweave.createTransaction({
      target: generatedAddr,
      quantity: arweave.ar.arToWinston('10.5')
    }, testWeave.rootJWK);
    await arweave.transactions.sign(transaction, testWeave.rootJWK);
    console.log("Transfer money to new wallet: ", transaction);
    const response = await arweave.transactions.post(transaction);
    await testWeave.mine();
    console.log(response);
  }

  console.log("Finished");
  
  process.exit();
}

main()
