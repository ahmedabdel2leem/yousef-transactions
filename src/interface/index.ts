export interface ICutomers {
    id: number,
    name: string,
}

export interface ITransactions {
    id: number,
    customer_id: number,
    date: Date,
    amount: number,
}

export interface IRowData extends ICutomers {
    transactions: ITransactions[];
}