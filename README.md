# BanByID
 This is a Telegram bot developed in JavaScript with the Telegraf library, which allows to automatically ban users from a group if they have a specific ID. The bot stores a list of IDs in a .json file and checks if a user who enters the group has any of these IDs. If so, the user is automatically banned.

## How to use
1. Clone this repository to your computer.
2. Install the necessary dependencies using the command `npm install`.
3. Copy the [.env.copy](./.env.copy) file to a [.env](https://www.npmjs.com/package/dotenv) in the project root and add the `BOT_TOKEN` key with your Telegram bot token.
4. Create a `spam_users.json` file in the project root and add the IDs of the users you want to ban. For example:

```json
[5753128895, 1548692361, 5800820904]
```

5. Run the bot using the command `npm start`.

---

## Available commands
- /add [id] - Adds an ID to the list of banned users.
- /deleteid [id] - Removes an ID from the list of banned users.
- /count [id] - Returns with the number of users in the list
- /list - Shows the list of banned IDs.

## Notes
Make sure your bot has permission to ban users in groups.
The bot only checks the IDs of users who enter the group after it is started. If a user is already in the group when the bot is started, the bot will not automatically ban the user.
