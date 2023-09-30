import { Data } from "@lenra/app";

export const FilterEnum = {
    all: 0,
    active: 1,
    completed: 2
};

export class Filter extends Data {
    /**
     *
     * @param {string} user
     * @param {number} filter
     */
    constructor(user, filter = FilterEnum.all) {
        super();
        this.user = user;
        this.filter = filter;
    }
}
