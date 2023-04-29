import prisma from "./prisma";

export default {
    getAllPlaces: async () => {
        const users = await prisma.place.findMany({
            where: {
                active: true
            },
            select: {
                id: true,
                name: true,
                text1: true,
                text2: true,
                text3: true,
                image1: true,
                image2: true,
                image3: true,
                contact: true,
                address: true,
                maps: true,
                type: true,
                products: true,
                services: true,
                publicservice: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        return users;
    },
    addPlace: async (id: number, name: string, text1: string, text2: string, text3: string, image1: string, image2: string, image3: string, contact: string, address: string, maps: string, type: string) => {
        return await prisma.place.create({
            data: {
                id,
                name,
                text1,
                text2,
                text3,
                image1,
                image2,
                image3,
                contact,
                address,
                maps,
                type
            }
        });
    },
    getPlace: async (id: number) => {
        const place = await prisma.place.findUnique({
            where: { id }
        });
        return place;
    },
    updatePlace: async (id?: number, name?: string, text1?: string, text2?: string, text3?: string, image1?: string, image2?: string, image3?: string, contact?: string, address?: string, maps?: string, type?: string) => {
        let data: {
            name?: string,
            text1?: string,
            text2?: string,
            text3?: string,
            image1?: string,
            image2?: string,
            image3?: string,
            contact?: string,
            address?: string,
            maps?: string,
            type?: string,
        } = {};
    
        if (name) { data.name = name }
        if (text1) { data.text1 = text1 }
        if (text2) { data.text2 = text2 }
        if (text3) { data.text3 = text3 }
        if (image1) { data.image1 = image1 }
        if (image2) { data.image2 = image2 }
        if (image3) { data.image3 = image3 }
        if (contact) { data.contact = contact }
        if (address) { data.address = address }
        if (maps) { data.maps = maps }
        if (type) { data.type = type }
    
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
    },
    getUserAdm: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    },
    getAllProducts: async () => {
        const products = await prisma.product.findMany({
            where: {
                active: true
            },
            select: {
                id: true,
                active: true,
                image: true,
                text: true,
                type: true,
                price: true,
                store: true,
                title: true,
                userId: true

            },
            orderBy: {
                id: 'asc'
            }
        });

        return products;
    },
    addProduct: async (id: number, image: string, text: string, type: string, price: string, store: string, title: string, userId: number) => {
        return await prisma.product.create({
            data: {
                id,
                image,
                text,
                type,
                price,
                store,
                title,
                userId
            }
        });
    },
    getProduct: async (id: number) => {
        const product = await prisma.product.findUnique({
            where: { id }
        });
        return product;
    },
    updateProduct: async (id: number, image: string, text: string, type: string, price: string, store: string, title: string, userId: number) => {
        let data: {
            image?: string,
            text?: string,
            type?: string,
            price?: string,
            store?: string,
            title?: string,
            userId?: number
        } = {};
    
        if (title) { data.title = title }
        if (text) { data.text = text }
        if (image) { data.image = image }
        if (type) { data.type = type }
        if (price) { data.price = price }
        if (store) { data.store = store }
        if (userId) { data.userId = userId }
    
        const updatedProduct = await prisma.product.update({
            where: {
                id
            },
            data
        });
        return updatedProduct;
    },
    deleteProduct: async (id: number) => {
        return await prisma.product.delete({ 
            where: { id }
         })
    },
    getAllServices: async () => {
        const services = await prisma.service.findMany({
            where: {
                active: true
            },
            select: {
                id: true,
                active: true,
                image: true,
                text: true,
                type: true,
                price: true,
                store: true,
                title: true,
                userId: true

            },
            orderBy: {
                id: 'asc'
            }
        });

        return services;
    },
    addService: async (id: number, image: string, text: string, type: string, price: string, store: string, title: string, userId: number) => {
        return await prisma.service.create({
            data: {
                id,
                image,
                text,
                type,
                price,
                store,
                title,
                userId
            }
        });
    },
    getService: async (id: number) => {
        const service = await prisma.service.findUnique({
            where: { id }
        });
        return service;
    },
    updateService: async (id: number, image: string, text: string, type: string, price: string, store: string, title: string, userId: number) => {
        let data: {
            image?: string,
            text?: string,
            type?: string,
            price?: string,
            store?: string,
            title?: string,
            userId?: number
        } = {};
    
        if (title) { data.title = title }
        if (text) { data.text = text }
        if (image) { data.image = image }
        if (type) { data.type = type }
        if (price) { data.price = price }
        if (store) { data.store = store }
        if (userId) { data.userId = userId }
    
        const updatedService = await prisma.service.update({
            where: {
                id
            },
            data
        });
        return updatedService;
    },
    deleteService: async (id: number) => {
        return await prisma.service.delete({ 
            where: { id }
         })
    },
    getAllPublicServices: async () => {
        const publicServices = await prisma.publicService.findMany({
            where: {
                active: true
            },
            select: {
                id: true,
                active: true,
                image: true,
                text: true,
                type: true,
                price: true,
                store: true,
                title: true,
                userId: true

            },
            orderBy: {
                id: 'asc'
            }
        });

        return publicServices;
    },
    addPublicService: async (id: number, image: string, text: string, type: string, price: string, store: string, title: string, userId: number) => {
        return await prisma.publicService.create({
            data: {
                id,
                image,
                text,
                type,
                price,
                store,
                title,
                userId
            }
        });
    },
    getPublicService: async (id: number) => {
        const publicService = await prisma.publicService.findUnique({
            where: { id }
        });
        return publicService;
    },
    updatePublicService: async (id: number, image: string, text: string, type: string, price: string, store: string, title: string, userId: number) => {
        let data: {
            image?: string,
            text?: string,
            type?: string,
            price?: string,
            store?: string,
            title?: string,
            userId?: number
        } = {};
    
        if (title) { data.title = title }
        if (text) { data.text = text }
        if (image) { data.image = image }
        if (type) { data.type = type }
        if (price) { data.price = price }
        if (store) { data.store = store }
        if (userId) { data.userId = userId }
    
        const updatedPublicService = await prisma.publicService.update({
            where: {
                id
            },
            data
        });
        return updatedPublicService;
    },
    deletePublicService: async (id: number) => {
        return await prisma.publicService.delete({ 
            where: { id }
         })
    },
    getAllProductsType: async () => {
        const productstype = await prisma.productType.findMany({
            where: {
                active: true
            },
            select: {
                title: true

            },
            orderBy: {
                id: 'asc'
            }
        });

        return productstype;
    },
    addProductType: async (title: string) => {
        return await prisma.productType.create({
            data: {
                title
            }
        });
    },
    getAllServicesType: async () => {
        const servicestype = await prisma.serviceType.findMany({
            where: {
                active: true
            },
            select: {
                title: true

            },
            orderBy: {
                id: 'asc'
            }
        });

        return servicestype;
    },
    addServiceType: async (title: string) => {
        return await prisma.serviceType.create({
            data: {
                title
            }
        });
    },
    getAllPublicServicesType: async () => {
        const publicservicestype = await prisma.publicServiceType.findMany({
            where: {
                active: true
            },
            select: {
                title: true

            },
            orderBy: {
                id: 'asc'
            }
        });

        return publicservicestype;
    },
    addPublicServiceType: async (title: string) => {
        return await prisma.publicServiceType.create({
            data: {
                title
            }
        });
    }
}