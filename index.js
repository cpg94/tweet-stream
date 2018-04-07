const Twit = require('twit');
const inquirer = require('inquirer');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8132, () => {
    console.log('Server Started.')
    main();
});

function main(){
    console.log('What tweets do you want to watch?');
    const question = [
		{
			message: "Name of tweet to watch.",
			type: "input",
			name: "answer"
		},
		{
			message: "Another One?",
			type: "confirm",
			name: "confirm"
    }];
    
    const answers = [];
    askForTweet(question, answers)
}

async function askForTweet(questions, answers){
    try {
        const { answer, confirm } = await inquirer.prompt(questions);

        if(!answer) {
            console.log('Can not be blank!');
            askForTweet(questions, answers);
        } else {
            answers.push(answer);
        }

        if(confirm){
            askForTweet(questions, answers);
        } else {
            startListeningForTweets(answers)
        }

    } catch (error) {
        console.log(error);
    }
}

function startListeningForTweets(track){
    // Have to add your own apps access/consumer tokens
    const t = new Twit({
        consumer_key:         'lQDK3H6w73lUiilmGMKuRRSQM',
        consumer_secret:      'vtqChuljHEomIpnagWoQsGJlYL0GTTTm7wZ1wL7erAaT0KQwmb',
        access_token:         '24532332-z0DzhF1ORg4DrhO7zl1IovgXG3TglgkehGCtmDDAc',
        access_token_secret:  '5AucVtFlK5UhPxqNZnaG7UxkqgAWug6caxf2ArhcXoOHw',
    });

    const stream = t.stream('statuses/filter', { track });
    console.log('Watching Tweets...')
    stream.on('tweet', (tweet) => {
        console.log(tweet.text)
        io.emit('tweet', tweet.text);
    })
}