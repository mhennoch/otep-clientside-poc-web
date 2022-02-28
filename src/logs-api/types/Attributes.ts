
export interface Attributes {
    [attributeKey: string]: AttributeValue | undefined;
}

export type AttributeValue =
    | string
    | number
    | boolean
    | Array<null | undefined | string>
    | Array<null | undefined | number>
    | Array<null | undefined | boolean>;
