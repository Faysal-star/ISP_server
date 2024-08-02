const axios = require('axios');
const fs = require('fs');

const urls = [
    'http://103.112.62.79:8065/',
    'https://103.112.62.79:5443/',
    'http://103.150.254.245:3000',
    'http://103.150.254.245:56969',
    'http://103.112.62.79:5555/',
    'http://146.196.48.9/',
    'https://103.200.93.146/',
    'http://103.43.151.2:8099/',
    'https://103.200.93.146/games/',
    'http://146.196.48.10/',
    'http://103.9.185.82/',
    'http://103.76.47.6:8096/',
    'http://103.76.47.6:8080/',
    'http://103.92.154.118:8096/',
    'http://103.153.130.245/',
    'http://103.78.255.174/',
    'http://103.144.165.43:8096',
    'http://103.16.74.218/',
    'https://103.145.57.203/',
    'http://103.144.165.43:8096',
    'http://103.148.40.133/',
    'http://113.212.111.246:8080/hls//col12.m3u8',
    'http://59.153.100.190/',
    'http://103.112.62.79:89/',
    'http://103.200.93.146/web/index.html',
    'http://10.90.90.200/',
    'http://103.16.72.115/#latest',
    'http://146.196.48.10/',
    'http://103.82.8.194/Data/',
    'http://103.132.95.221:8096/web/index.html#!/home.html',
    'http://103.72.61.209/',
    'http://103.92.154.118:8096/web/index.html#!/home',
    'http://103.81.104.98/',
    'http://103.91.144.230/',
    'http://10.16.100.244/',
    'http://103.92.154.118:8096',
    'http://146.196.48.10/FILE--SERVER/FTP-1/',
    'http://103.112.62.79:5230/',
    'http://30.30.30.130',
    'http://103.58.73.8/',
    'http://10.1.1.1',
    'http://146.196.48.10/FILE--SERVER/FTP-2/',
    'http://113.212.111.246:8080/hls//col12.m3u8',
    'http://172.28.28.20',
    'http://103.102.27.172',
    'http://103.109.56.115/index.php',
    'http://103.109.56.117/index.php',
    'http://103.109.56.117/ftpdata',
    'http://146.196.48.10',
    'http://103.77.252.113',
    'http://103.77.252.113/ftpdata',
    'http://103.203.93.2',
    'http://103.148.178.230',
    'http://103.166.193.10/ftp',
    'http://172.17.50.240',
    'http://172.17.50.243',
    'http://ftp5.circleftp.net',
    'http://15.1.1.5',
    'http://192.168.91.8'
];


console.log(urls.length);

fs.writeFileSync('working_url.txt', '-- Working URL --\n');

const checkUrl = async () => {
    for (const url of urls) {
        try {
            const response = await axios.get(url , { timeout: 3000 }) ;
            if(response.status !== 200) {
                throw new Error('URL is not working');
            }
            console.log(`URL: ${url} is working`);
            fs.appendFileSync('working_url.txt', `${url}\n`);
        } catch (error) {
            console.log(`URL: ${url} is not working`);
        }
    }
}

checkUrl();

