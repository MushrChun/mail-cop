# Mail Cop

*A broker between SendGrid and Mailgun*

## How To Boot

```sh

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
Docker Support
------
```sh
cd project-root-dir

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

## API Doc
This project provide a RESTful endpoint for sending email

1. The URL is [domain]:[port]/api/mails

    For example:

    localhost:8080/api/mails

2. Compatible HTTP method is POST

3. Mail content shoule be wrapped into a HTTP Message Body through application/json format

4. The assume JSON payload should follow the restrict structure:

    ```json
    {
        "message":{
            "from": <string>,
            "to": [ <string>, <string>...],
            "cc": [ <string>, <string>...],
            "bcc": [ <string>, <string>...],
            "subject": <string>,
            "text": <string>
        }
    }
    ```
    N.B. All parameter mentioned are compulsory and strings in from, to, cc, bcc should be a valid email address.

    For example:
    ```json
    {
        "message": {
            "from": "xxx@xxx.xxx",
            "to": ["xx1@xxx.xxx", "xx2@xxx.xxx"],
            "cc": ["xx3@xxx.xxx", "xx4@xxx.xxx"],
            "bcc":["xx5@xxx.xxx", "xx6@xxx.xxx"],
            "subject":"TEST",
            "text":"TEST"
        }
    }
    ```

## Trade-off
To reduce the complexity of deployment, external DB is not used.
I supposed to use a MongoDB or other NoSQL database to record any email that fails to send. These emails should be scheduled to be sent eventually.
The database can also be used to store all sent messages in that aim, business intelligence tools can be made use of to mine more value from our clients.

## Declaration
This project is based on [Express & ES6 REST API Boilerplate](https://github.com/developit/express-es6-rest-api)

