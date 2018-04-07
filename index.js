const Twit = require('twit');
const inquirer = require('inquirer');

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
    const t = new Twit({
        consumer_key:         '',
        consumer_secret:      '',
        access_token:         '',
        access_token_secret:  '',
    });

    const stream = t.stream('statuses/filter', { track });
    console.log('Watching Tweets...')
    stream.on('tweet', (tweet) => {
        logTweet(tweet);
    })
}


function logTweet(tweet){
    console.log(`📣  - ${tweet.text}`)
}

main();