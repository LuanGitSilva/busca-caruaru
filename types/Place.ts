export type Place = {
    map(arg0: (post: Place) => any): import("react").ReactNode;
    id: number;
    name: string;
    text: string;
    image?: any;
    contact: string;
    address: string;
}