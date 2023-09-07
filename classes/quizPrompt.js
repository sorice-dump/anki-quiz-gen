const Prompt = require('./prompt');
module.exports = class Main extends Prompt{
    constructor(data){
        super(data);
        this.template= `Fornisci per ogni termine e concetto d'informatica fornito in fondo (rispondi direttamente in json): 
        (0) Domanda relativa al concetto in giapponese
        (1) Opzioni in lingua Giapponese (3-5 Opzioni posibili) 
        (2) Stesse opzioni ma in lingua Italiana  
        (3) Opzione corretta  (numero intero, indice dell'array)
        (4) Spiegazione perché l'opzione è corretta in Giapponese
        (5) Spiegazione perché l'opzione è corretta in Italiano
        (6) traduzione del punto (0) in italiano
     
      Il tutto formattato in json nel seguente modo
        {
          "questionJP":"(0)",
          "questionIT":"(6)",
          "optionsJP":["(1)","(1)","(1)"],
          "optionsIT":["(2)","(2)","(2)"],
          "answer": (3),
          "explainationJP":"(4)",
          "explainationIT":"(5)",
        }

      Termini e concetti:
      `+'-${termini.join("\\n-")}'+`

      Per favore rispondi direttamente in json,
      non mi serve contenuto testuale
        
    `;
    }
}