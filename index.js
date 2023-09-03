const fs = require('fs');
const secrets = require("./secret");
const Exporter = require("./executors/exporter");
const QuizPrompt = require("./classes/quizPrompt");
const ConceptPrompt = require("./classes/conceptPrompt");
const Quiz = require("./classes/quiz");
const Shiken = require("./classes/shiken");

const searcher = new (require("./executors/searcher"))(secrets);

const getDir = ()=>{
  const dir = __dirname+"/output/decks";
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  return dir;
}

const createQuizDeck = async(name, concepts)=>{
  console.log("Creo deck per dei quiz, nome"+name);
  const quizPrompt = new QuizPrompt({termini:concepts});
  const quizAnswers = await searcher.answerPrompt(quizPrompt.elaboratePrompt());
  const conceptsTopics = quizAnswers.map(x=>new Quiz(x));
  const quizExporter = new Exporter(name, conceptsTopics);
  await quizExporter.exportDeck(getDir());
}
const createConceptDeck = async(name, concepts)=>{
  console.log("Creo deck per dei concetti, nome"+name);
  console.log("(1) Inizializzo Prompt");
  const conceptPrompt = new ConceptPrompt({termini:concepts});
  console.log("(2) Invio Prompt ad api di OpenAi");
  const conceptAnswers = await searcher.answerPrompt(conceptPrompt.elaboratePrompt());
  console.log("(3) Formatto la risposta in un array di topic");
  const conceptsTopics = conceptAnswers.map(x=>new Shiken(x));
  //console.log(conceptsTopics);
  console.log("(4) Mi Preparo per la generazione del deck");
  const conceptExporter = new Exporter(name, conceptsTopics);
  console.log("(5) Deck Generato");
  await conceptExporter.exportDeck(getDir())
}

const main = async ()=>{
  console.log("inizio");
  const concepts = ["外部割り込み","更新不可能なビュー","固定少数点数", "算術論理演算装置"]; 
  await createConceptDeck( 'kihon_gijustsha_shiken_concepts', concepts);
  //await createQuizDeck   ( 'kihon_gijustsha_shiken_quiz'    , concepts); 
}

(async ()=>{
    try {
      await main(); 
    } catch (error) {
      console.log(error);
    }
})()
