import { FC, useRef } from 'react'

import { Link } from 'react-router-dom'
import { useBeer } from '../../Store/store'
import { IBeer } from '../../Type/type'
import s from './BeerItem.module.scss'
interface IProps {
	data: IBeer
	isFavorite?: boolean
}

export const BeerItem: FC<IProps> = ({ data, isFavorite }) => {
	const { addToFavorite, removeFavorite } = useBeer(state => ({
		addToFavorite: state.addToFavorite,
		removeFavorite: state.removeFavorite,
	}))
	const ref = useRef<HTMLHeadingElement>(null)

	const handlerAddFavorite: React.MouseEventHandler<HTMLElement> = event => {
		event.preventDefault()
		addToFavorite(data)
	}
	const handlerRemoveFavorite: React.MouseEventHandler<HTMLButtonElement> = event => {
		event.preventDefault()

		const sectionRef = ref.current
		if (sectionRef && isFavorite) {
			sectionRef.classList.toggle(s.anime)
			setTimeout(() => removeFavorite(data.id), 700)
		} else {
			removeFavorite(data.id)
		}
	}
	return (
		<Link className={s.link} to={`/${data.id}`}>
			<section ref={ref} onContextMenu={handlerAddFavorite} className={s.container}>
				<div>
					<img className={s.cart_img} src={data.image_url} alt={data.name}></img>
				</div>
				<div className={s.info}>
					<h2 className={s.name}>{data.name}</h2>
					<div>Brewed in:{data.first_brewed}</div>
					<div>Ph {data.ph}</div>
					<div>ABV {data.abv}</div>
				</div>
				{data.isFavorite && (
					<button className={s.delete} onClick={handlerRemoveFavorite}>
						delete
					</button>
				)}
			</section>
		</Link>
	)
}
