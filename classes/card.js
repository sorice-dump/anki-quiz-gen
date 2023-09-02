export default class {
    constructor(fields={}, backTemplate="", frontTemplate=""){
        this.fields = fields;
        this.backTemplate = backTemplate;
        this.frontTemplate = frontTemplate;
    } 
    generate(template){
        return new Function(...Object.keys(this.fields),  "return `"+template+"`;")(...Object.values(this.fields)); 
    }
    getFront(){
        return this.generate(this.frontTemplate);
    }
    getBack(){
        return this.generate(this.backTemplate);
    }
}