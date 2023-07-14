interface IVolume {
	value: number
	unit: string
}
interface IMash_temp {
	temp: IVolume
	duration: number
}
interface IMethod {
	mash_temp: IMash_temp[]
}
interface IFermentation {
	temp: IVolume
	twist: null | string
}
interface IMalt {
	name: string
	amount: IVolume
}
interface IIngredients {
	malt: IMalt[]
}
interface IHosp {
	name: string
	amount: IVolume
}
export interface IBeer {
	id: number
	name: string
	tagline: string
	first_brewed: string
	description: string
	image_url: string
	abv: number
	ibu: number
	target_fg: number
	target_og: number
	ebc: number
	srm: number
	ph: number
	attenuation_level: number
	volume: IVolume
	boil_volume: IVolume
	method: IMethod
	fermentation: IFermentation
	ingredients: IIngredients
	hosp: IHosp[]
	yeast: string
	food_pairing: string[]
	brewers_tips: string
	contributed_by: string
	isFavorite: boolean
}
