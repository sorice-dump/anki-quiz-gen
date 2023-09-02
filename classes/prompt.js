module.exports = class {
    constructor(data){
        this.data = data;
        this.template="";
    }

    elaboratePrompt(){

        return new Function(...Object.keys(this.data),  "return `"+this.template+"`;")(...Object.values(this.data)); 
    }
}