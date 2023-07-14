import { Route, Routes } from 'react-router-dom'
import { BeerList } from './BeerList/BeerList'
import { BeerPage } from './BeerPage/BeerPage'
import { FavoriteList } from './FavoriteList/FavoriteList'
import { Heder } from './Heder/Heder'

function App() {
	return (
		<div className='App'>
			<Heder />
			<Routes>
				<Route path='/' element={<BeerList />} />
				<Route path='/favorite' element={<FavoriteList />} />
				<Route path='/:id' element={<BeerPage />} />
			</Routes>
		</div>
	)
}

export default App
