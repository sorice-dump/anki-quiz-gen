const Prompt = require('./prompt');
export default class extends Prompt{
    constructor(data){
        this.template= `Fornisci per ogni termine e concetto d'informatica fornito in fondo (rispondi direttamente in json): 
        (0) Termine Fornito in kanji
        (1) Lettura in kana (uguale se la parola è già in kana) 
        (2) Traduzione in italiano 
        (3) Spiegazione in Giapponese 
        (4) Spiegazione in italiano 
        (5) Se possibile, esempi sottoforma di array di stringhe
            per esempio si intende qualcosa di concreto e specifico che permetta di comprendere un concetto generico
            ES: 足し算 -> 5+6
                車 -> Ferrari, Lamborghini
                惑星 -> Marte, Saturno
     
      Il tutto formattato in json nel seguente modo
        {
          "kanji":"(0)",
          "kana":"(1)",
          "italiano":"(2)",
          "spiegazioneJP":"(3)",
          "spiegazioneIT":"(4)",
          "esempi":["(5)","(5)"]
        }

      Termini e concetti:
      `+'-${termini.join("\\n-")}'+`

      Per favore rispondi direttamente in json,
      non mi serve contenuto testuale
        
    `;
    super(data);
    }
}