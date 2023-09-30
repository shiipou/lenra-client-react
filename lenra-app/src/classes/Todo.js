import { Data } from "@lenra/app";

export class Todo extends Data {
    /**
     *
     * @param {string} user
     * @param {string} name
     * @param {boolean} state
     */
    constructor(user, name, state = false) {
        super();
        this.user = user;
        this.name = name;
        this.state = state;
    }
}
