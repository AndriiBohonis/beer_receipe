import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IBeer } from '../Type/type'

export const usePagination = (beerList: IBeer[]) => {
	const [page, setPage] = useState(1)
	const [data, setData] = useState<IBeer[]>([])
	const [firstEl, setFirstEl] = useState(() => -5)
	const [lastEl, setLastEl] = useState(() => 10)
	const { ref, inView } = useInView({
		threshold: 0,
		initialInView: false,
	})
	useEffect(() => {
		if (inView) {
			setFirstEl(firstEl + 5)
			setLastEl(lastEl + 5)
			if (lastEl === beerList.length) {
				setPage(page + 1)
				setFirstEl(0)
				setLastEl(15)
			}
		}
	}, [inView, beerList])

	useEffect(() => {
		setData(beerList.slice(firstEl, lastEl))
	}, [beerList, firstEl])

	return { data, ref, page }
}
