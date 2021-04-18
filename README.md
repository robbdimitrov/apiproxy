# Node Proxy

Proof of concept proxy using [Node](https://github.com/nodejs/node).
The following technique can be used to keep secrets such as API
client tokens out of your frontends.

## Example usage:

Start the server:
```
$ ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 \
    PORT=8001 \
    node src/server.js
```

Start the proxy:
```
$ ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 \
    PORT=8002 \
    SERVER_ADDR=localhost:8001 \
    node src/proxy.js
```

## Testing requests:

### `GET` request

Request:
```
$ curl -i -X GET localhost:8002/hello
```
Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Fri, 26 Mar 2021 19:44:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"type":"HELLO","status":"SUCCESSFUL"}
```

### `POST` request with body

Request:
```
$ curl -i -X POST localhost:8002/auth \
    -H 'content-type: application/json' \
    -d '{"id":1,"name":"John"}'
```
Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Fri, 26 Mar 2021 19:47:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"type":"AUTH","status":"SUCCESSFUL"}
```

### `POST` request with body and path parameter

Request:
```
$ curl -i -X POST localhost:8002/user/john \
    -H 'content-type: application/json' \
    -d '{"name":"Jonathan"}'
```
Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Fri, 26 Mar 2021 19:48:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"type":"AUTH","status":"SUCCESSFUL"}
```

### Direct requests to the server

Request:
```
$ curl -i -X GET localhost:8001/hello 
```
Response:
```
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
Date: Fri, 26 Mar 2021 19:51:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Unauthorized
```

## License

Licensed under the [MIT](LICENSE) License.
