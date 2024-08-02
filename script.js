const http = require('http');
const https = require('https');
const ping = require('ping');
const fs = require('fs');
const csv = require('csv-parser');
const process = require('process');
const { env } = process; // `env` is a property of `process`
const { URL } = require('url');
const path = require('path');


const servers = path.join(__dirname, 'servers.csv');

const timeout = env.TIMEOUT | 10000


let outputMap = {}
let bufferCount = 0;

fs.createReadStream(servers)
  .pipe(csv())
  .on('data',async (row) => await checkUrl(row))
  .on('end', () => {
    console.log('Finished reading csv')
});

async function checkUrl(row) {
  const url = new URL(row.URL);
  let hostname = url.hostname
  let port = url.port
  let host = url.host
  let path = url.pathname

  console.log(`Started Checking ${host}${path}`)
  bufferCount++;


  let httpSupport = await new Promise((resolve) => {
    let req = http.get(`http://${host}${path}`, { timeout: timeout }, (res) => res.statusCode == 200 ? resolve(true) : resolve(false))
      .on('error', () => resolve(false))
      .on('timeout', () => { req.destroy(); resolve(false) })
  })

  let httpsSupport = await new Promise((resolve) => {
    let req = https.get(`https://${host}${path}`, { timeout: timeout }, (res) => res.statusCode == 200 ? resolve(true) : resolve(false))
      .on('error', () => resolve(false))
      .on('timeout', () => { req.destroy(); resolve(false) })
  })

  let pingHost = await ping.promise.probe(host)
if (pingHost.alive || httpSupport || httpsSupport) {
  if (typeof outputMap[row.Category] === 'undefined') outputMap[row.Category] = [{
    Name:row.name,
    URL:row.URL,
    Comment:row.Comment,
    ping:pingHost.alive,
    pingTime:pingHost.time,
    http:httpSupport,
    https:httpsSupport,
  }]
    else outputMap[row.Category].push({
      Name:row.Name,
      URL:row.URL,
      Comment:row.Comment,
      ping:pingHost.alive,
      pingTime:pingHost.time,
      http:httpSupport,
      https:httpsSupport,
    })
}
  bufferCount--;
  console.log(`Finished : ${row.URL}`)
  if (bufferCount==0) generateTXT()
}

function generateTXT() {
  console.log("Startiing Writing")
  //console.log(outputMap)
  let finalResult = ""
  for (let i in outputMap) {
    if (outputMap[i].length!=0) {
      finalResult += "----------------------------------- "
      finalResult += `Category : ${i}`
      finalResult += " -----------------------------------"
      for (let j of outputMap[i]) {
          let report = `\n\n--- ${j.Name} ---\n`
          report+=`URL\t\t\t\t\t: ${j.URL}\n`
          if (j.ping) {
            report += `Ping\t\t\t\t: took ${j.pingTime}\n`
          } else {
            report += `Ping\t\t\t\t: failed\n`
          }
          let browerAccessible = j.http || j.https
          if (browerAccessible) {
            report += `Browser accessible\t: ${browerAccessible}\n`
            report += `TLS support\t\t\t: ${j.https}\n`
          } else {
            report += `Browser accessible\t: No, Contact server ISP to unblock your IP\n`
          }
          report += `Comment: ${j.Comment}\n`
          finalResult += report
      }
      finalResult += '\n\n'
    }
  }
  fs.writeFileSync('working_url.txt',finalResult)
  console.log("Finished!")
}
