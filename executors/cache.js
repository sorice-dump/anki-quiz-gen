const fs  = require( 'fs');
const crypto = require('crypto');
const path = require('node:path'); 

module.exports = class{
    constructor(folder){
      this.folder = folder;
    }

    getDir(filename){
      return path.resolve(this.folder, filename);
    }

    load = (obj) => {
      const key = this.calcKey(obj);
      const filename  = this.getDir(key+".json");
      console.log("Controllo Esistenza: "+filename);
      if (fs.existsSync(filename)) {
          console.log("Leggo file: "+filename);
          const str = fs.readFileSync(filename);
          try {
            return JSON.parse(str);
          } catch (error) {
            console.log("ATTENZIONE, ERRORE NEL PARSING DELLA CACHE!!");
            console.log(error);
          }
      }
      return null;
    }
    save = (obj, data) => {
      try {
        const key = this.calcKey(obj);
        const filename  = this.getDir(key+".json");
        const str = JSON.stringify(data);
        console.log("Salvo: "+filename);
        fs.writeFileSync(filename, str);
      } catch (error) {
        console.log("ATTENZIONE, ERRORE NEL SALVATAGGIO DEI DATI IN CACHE!!");
        console.log(error);
      }    
    }
    calcKey(obj=null) {
      const str = JSON.stringify(obj);
      const md5 = crypto.createHash('md5');
      return md5.update(str, 'binary').digest('hex');
    }














    /////////////////////
    async ls(path) {
      const dir = await fs.promises.opendir(path)
      const arr = await Promise.all(dir);
      return arr;
    }
    
    async loadCache(){
      let files = await this.ls();
    }

    loadNotesDoc = ()=>{

    }
    
    loadExcel = ()=>{

    }
    async loadNotes(filename){
      const rl = readline.createInterface({
        input: fs.createReadStream(filename),
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
    }
  
  
}