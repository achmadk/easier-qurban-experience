import { useMemo } from 'react'

import { addRefProps, PropsWithInnerRef } from '../../../utils'

import styles from './base.module.scss'

interface FooterBaseProps extends PropsWithInnerRef {}

const FooterBase = <PropType extends FooterBaseProps = FooterBaseProps>({ innerRef }: PropType) => {
  const dateFirstRelease = useMemo(() => 2022, [])
  const dateNow = useMemo(() => (new Date()).getFullYear(), [])

  const yearLabel = dateFirstRelease === dateNow ? `${dateFirstRelease}` : `${dateFirstRelease}-${dateNow}`

  return (
    <footer ref={innerRef} className={styles.footer}>
      <div className="container flex col items-center between text-gray-600">
        <span>This web app initially use as my participation to <a href="https://planetscale.com/?utm_source=hashnode&utm_medium=hackathon&utm_campaign=announcement_article" target="_blank" rel="noreferrer noopener">PlanetScale</a> and <a href="https://hashnode.com/?source=planetscale_hackathon_announcement" target="_blank" rel="noreferrer noopener">Hashnode</a> hackathon</span>
        <span>{`@ ${yearLabel} Achmad Kurnianto`}</span>
      </div>
    </footer>
  )
}

export const Footer = addRefProps(FooterBase)