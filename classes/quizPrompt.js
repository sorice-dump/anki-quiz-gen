const Prompt = require('./prompt');
module.exports = class Main extends Prompt{
    constructor(data){
        super(data);
        this.template= `Fornisci per ogni termine e concetto d'informatica fornito in fondo (rispondi direttamente in json): 
        (0) Domanda relativa al concetto
        (1) Opzioni (3-5 Opzioni posibili) 
        (2) Opzione corretta  (numero intero, indice dell'array)
        (3) Spiegazione perché l'opzione è corretta 
     
      Il tutto formattato in json nel seguente modo
        {
          "question":"(0)",
          "options":["(1)","(1)","(1)"],
          "answer": (2),
          "explaination":"(3)"
        }

      Termini e concetti:
      `+'-${termini.join("\\n-")}'+`

      Per favore rispondi direttamente in json,
      non mi serve contenuto testuale
        
    `;
    }
}