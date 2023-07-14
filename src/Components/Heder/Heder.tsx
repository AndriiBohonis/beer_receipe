import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useBeer } from '../../Store/store'
import s from './Heder.module.scss'
export const Heder = () => {
	const { countFavorite } = useBeer(state => ({
		countFavorite: state.favoriteList.length,
	}))
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
				<Link to={'/'}>
					<div className={s.logo}>Beer</div>
				</Link>
				<div className={s.favorite_block}>
					<Link to={'favorite'}>
						<BsHeartFill className={s.icon} />
						{countFavorite ? <div className={s.cart_counter}>{countFavorite}</div> : <></>}
					</Link>
				</div>
			</div>
		</div>
	)
}
