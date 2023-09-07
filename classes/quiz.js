const Topic = require('./topic');
const Card  = require('./card');
module.exports = class Main extends Topic {
    constructor(fields={}){
        super(fields);
        this.defaultFields({
            questionIT:"",
            questionJP:"",
            optionsJP:[],
            optionsIT:[],
            answer: -1,
            explainationJP:"",
            explainationIT:""
        });
    }
    
    getCard(){
        this.fields.riferimento =  this.fields.riferimento  + this.capitolo ? `Riferimento: ${this.capitolo!="Esercizi" ? "Capitolo":""} ${this.capitolo}` : '';
        return new Card(
            this.fields,
            '${questionJP} <br/> <br/> ${optionsJP.map((x, index)=>{ return "<br/>-"+index+" "+x}).join("")}',
            'La risposta esatta è la ${answer+1} <br/> La domanda era ${questionIT} <br/>  ${explainationJP} <br/> ${explainationIT}' 
        );
    }
}