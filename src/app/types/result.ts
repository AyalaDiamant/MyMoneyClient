export class Result {
    [x: string]: any;
    success: boolean;
    message: string;
}
export class GResult<T> extends Result {
    value: T;
}

