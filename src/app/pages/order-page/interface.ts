export interface Restaurant {
    title:     string;
    data:      Category[];
    photo:     string;
    etaRange:  string;
    location:  string;
    fareBadge: string;
}

export interface Category {
    itemUuids:   string[];
    title:       string;
    uuid:        string;
    displayType: null;
    recipes:     Recipe[];
}

export interface Recipe {
    description:       string;
    imageUrl:          string;
    price:             number;
    title:             string;
    uuid:              string;
    nutritionalInfo:   NutritionalInfo;
    suspendUntil:      number;
    classifications:   any[];
    hasCustomizations: boolean;
    itemAttributeInfo: ItemAttributeInfo;
    tagSection:        TagSection | null;
}

export interface ItemAttributeInfo {
    dietaryLabels: string[] | null;
}

export interface NutritionalInfo {
    allergens:     string;
    displayString: string;
}

export interface TagSection {
    tags: Tag[];
    type: string;
}

export interface Tag {
    actionUuid:  string;
    leadingIcon: string;
    text:        string;
    bottomSheet: BottomSheet;
}

export interface BottomSheet {
    title:      Body;
    body:       Body;
    buttonText: string;
    heroImgUrl: string;
    paragraphs: null;
}

export interface Body {
    text: string;
}

export interface CartItems {
    productTitle: string;
    productPrice: number;
    productQuantity: number;
}


export interface OrderProduct {
    title: string;
    uuid: string;
    quantity: number;
}