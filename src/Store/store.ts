import { create } from 'zustand'

import { BeerRecept } from '../API'
import { IBeer } from '../Type/type'

interface BeerReceptStore {
	beerList: IBeer[]
	favoriteList: IBeer[]
	beerReceipt: IBeer[]
	loading: boolean
	error: string | null
	fetchBeerList: (num: number) => Promise<void>
	fetchBeerReceipt: (num: number) => Promise<void>
	addToFavorite: (beerRecept: IBeer) => void
	removeFavorite: (id: number) => void
}

export const useBeer = create<BeerReceptStore>((set, get) => ({
	beerList: [],
	favoriteList: [],
	beerReceipt: [] as IBeer[],
	loading: false,
	error: null,

	fetchBeerList: async (page: number) => {
		set({ loading: true })
		try {
			const response = await BeerRecept.getBeerReceptList(page)
			set({ beerList: [...get().beerList, ...response.data], error: null })
		} catch (error: unknown) {
			set({
				error: 'Request error, please try again later',
				loading: false,
			})
		} finally {
			set({ loading: false })
		}
	},
	fetchBeerReceipt: async id => {
		set({ loading: true })
		try {
			const response = await BeerRecept.getCurrentBeerRecept(id)
			set({ beerReceipt: [...get().beerList, ...response.data], error: null })
		} catch (error: unknown) {
			set({
				error: 'Request error, please try again later',
				loading: false,
			})
		} finally {
			set({ loading: false })
		}
	},

	addToFavorite: beerRecept => {
		{
			const newItem = beerRecept
			const currentItem = get().favoriteList.find(item => item.id === newItem.id)?.isFavorite

			if (!currentItem) {
				set({
					beerList: [
						...get().beerList.map(item =>
							item.id === beerRecept.id ? { ...item, isFavorite: true } : { ...item }
						),
					],

					favoriteList: [...get().favoriteList, { ...newItem, isFavorite: true }],
				})
			} else {
				set({
					beerList: [
						...get().beerList.map(item =>
							item.id === beerRecept.id ? { ...item, isFavorite: false } : { ...item }
						),
					],
					favoriteList: [...get().favoriteList.filter(item => item.id !== newItem.id)],
				})
			}
		}
	},
	removeFavorite: id => {
		set({
			beerList: [
				...get().beerList.map(item =>
					item.id === id ? { ...item, isFavorite: false } : { ...item }
				),
			],
			favoriteList: [...get().favoriteList.filter(item => item.id !== id)],
		})
	},
}))
