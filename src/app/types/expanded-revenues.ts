// export class ExpandedRevenues {

// }

export class DaysRevenuesExpanded {
    presenceId: number;
    userId: number;
    day: number;
    hours: number;
    inEdit: boolean = false;
}

export class ProductsRevenuesExpanded {
    productId: number;
    userId: number;
    day: number;
    product: string;
    productType: string;
    productValue: number;
    productQuantity: number;
    inEdit: boolean = false;
}
