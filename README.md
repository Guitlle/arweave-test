# Learning Arweave

### Local testnet 

A local testnet can be run using docker/docker-compose. Use the following official repository:

https://github.com/ArweaveTeam/testweave-docker

This includes a graphql interface at http://localhost/graphql and a testnet at http://localhost:1984/ 

### Setting up arweave-deploy

### Deploy to local testnet

arweave-deploy package (https://github.com/ArweaveTeam/arweave-deploy) can deploy to the local testnet. Use the --host, --protocol and --port options to setup you testnet:

```
# Debug information of the testnet:
node_modules/arweave-deploy/dist/arweave network-info --host localhost --protocol http --port 1984 --debug
# Deploy a file:
node_modules/arweave-deploy/dist/arweave --host localhost --protocol http --port 1984 /path/to/file
```

TestWeave SDK (https://github.com/ArweaveTeam/testweave-sdk/) sets up a root account with 10M AR which you can use to make transactions and uploads. 

To use the scripts included in this repository do `npm run build` (after running `npm install`, of course). Then do:

```
mkdir .keys
node dist/src/startup.js
```

This will create 10 user accounts and transfer 10.5AR to each one of them from the root account.

