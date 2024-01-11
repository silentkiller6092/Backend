# We will Cover full Backend

Already added the Models Repo in Github

- [Models](https://github.com/silentkiller6092/Data-Modeling)

Database connection

## Create Seperate folder for DB connection

- Will use IFE immidiate function for db connection
- All the configuration we had did in app.js like url configuration cookie parser and other configuration
- Middleware - Checking in between request and response is treat as middleware
  -JWT token is bearer token its like key

## HTTP & HTTPS Crash Course

- Header : Contain the data of url it is in key value pairs
  - Header used in caching , authentication, manage state
  - Request Headers : From client
  - Response Headers : From server
  - Representation Headers : encoding / compression
  - Payload Headers :data
- Comman Headers:
  - Accept : application/json,
  - User-Agent : Tellf from which location request came
  - Authorization : Bearer Token ..
  - Content-Type : images/pdf/text
  - cookies : cookie data expiry data ...
  - Cach-Control:suppose when data need to expire if it is in network request
- CORS Header
  - Access:control-Allow-Origin
  - Access-Control-Allow-Credentials
  - Access-Control-Allow-Methods
- Securtiy
  - Cross Origin embedder Policy
  - Cross-origin-Openes-Policy
  - content-secirty policy
  - x-Xss protection
- Http Method
  - Get : retrieve resources
  - Head : No message body (response header only)
  - Options : What operations are available
  - Trace: Loopback test (get some data)
  - Delete : remove a resource
  - Put : replace a resource
  - Post : interact with resource
  - Patch : change part of a resource
- Http status code (xx - two digit)
  - 1 xx :Informational
  - 2 xx :Success
  - 3 xx :Redirection
  - 4 xx :Client Error
  - 5 xx : Server Error
- Access Token : access token this is short lived it will be to user show that user can work continusly
- RefreshToken : refresh token it is for long lived it store in both database and user cookie
- Aggregation Pipeline : Its like a stage each stage perform on the input documnet & document that are output from a stage are passed to the next stage

---

- Summary
