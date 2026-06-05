
import { useUrlSearchParams, type UrlParams } from "@vueuse/core"

const urlParams = useUrlSearchParams("history", {
    removeFalsyValues: true,
    write: true,
    writeMode: "push",
})

/**
 * Same as VueUse's useUrlSearchParams but with settings specific for this
 * application
 * @returns The returned reactive object of useUrlSearchParams
 */
export function useQueryParams(): UrlParams {
    return urlParams
}