type ThousandConfig = {
    symbol: string;
    separator: ',';
};
type Options = {
    precision: number;
    integer: number;
    thousand: ThousandConfig;
};
export declare function formatMoney(num: any, options: Options): string;
export {};
