# Phone Number Verification with MessageMedia Messages API

## 2FA vs Phone Number Verification
Two-Factor Authentication (2FA) adds an extra layer of protection beyond the password. Typically in a 2FA Implementation a secret is generated for each user, which is then stored securely in a backend. This secret is then used to generate a token and the token is sent to the user. When a code is entered by the user this is then verified against the secret for that user. 

A typical implementation of 2FA requires storage and processing in server side code, and authentication against user accounts. In the event that _phone number verification_ is needed, a typical implementation of 2FA will not do. What is required is proof of ownership.

In this implementation, we have leveraged the 'meta data' feature of MessageMedia Messages API to remove the need for user secret generation and storage, making the functionality for phone number verification, 'out of the box'. Because MessageIDs are unique to each account, this makes the API Key and Secret a layer of security for this implementation. A messageID sent to the verification page is useless without the API KEY and SECRET that generated it. Thus, calling the Message by ID and verifying against the metadata provides phone number verification. 

In this implementation I have used the speakeasy.js library for ease of token generation. In theory the speakeasy library could also be used as a second layer of verification to make the tokens "expire". However this is a 'todo' for this simple implementation. 


#### Getting Started
To get started you need to:

* Sign up for API keys from the [MessageMedia Developer Portal](https://developers.messagemedia.com/register)
* Clone this repo
* Duplicate the .env.example file and rename it to .env
* Copy across the API keys into the .env file
* User command: 'npm run dev' 
* Enter your mobile phone number and submit the form
* You should receive an SMS with a 6-digit code
* Enter the code and click verify

#### Resources
* [API Documentation](https://developers.messagemedia.com/code/messages-api-documentation/)
* [Speakeasy](https://github.com/speakeasyjs/speakeasy)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/coderbec/node-verifier)
