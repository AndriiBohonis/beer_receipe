import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { Wrapper } from '../../Hoc/Wrapper'
import { usePagination } from '../../Hook/usePagination'
import { useBeer } from '../../Store/store'
import { BeerItem } from '../BeerItem/BeerItem'
export const BeerList = () => {
	const { fetchBeerList, beerList } = useBeer(
		state => ({
			fetchBeerList: state.fetchBeerList,
			beerList: state.beerList,
		}),
		shallow
	)

	const { data, ref, page } = usePagination(beerList)

	useEffect(() => {
		fetchBeerList(page)
	}, [page])

	return (
		<Wrapper>
			{data.map((item, index) => {
				if (data.length === index + 1) {
					return <BeerItem lastElementRef={ref} key={item.id} data={item} />
				} else {
					return <BeerItem key={item.id} data={item} />
				}
			})}
		</Wrapper>
	)
}
