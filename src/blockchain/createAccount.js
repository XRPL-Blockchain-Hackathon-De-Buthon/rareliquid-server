const axios = require('axios');

/**
 * @typedef {{accountId: number, address: string}} Account
 */

/**
 * @param {string} name
 * @returns {Account}
 */
export async function createAccount(name){
    try {
        const response = await axios.post('https://ag.eqhub.eqbr.com/api/v1/account-manager/accounts', {
            name,
            storageType: "KMS",
            usageType: "CUSTOMER"
        }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-eq-ag-api-key': process.env.EQHUB_API_KEY,
            },
        })

        /**
         * @type {Account}
         */
        const result = {accountId, address}

        return result;
    } catch(err) {
        throw err;
    }
}