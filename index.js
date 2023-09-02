const secrets = require("./secret.js");
const Exporter = require("./executors/exporter");
const QuizPrompt = require("./classes/quizPrompt.js");
const ConceptPrompt = require("./classes/conceptPrompt.js");
const Quiz = require("./classes/quiz.js");
const Shiken = require("./classes/shiken.js");

const searcher = new require("./executor/searcher.js")(secrets);

const getDir = ()=>{
  const dir = __dirname+"/output/decks";
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  return dir;
}

const createQuizDeck = async(name, concepts)=>{
  const quizPrompt = new QuizPrompt(concepts);
  const quizAnswers = await searcher.answerPrompt(quizPrompt.elaboratePrompt());
  const conceptsTopics = quizAnswers.map(x=>new Quiz(x));
  const quizExporter = new Exporter(name, conceptsTopics);
  await quizExporter.exportDeck(getDir());
}
const createConceptDeck = async(name, concepts)=>{
  const conceptPrompt = new ConceptPrompt(concepts);
  const conceptAnswers = searcher.answerPrompt(conceptPrompt.elaboratePrompt());
  const conceptsTopics = conceptAnswers.map(x=>new Shiken(x));
  const conceptExporter = new Exporter(name, conceptsTopics);
  await conceptExporter.exportDeck(getDir())
}

const main = async ()=>{
  const concepts = ["外部割り込み","更新不可能なビュー","固定少数点数", "算術論理演算装置"]; 
  await createConceptDeck( 'kihon_gijustsha_shiken_concepts', concepts);
  await createQuizDeck   ( 'kihon_gijustsha_shiken_quiz'    , concepts); 
}
main();