import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useBeer } from '../../Store/store'
import { Spinner } from '../Spinners/Spinners'
import s from './BeerReceipt.module.scss'

export const BeerPage = () => {
	const { fetchBeerReceipt, beerReceipt, loading } = useBeer(state => ({
		fetchBeerReceipt: state.fetchBeerReceipt,
		beerReceipt: state.beerReceipt,
		loading: state.loading,
	}))
	const { id } = useParams()
	useEffect(() => {
		if (id) fetchBeerReceipt(+id)
	}, [])
	if (!beerReceipt[0]) {
		return null
	}

	const {
		name,
		description,
		image_url,
		first_brewed,
		food_pairing,
		brewers_tips,
		tagline,
		ph,
		srm,
		ebc,
		abv,
	} = beerReceipt[0]

	return (
		<section className={s.container}>
			{loading ? (
				<Spinner size={400} color={'rgb(25, 169, 169)'} />
			) : (
				<div className={s.wrapper}>
					<div className={s.img_block}>
						<img className={s.img} src={image_url}></img>
						<div className={s.tagline}>{tagline}</div>
					</div>
					<div className={s.info_block}>
						<h2 className={s.name}>{name}</h2>
						<p className={s.description}>{description}</p>
						<p>First brewed: {first_brewed}</p>
						<div>
							<h4>Perfectly combined</h4>
							<ul>
								{food_pairing.map(item => (
									<li className={s.combined_list} key={item}>
										{item}
									</li>
								))}
							</ul>
							<ul className={s.characteristic}>
								<li>
									<span>ph:</span>
									<span>{ph}</span>
								</li>
								<li>
									<span>abv:</span>
									<span>{abv}</span>
								</li>
								<li>
									<span>ebd:</span>
									<span>{ebc}</span>
								</li>
								<li>
									<span>srm:</span>
									<span>{srm}</span>
								</li>
							</ul>
						</div>
						<div>
							<h4>Brewers tips</h4>
							<p>{brewers_tips}</p>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
