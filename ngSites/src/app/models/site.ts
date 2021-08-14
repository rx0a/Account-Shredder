export class Site {

    id:number;
    name:string;
//TODO:Other site properties
    constructor(
        id: number =0,
        name:string = ''
    ) {
        this.id = id;
        this.name = name;
    }
}
