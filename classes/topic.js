const Card  = require('./card');
export default class {
    constructor(fields={}){
        this.assignFields(fields);
    }
    assignFields(fields={}){
        this.fields = Object.assign(this.fields,fields);
    }   
    getCard(){
        return new Card(
            this.fields,
            '${front}',
            '${back}'
        );
    }
}