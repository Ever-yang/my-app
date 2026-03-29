import { AbstractStore } from "../abstactStore";

export class Astore extends AbstractStore {


    b = 0

    setB() {
        this.b = this.b + 1
        this.notify()
    }
}

export const astore = new Astore() 