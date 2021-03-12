import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: true,
});


async function main() {
  arweave.wallets.generate().then((key) => {
      console.log(key);
      // {
      //     "kty": "RSA",
      //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
      //     "e": ...
  });
  const txids = await arweave.arql({
    op: "and",
    expr1: {
      op: "equals",
      expr1: "from",
      expr2: "MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y"
    }
  });
  console.log(txids);
}

main();
