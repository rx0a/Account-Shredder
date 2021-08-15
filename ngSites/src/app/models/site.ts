export class Site {
    id: number;
    name: string;
    url: string;
    difficulty: string;
    notes: string;
    updated: string;
    status: string;
    constructor(
        id: number = 0,
        name: string = '',
        url: string = '',
        difficulty: string = '',
        notes: string = '',
        updated: string = '',
        status: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.difficulty = difficulty;
        this.notes = notes;
        this.updated = updated;
        this.status = status;
    }
}
