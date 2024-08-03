# Find Active Servers

There are about 55 servers in the list , with chat , movie , tv servers. Run the script to find which servers are accessible via your WiFi .

## v2.0 Update

Now you can see the server list in a simple Web interface. The Text file contains more detailed info but the minimal Web UI is added for easier navigation and accessibility. 

## Running the appilcation

### From prebuilt binary

1. Download executable from [releases](https://github.com/Faysal-star/ISP_server/releases/tag/v2.0).
2. Run the application, after completion follow the URL .

### From Source

1. Download this code as zip
2. Install Node.js if you haven't
3. Install dependecies

```bash
npm install
```

4. Run the script using

```bash
npm start
```

5. The list will be generated and stored in `working_url.txt` file.

#### Build From Source

1. Install nexe ``bash npm install -g pkg``
2. Build

```bash
pkg .
```

3. Find built executables for Linux and windows on `build` directory

## Contibuting

1. Fork this repo
2. Add your servers to the [server.csv](./servers.csv) file (you can edit it with MS Excel)
3. Push and submit a pull request.
