import { FC } from 'react'

import { Link } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useBeer } from '../../Store/store'
import { IBeer } from '../../Type/type'
import s from './BeerItem.module.scss'
interface IProps {
	data: IBeer
	lastElementRef?: React.LegacyRef<HTMLElement>
}

export const BeerItem: FC<IProps> = ({ data, lastElementRef }) => {
	const { addToFavorite, removeFavorite } = useBeer(
		state => ({
			addToFavorite: state.addToFavorite,
			removeFavorite: state.removeFavorite,
			loading: state.loading,
		}),
		shallow
	)

	const handlerAddFavorite: React.MouseEventHandler<HTMLElement> = event => {
		event.preventDefault()
		addToFavorite(data)
	}
	const handlerRemoveFavorite: React.MouseEventHandler<HTMLButtonElement> = event => {
		event.preventDefault()
		removeFavorite(data.id)
	}
	return (
		<Link className={s.link} to={`/page/${data.id}`}>
			<section ref={lastElementRef} onContextMenu={handlerAddFavorite} className={s.container}>
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
