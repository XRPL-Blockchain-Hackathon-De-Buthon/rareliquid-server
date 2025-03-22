export async function getAddressConnected(){
    const cookie = document.cookie;
    const parsed = cookie.split(';');

    return parsed.find(str => str.startsWith('myAccount')).replace('myAccount=', '').trim();
}