
import type { UseSnapAreaReturn } from "@/composables/useSnapArea"
import type { InjectionKey } from "vue"

/** Injection key provided by SnapArea component */
export const snapAreaKey = Symbol() as InjectionKey<UseSnapAreaReturn>