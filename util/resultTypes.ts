interface SuccessResult {
    isSuccess: true;
}

interface FailedResult {
    isSuccess: false;
    error: string;
}

interface SuccessResultT<T> extends SuccessResult {
    result: T;
}

export type Result = SuccessResult | FailedResult;
export type ResultT<T> = SuccessResultT<T> | FailedResult;