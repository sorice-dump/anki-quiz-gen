const Card  = require('./card');
module.exports = class {
    constructor(fields={}){
        this.fields = {};
        this.assignFields(fields);
    }
    assignFields(fields={}){
        this.fields = Object.assign(this.fields,fields);
    }  
    defaultFields(fields={}){
        this.fields = Object.assign(fields,this.fields);
    }    
    getCard(){
        return new Card(
            this.fields,
            '${front}',
            '${back}'
        );
    }
}