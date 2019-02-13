// since we don't have a real backend, will store pockets data in localStorage instead.

export function getPocketsBalances() {
  return new Promise((resolve, reject) => {
    if(!localStorage) reject('No local storage exists');
    const pocketsData = localStorage.getItem('pockets');
    const pocketsObject = JSON.parse(pocketsData);
    if (pocketsObject) {
      resolve(pocketsObject);
    } else {
      resolve({});
    }
  });
}

export function savePocketsBalances(balances) {
  return new Promise((resolve, reject) => {
    if(!localStorage) reject('No local storage exists');
    localStorage.setItem('pockets', JSON.stringify(balances));
    resolve();
  });
}
