# SlackBots

## Architecture
![alt text](https://github.com/functionalP/SlackBots/blob/master/SlackBotArchitecture.tiff)

## Slackbot - Ngrok

### Setup
Creating an app will provide us with the Client ID and Secret we need to input in our script on the second step.
 - Go to https://api.slack.com/apps
 - Click on Create new App on the top-right hand-side.
 - Select the team you'd like the app to be associated as its creator and fill all remaining fields.
 - In the redirect URI field, paste your ngrok forwarding address and add the /oauth endpoint at the end of the address
 - Add to slack authorizes the app as shown in figures below:
 ![alt text](https://github.com/functionalP/SlackBots/blob/master/Add2Slack.png)

 ![alt text](https://github.com/functionalP/SlackBots/blob/master/AppAuthorization.png)

### Installation
'npm install
'

### Running
'sudo WIT_TOKEN=PEVL7DWLOGHF6T6ZQPO6KUC6VC2SRNW7 npm start
'

## Slackbot - Beepboop
Beepboop— a new hosting service designed specifically for chat bots.

## Setup:

Create your bot on the Slack side and connect it to Beep Boop
  - Go to https://beepboophq.com
  - Select created slack github project.
  - In the same project page, Click Enable Add to slack. This will generate an App Name, Redirect URI, and redirect  
  instructions. 
  - Copy the app details that Beep Boop previously generated, pasting them into the Slack Application’s configuration page.
  - Copy the Client ID and Client Secret from Slack to the corresponding fields in your Beep Boop configuration page, and then save your project.
  - Click on the Add to Slack button, select Slack team and authorize the app.

### Installation
`npm install
`

### Running
`sudo WIT_TOKEN=PEVL7DWLOGHF6T6ZQPO6KUC6VC2SRNW7 npm start
`

Notification
Do POST request to this URL
 https://beepboophq.com/proxy/BEEPBOOP_PROJECT_ID/reject/4711




