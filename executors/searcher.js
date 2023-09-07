const fs = require('fs');


module.exports = class {
    constructor(secrets){
        this.secrets = secrets;
    }
    formatAnswer(data){
        let result = "";
        try {
            result =  data["choices"][0]["message"]["content"];
            result = JSON.parse(result);
            result = result.termini;

        } catch (error) {
            
        }       
        return result;
    }
    async  answerPrompt(prompt){
        console.log(prompt);

       /* const data = fs.readFileSync("examples/resultConcept.json");
        return this.formatAnswer(JSON.parse(data));*/

        const axios = require('axios');
        const apiKey = this.secrets['open-ai'];
        const client = axios.create({
            headers: { 'Authorization': 'Bearer ' + apiKey }
        });

        const params = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role":"user", "content":prompt}]
        }
        console.log("Aspetto risposta");
        let result = await client.post('https://api.openai.com/v1/chat/completions', params)
        //console.log(result.data.choices[0].text);
        fs.writeFileSync('result.json', JSON.stringify(result.data));
        console.log("fine");
        process.exit();
        
    }
}