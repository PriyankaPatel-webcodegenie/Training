class calc {
    constructor(n1,n2){
        this.n1=n1;
        this.n2=n2;

    }
    add(){
        return this.n1 + this.n2;
    }
    sub(){

        return this.n1 - this.n2;
    }
}
module.exports=calc;