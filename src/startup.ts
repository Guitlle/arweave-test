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
    const jkw = await arweave.wallets.generate();
    const generatedAddr = await arweave.wallets.getAddress(jkw)
    console.log(i, "generated wallet", generatedAddr);
    fs.writeFileSync(`.keys/user-${i}-key_addr_${generatedAddr}.json`, JSON.stringify(jkw));
    testWeave.drop(generatedAddr, '10000');
  }
  await testWeave.mine();
  console.log("Finished");
  
  process.exit()
}

main()
