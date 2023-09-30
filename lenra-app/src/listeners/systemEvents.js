'use strict'

import { Filter } from "../classes/Filter.js";

/**
 *
 * @param {import("@lenra/app").} _props
 * @param {import("@lenra/app").event} _event
 * @param {import("@lenra/app").Api} api
 */
export async function onEnvStart(_props, _event, api) {
}

export async function onUserFirstJoin(_props, _event, api) {
    await createFilter(api, "@me");
}

async function createFilter(api, user) {
    const filterColl = api.data.coll(Filter);
    let filters = await filterColl.find({ user })
    if (filters.length == 0) {
        await filterColl.createDoc(new Filter(user))
    }
}

export async function onSessionStart(_props, _event, _api) {

}
