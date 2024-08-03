const serverList = document.getElementById('serverList');
const cntN = document.getElementById('cntN');
let total = 0 ;

function createCard(type , URL , PingStatus){
    let card = `
        <div class="server ${PingStatus}">
            <a href="${URL}" class="Link">${URL}</a>
            <p class="status">${PingStatus} : ${type}</p>
        </div>
    `
    serverList.innerHTML += card;
}
function parseData(data) {
    for (const [type, servers] of Object.entries(data)) {
        for (const server of servers) {
            const status = server.http || server.https;
            if(status){
                total++;
                cntN.innerHTML = total;
            }
            createCard(type, server.URL, status ? 'Active' : 'Inactive');
        }
    }
}


async function main() {
    try {
        const res1 = await fetch("/serverList");
        const data1 = await res1.json();
        parseData(data1);

        const res2 = await fetch("/inactiveList");
        const data2 = await res2.json();
        parseData(data2);
    } catch (error) {
        console.error(error);
    }
}

main();