const fs  = require( 'fs');
module.exports = class{
    loadNotesDoc = ()=>{

    }
    
    loadExcel = ()=>{

    }
    /**
     * 



let capitolo = "Esercizi";

let currentLines = 0;
//A seconda degli argomenti faccio cose
const argomenti = [
  "legge",
  "business",
  "numeri"
];

let request = async (prompt) =>{
  const openai = new OpenAI({
  S});
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  console.log(completion.choices);
}
let getDbPedia = async (termine) => {
  let url = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+encodeURIComponent(termine);
  const response = await fetch(url);
  const data = await response.json();
  let wikipedia = {};
  if(data["query"] && data["query"]["pages"] && Object.keys(data["query"]["pages"]).length>0){
      wikipedia = data["query"]["pages"][Object.keys(data["query"]["pages"])[0]];
  }
  const formatted = {};
  if(wikipedia.extract)
    formatted.spiegazioneJP = wikipedia.extract;
  //formatted.spiegazioneJP = data["http://dbpedia.org/ontology/abstract"] || "";
  return formatted;
}

(async function processLineByLine() {
  try {
    initDeck("kihon_gijustsha_shiken");
    const rl = readline.createInterface({
      input: fs.createReadStream('textbook.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', async (line) => {

      let text = line.replaceAll(/　/g, ' ').trim().split(" ").filter(x=>(x.trim()?true:false));
      if(text[0] && text[0]=="Capitolo" && text[1]){
        capitolo = text[1];
      }else if(text[0] && (["Pag","Glossario"].includes(text[0]))){

      }else if(!text[0]){

      }else if(!fs.existsSync("export/"+text[0]+".json")){
        let formatted = {capitolo,text};
        console.log(`Line from file: ${JSON.stringify(formatted)}`);
        //await request(promptDefault+" "+text.join(" "));
        let dt = await getDbPedia(text[0]);
        formatted = Object.assign(formatted,dt);
        console.log(formatted);
        fs.writeFileSync("export/"+text[0]+".json", JSON.stringify(formatted), {flag: "a"});
        addDeck(formatted)
      }
    });

    await events.once(rl, 'close');

    console.log('Reading file line by line with readline done.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

    exportDeck("kihon_gijustsha_shiken");

  } catch (err) {
    console.error(err);
  }
})();
     */

}