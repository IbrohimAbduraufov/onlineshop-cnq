import { defineStore } from "pinia";

export const useCards = defineStore({
    id: 'products', 
    state: () => ({
        products: null,
        totalProducts: 0
    }),
    actions: {
        async getCards(){
            try {
                const res = await fetch('https://dummyjson.com/products?limit=100')
                const data = await res.json()
                const totalProducts = data.length
                this.products = data.products
                this.totalProducts = totalProducts
            } catch(error){
                console.log('Произошла ошибка при получении карточек', error);
            }
        }
    },
    getters:{}
})
