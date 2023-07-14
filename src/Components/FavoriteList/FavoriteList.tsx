import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wrapper } from '../../Hoc/Wrapper'
import { useBeer } from '../../Store/store'
import { BeerItem } from '../BeerItem/BeerItem'

export const FavoriteList = () => {
	const { favoriteList } = useBeer(state => ({
		favoriteList: state.favoriteList,
	}))
	const navigate = useNavigate()

	useEffect(() => {
		if (!favoriteList.length) {
			navigate('/')
		}
	}, [favoriteList.length])
	return (
		<Wrapper>
			{favoriteList.map(item => (
				<BeerItem isFavorite={true} key={item.id} data={item} />
			))}
		</Wrapper>
	)
}
