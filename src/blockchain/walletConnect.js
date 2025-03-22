export async function connectWallet(){
    if (window) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            .catch((err) => {
                if (err.code === 4001) {
                console.log("Please connect Wallet.")
                } else {
                console.error(err)
                }
            });
        const account = accounts[0];
        document.cookie = document.cookie+`;myAccount=${account}`;
        console.log(`Set account address ${account} in cookie`);
    }
}