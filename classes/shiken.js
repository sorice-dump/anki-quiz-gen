const Topic = require('./topic');
const Card  = require('./card');
export default class extends Topic {
    constructor(fields={}){
        this.fields = {
            kanji:"",
            kana:"",
            italiano:"",
            spiegazioneJP:"",
            spiegazioneIT:"",
            riferimento:"",
            note:"",
            capitolo:"",
            esempi:[],
        };
        super(fields);
    }
    
    getCard(){
        this.fields.riferimento =  this.fields.riferimento  + this.capitolo ? `Riferimento: ${this.capitolo!="Esercizi" ? "Capitolo":""} ${this.capitolo}` : '';
        return new Card(
            this.fields,
            '${kanji}',
            '${kana} <br/> ${italiano} <br/> ${spiegazioneJP} <br/> ${spiegazioneIT}  <br/>  ${riferimento}  <br/>  ${note} <br/> ${$esempi.join("<br/>-")}  '
        );
    }
}