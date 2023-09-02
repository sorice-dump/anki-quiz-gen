const Topic = require('./topic');
const Card  = require('./card');
export default class extends Topic {
    constructor(fields={}){
        this.fields = {
            question:"",
            options:[],
            answer: -1,
            explanation:""
        };
        super(fields);
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