import axios from 'axios'
import { IBeer } from '../Type/type'

export const BeerRecept = {
	getBeerReceptList(num: number = 1) {
		return axios.get<IBeer[]>(`https://api.punkapi.com/v2/beers?page=${num}`)
	},
	getCurrentBeerRecept(num: number) {
		return axios.get<IBeer[]>(`https://api.punkapi.com/v2/beers/${num}`)
	},
}
