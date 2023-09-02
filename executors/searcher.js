export default class {
    constructor(secrets){
        this.secrets = secrets;
    }
    async  answerPrompt(prompt){
        console.log(prompt);
        console.log("fine");
        process.exit();

        const axios = require('axios');
        const apiKey = this.secrets['open-ai'];
        const client = axios.create({
            headers: { 'Authorization': 'Bearer ' + apiKey }
        });

        const params = {"prompt": prompt}

        client.post('https://api.openai.com/v1/engines/davinci/completions', params)
        .then(result => {
            console.log(params.prompt + result.data.choices[0].text);
        }).catch(err => {
        console.log(err);
        });
    }
}