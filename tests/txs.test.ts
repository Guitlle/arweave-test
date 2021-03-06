import TestWeave from 'testweave-sdk';
import arweave from './_init_arweave';

import { expect } from 'chai';

describe('testing TestWeave data transactions', function (): void {
  this.timeout(20000);
  it('This should correctly create a test data transaction', async (): Promise<void> => {
    const testWeave = await TestWeave.init(arweave);
    const data = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Info about arweave</title>
      </head>
      <body>
        Arweave is the best web3-related thing out there!!!
      </body>
    </html>`;

    const dataTransaction = await arweave.createTransaction({
      data,
    }, testWeave.rootJWK);

    await arweave.transactions.sign(dataTransaction, testWeave.rootJWK)
    const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
    // the status should now be equal to 404
    expect(statusBeforePost.status).equal(404);

    await arweave.transactions.post(dataTransaction);
    await testWeave.mine();
    const statusAfter = await arweave.transactions.getStatus(dataTransaction.id)
    // the status should now be equal to 200
    expect(statusAfter.status).equal(200);
  });
});
