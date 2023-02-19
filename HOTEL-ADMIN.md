# [I] RUN PROJECT

1. Run server by Express to Authentication

```
$ node server.js
```

2. Combine the json files into dataMain.json

**You should only Combine the files json in [src/Data/...] once. Because when launching json-server to fake API, it only changes the dataMain.json file**
**If you recombine, the dataMain.json file will return to its original state**

```
$ node Combined.js
```

3. Run Json-server

```
$ json-server --watch dataMain.json --port 8000
```

**_NOTE:_**

- Project using fake API at Port 8000
- Project config Axios at [./src/Api/axiosConfig.js]
