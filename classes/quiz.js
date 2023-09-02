const Topic = require('./topic');
const Card  = require('./card');
module.exports = class Main extends Topic {
    constructor(fields={}){
        super(fields);
        this.defaultFields({
            question:"",
            options:[],
            answer: -1,
            explanation:""
        });
    }
    
    getCard(){
        this.fields.riferimento =  this.fields.riferimento  + this.capitolo ? `Riferimento: ${this.capitolo!="Esercizi" ? "Capitolo":""} ${this.capitolo}` : '';
        return new Card(
            this.fields,
            '${question} <br/> <br/> ${options.map((x, index)=>{ return "<br/>-"+index+" "+x}).join("")}',
            'La risposta esatta è la ${answer+1} <br/> <br/> ${explanation}'
        );
    }
}