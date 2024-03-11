class List<T>{
    private items: Array<T>;

    constructor() {
        this.items = [];
    }
    public add(item: T) {
        this.items.push(item);
    }

    public get(item: T): T {
        return this.items[this.items.indexOf(item)];
    }

    public remove(item: T) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    public get length(): number {
        return this.items.length;
    }
}

export default List;