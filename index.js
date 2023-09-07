
const fs = require('fs');
const path = require('node:path'); 
const getDir = (str="output/decks")=>{
  const dir = path.resolve(__dirname,str);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}



const secrets = require("./secret");
const Exporter = require("./executors/exporter");
const QuizPrompt = require("./classes/quizPrompt");
const ConceptPrompt = require("./classes/conceptPrompt");
const Quiz = require("./classes/quiz");
const Shiken = require("./classes/shiken");

const searcher = new (require("./executors/searcher"))(secrets);
const cache    = new (require("./executors/cache"))(getDir("input/cache"));


const createDeck = async (name, variables, promptClass, topicClass) => {
  console.log("(1) Inizializzo Prompt");
  const prompt = new promptClass(variables);
  const promptString = prompt.elaboratePrompt();
  console.log("(2) Controllo se in cache ho il seguente dato");
  let answers = null;
  if(!(answers = cache.load(promptString))){
    console.log("(3a) Invio Prompt ad api di OpenAi");
    answers = await searcher.answerPrompt(promptString);
    console.log("Salvo Risultato in cache");
    cache.save(promptString, answers);
  }else{
    console.log("(3b) Trovato in cache, non chiamo openai");
  }
  console.log("(4) Formatto la risposta in un array di topic");
  const topics = answers.map(x=>new topicClass(x));
  console.log("(5) Mi Preparo per la generazione del deck");
  const exporter = new Exporter(name, topics);
  console.log("(6) Genero deck");
  await exporter.exportDeck(getDir());
  console.log("(7) Deck Generato");
}


const createQuizDeck = async(name, concepts)=>{
  console.log("Creo deck per dei quiz, nome"+name);
  await createDeck(name,{termini:concepts},QuizPrompt, Quiz);
  

}
const createConceptDeck = async(name, concepts)=>{
  console.log("Creo deck per dei concetti, nome"+name);
  await createDeck(name,{termini:concepts},ConceptPrompt, Shiken);
}

const main = async ()=>{
  console.log("inizio");
  const concepts = ["外部割り込み","更新不可能なビュー","固定少数点数", "算術論理演算装置"]; 
  //await createConceptDeck( 'kihon_gijustsha_shiken_concepts', concepts);
  await createQuizDeck   ( 'kihon_gijustsha_shiken_quiz'    , concepts); 
}

(async ()=>{
    try {
      await main(); 
    } catch (error) {
      console.log(error);
    }
})()
