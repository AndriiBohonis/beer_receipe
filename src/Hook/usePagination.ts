import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IBeer } from '../Type/type'

export const usePagination = (beerList: IBeer[]) => {
	const [page, setPage] = useState(1)
	const [data, setData] = useState<IBeer[]>([])
	const [lastEl, setLastEl] = useState(15)
	const { ref, inView } = useInView({
		threshold: 0,
		initialInView: false,
	})

	useEffect(() => {
		if (inView) {
			setLastEl(lastEl + 5)
			if (lastEl === beerList.length - 5) {
				setPage(page + 1)
			}
		}
	}, [inView])
	useEffect(() => {
		setData(beerList.slice(0, lastEl))
	}, [beerList, lastEl])

	return { data, ref, page }
}
