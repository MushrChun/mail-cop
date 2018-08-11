export class FailGrid {

    constructor() {
        this.grid = new Map();
        this.maxRedo = 1;
    }

    accumulate(label) {
        const prevValue = this.grid.get(label);
        this.grid.set(label, prevValue ? prevValue + 1: 1);
    }

    allowRedo(label) {
        const curValue = this.grid.get(label);
        if(!curValue || curValue < this.maxRedo) return true;
        else return false;
    }
}