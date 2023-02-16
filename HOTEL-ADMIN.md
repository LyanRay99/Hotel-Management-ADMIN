# [I] RUN PROJECT

1. Combine the json files into dataMain.json

**You should only Combine the files json in [src/Data/...] once. Because when launching json-server to fake API, it only changes the dataMain.json file**
**If you recombine, the dataMain.json file will return to its original state**

```
$ node Combined.js
```

2. Run Json-server

```
$ json-server --watch dataMain.json --port 8000
```

**_NOTE:_**

- Project using fake API at Port 8000
- Project config Axios at [./src/Api/axiosConfig.js]

# [II] Tạm thời chưa Authentication

- Nên folder [./src/Admin] và [./src/Api] sẽ chưa dùng đến
