import { FC, ReactNode } from 'react'
import s from './Wrapper.module.scss'
interface IProps {
	children: ReactNode
}

export const Wrapper: FC<IProps> = ({ children }) => {
	return <section className={s.wrapper}>{children}</section>
}
