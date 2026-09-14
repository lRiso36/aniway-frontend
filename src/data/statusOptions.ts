import type { UserAnimeStatus } from "../types/UserAnimeEntryType.types"

export const statusOptions: {value: UserAnimeStatus, label: string}[] = [
    { value: "watching", label: "Watching" },
    { value: "planning", label: "Plan to watch" },
    { value: "completed", label: "Completed" },
    { value: "rewatching", label: "Rewatching" },
    { value: "paused", label: "Paused" },
    { value: "dropped", label: "Dropped" }
]
