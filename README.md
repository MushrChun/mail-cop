# Mail Cop

*A broker between SendGrid and Mailgun*

Mail Cop plays the role of a broker when it comes to sending emails. Even though there are marvellous SaaS emails delivery providers such as SendGrid and Mailgun, our customised email format may not meet the requirement of them at the same time. On the other hand, their service may go down sometime. 

To deliver a more stable and user-friendly service for internal usage, Mail Cop can choose SaaS email delivery providers automatically. If one of them go down, it will go for another one immediately. This is transparent to end users. If both of the providers go down, users get the notification of the failure and are suggested to redo in the future. The redo times can be set manually with the default value of once.

## How To Boot
### Prerequisite
- node >= 8
- copy 'sample-config.mail.json' to 'config.mail.json' and fix API credentials inside

```sh
# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
Deploy via Docker 
------
```sh
cd project-root-dir

# Build the image
docker build -t map-cop/api-service .

# Run the docker image
docker run -p 8080:8080 map-cop/api-service
```

## How To Test
### Prerequisite
- mocha 
```sh
npm install --global mocha
```

### Run Test Suite
```sh
npm test
```

## API Doc
This project provides a RESTful endpoint for sending emails

1. The URL is [domain]:[port]/api/mails

    For example:

    localhost:8080/api/mails

2. Compatible HTTP method is POST only

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
    N.B. All parameter mentioned are compulsory and strings in from, to, cc, bcc should be valid email addresses.

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

