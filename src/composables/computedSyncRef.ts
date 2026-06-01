
import { type Ref, watch } from "vue"

/**
 * Sync two refs with transformation function in between
 * @param first First ref to sync
 * @param second Second ref to sync
 * @param firstToSecond Function to call when first ref updates, which returns
 * the new value of the second ref
 * @param secondToFirst Function to call when the second ref updates, which
 * returns the new value of the first ref
 * @returns Callback to stop sync
 */
export function computedSyncRef<T1, T2>(
    first: Ref<T1>,
    second: Ref<T2>,
    firstToSecond: (value: T1) => T2,
    secondToFirst: (value: T2) => T1,
): () => void {

    const {
        stop: stopRtl,
        pause: pauseRtl,
        resume: resumeRtl,
    } = watch(second, (value) => {
        pauseLtr()
        first.value = secondToFirst(value)
        resumeLtr()
    })

    const {
        stop: stopLtr,
        pause: pauseLtr,
        resume: resumeLtr,
    } = watch(first, (value) => {
        pauseRtl()
        second.value = firstToSecond(value)
        resumeRtl()
    }, { immediate: true })

    function stop(): void {
        stopLtr()
        stopRtl()
    }

    return stop

}