import prisma from "./prisma";

export default {
    getAllPlaces: async () => {
        const users = await prisma.place.findMany({
            where: {
                contact: {
                    startsWith: '(81)'
                }
            },
            select: {
                id: true,
                name: true,
                text: true,
                contact: true,
                address: true,
                image: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        return users;
    },
    addPlace: async (id: number, name: string, text: string, contact: string, address: string, image: string) => {
        return await prisma.place.create({
            data: {
                id,
                name,
                text,
                contact,
                address,
                image
            }
        });
    },
    getPlace: async (id: number) => {
        const place = await prisma.place.findUnique({
            where: { id }
        });
        return place;
    },
    updatePlace: async (id?: number, name?: string, text?: string, contact?: string, address?: string, image?: string) => {
        let data: {
            name?: string;
            text?: string;
            contact?: string;
            address?: string;
            image?: string;
        } = {};
    
        if (name) { data.name = name }
        if (text) { data.text = text }
        if (contact) { data.contact = contact }
        if (address) { data.address = address }
        if (image) { data.image = image }
    
        const updatedPlace = await prisma.place.update({
            where: {
                id
            },
            data
        });
        return updatedPlace;
    },
    deletePlace: async (id: number) => {
        return await prisma.place.delete({ 
            where: { id }
         })
    }
}