const fs  = require( 'fs');
const AnkiExport = require( 'anki-apkg-export').default;
module.exports = class {
    construct(deckname, topics=[]){
        this.deckname = deckname
        this.topics = topics;
    }
    addTopic(topic){
        this.topics.push(topic);
    }
    addTopics(topics=[]){
        topics.forEach(topic=>{
            this.addTopic(topic);
        })
    }
    async exportDeck(dir=""){
        const apkg = new AnkiExport(this.deckname);
        const cards = this.topics.map(x=>x.getCard);
        cards.forEach((card)=>{
            apkg.addCard(card.getFront(), card.getBack());
        })
        let zip =  await apkg.save();
        fs.writeFileSync(path.resolve(dir,this.deckname+'.apkg'), zip, 'binary');
    }

    exportQuizDeck = async(name,quizs)=>{
        const exporter = new Exporter(getDir("output/decks"),name, quizs);
        await exporter.exportDeck();
    }

    exportConceptDeck = async(name,concepts)=>{
        const conceptPrompt = new ConceptPrompt(concetti);
        const conceptAnswer = searcher.answerPrompt(conceptPrompt.elaboratePrompt());
        const shiken = new Shiken(conceptAnswer);
        const exporter = new Exporter(getDir("output/decks"),name, concepts);
        await exporter.exportDeck()
    }
}