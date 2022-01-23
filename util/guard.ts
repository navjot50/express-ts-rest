export function isEmptyString(val: string) {
    return val.trim().length === 0;
}

export function isAnyEmptyString(...values: string[]) {
    for(const val of values) {
        if(isEmptyString(val)) {
            return true;
        }
    }
}