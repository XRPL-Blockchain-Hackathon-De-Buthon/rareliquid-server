import { ContractFactory, JsonRpcProvider, Wallet, Contract } from "ethers";
import NFT_ABI from '../artifacts/contracts/NonFungibleToken.sol/NonFungibleToken.json';

// const RPC_URL = "https://rpc.xrplevm.org"; // devnet
const RPC_URL = "https://rpc.testnet.xrplevm.org"; // testnet

/** 
 *  @typedef {{name: string, symbol: string}} Metadata
 */

/**
 * @param {string} to
 * @param {Metadata} metadata
 * @returns {Promise<{address: string, result: boolean}>}
 */
export async function deployRWA(to, metadata){
    const client = new JsonRpcProvider(RPC_URL);
    const wallet = new Wallet(process.env.EVM_PK, client);
    console.log(`Balance: ${await client.getBalance(wallet.address)}`);

    const RWAFactory = new ContractFactory(NFT_ABI.abi, NFT_ABI.bytecode, wallet);

    try {
        const contract = await RWAFactory.deploy(metadata.name, metadata.symbol, to);
        const contractInst = new Contract(await contract.getAddress(), NFT_ABI.abi, wallet);
        
        const result = {
            address: await contractInst.getAddress(),
            result: true,
        }

        console.log(result);

        return result;
    } catch(err) {
        console.log(err);

        throw(err)
    }
}