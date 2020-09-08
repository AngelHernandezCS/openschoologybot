# Schoology Assignment Bot 

Create an `assignments.json` file with open brackets {  }

Replace token in `Index.js` with discord bot token 



# sgy-sgy  (SheepMaster) 
-Copied From https://github.com/SheepTester/sgy-sgy/blob/master/README.md#schoology


Playing with the [Schoology API](https://developers.schoology.com/api-documentation/rest-api-v1)!

Put your [API Credentials](https://pausd.schoology.com/api) in a `api-creds.json` file like this:

```json
{
  "key": "87a6b8e78c0d897897a9f7e99a6d7c9",
  "secret": "0a08c87b75e43da26589d008f76bc"
}
```

Edit `index.js` then do

```bash
node index.js
```

# Things to mention

-Currently I do not know how bots work in multiple servers and how requests can be made in different instances.

-Schoology API requires a secret and key from any one individual but getting that key from a user with say an `!Initialize` command with the discord bot will have a user type it in chat.(This is risky because other people can see the chat) I guess you can make a private chat or have the bot get the text info and then immediately delete the text. But checking if the secret and key exist/is correct is also an issue.

-Formatting of embed is pretty garbage and can be changed to look pretty.

-Checking to see if assignments have been changed is possible but does require alot of skimming and taking into account running two requests at the same time(to schoology API) causes NONCE. 

-Huge thanks to Sheeptester for the actual brains of this bot!!!!!! https://github.com/SheepTester/sgy-sgy#sgy-sgy I dont know anyhting about Get requests and working with the Schoology APi so hes the real hero. 




