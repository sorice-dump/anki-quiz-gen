export default class {
    constructor(data){
        this.data = data;
    }

    elaboratePrompt(){
        return new Function(...Object.keys(this.data),  "return `"+this.prompt+"`;")(...Object.values(this.data)); 
    }
}