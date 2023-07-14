import { useEffect } from 'react'
import { Wrapper } from '../../Hoc/Wrapper'
import { usePagination } from '../../Hooc/usePagination'
import { useBeer } from '../../Store/store'
import { BeerItem } from '../BeerItem/BeerItem'
import { Spinner } from '../Spinners/Spinners'
import s from './BeerList.module.scss'
export const BeerList = () => {
	const { loading, error, fetchBeerList, beerList } = useBeer(state => ({
		loading: state.loading,
		error: state.error,
		fetchBeerList: state.fetchBeerList,
		beerList: state.beerList,
	}))
	const { data, ref, page } = usePagination(beerList)
	useEffect(() => {
		fetchBeerList(page)
		if (error) {
			alert(error)
		}
	}, [page])

	return (
		<Wrapper>
			{loading ? (
				<Spinner size={400} color={'rgb(25, 169, 169)'} />
			) : (
				<div>
					<div className={s.info}>
						{data.map(item => (
							<BeerItem key={item.id} data={item} />
						))}
					</div>
					<div ref={ref}></div>
				</div>
			)}
		</Wrapper>
	)
}
