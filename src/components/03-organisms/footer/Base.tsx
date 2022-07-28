import { useMemo } from 'react'
import clsx from 'clsx'

import { addRefProps, PropsWithInnerRef } from '../../../utils'

import styles from './base.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterBaseProps extends PropsWithInnerRef {
  /**
   * @default false
   */
  onlySpan?: boolean

  /**
   * @default false
   */
  underlinedLinks?: boolean
}

const FooterBase = <PropType extends FooterBaseProps = FooterBaseProps>({
  innerRef,
  onlySpan = false,
  underlinedLinks = false
}: PropType) => {
  const dateFirstRelease = useMemo(() => 2022, [])
  const dateNow = useMemo(() => new Date().getFullYear(), [])

  const yearLabel =
    dateFirstRelease === dateNow ? `${dateFirstRelease}` : `${dateFirstRelease}-${dateNow}`

  const linkClassName = clsx(underlinedLinks && 'underline')

  const mainComponent = (
    <>
      <span>
        This web app initially use as my participation to{' '}
        <a
          href="https://planetscale.com/?utm_source=hashnode&utm_medium=hackathon&utm_campaign=announcement_article"
          target="_blank"
          rel="noreferrer noopener"
          className={linkClassName}
        >
          PlanetScale
        </a>{' '}
        and{' '}
        <a
          href="https://hashnode.com/?source=planetscale_hackathon_announcement"
          target="_blank"
          rel="noreferrer noopener"
          className={linkClassName}
        >
          Hashnode
        </a>{' '}
        hackathon
      </span>
      <span>{`@ ${yearLabel} Achmad Kurnianto`}</span>
    </>
  )

  if (onlySpan) {
    return mainComponent
  }
  return (
    <footer ref={innerRef} className={styles.footer}>
      <div className="container flex flex-col items-center between text-gray-600 mx-auto">
        {mainComponent}
      </div>
    </footer>
  )
}

export const Footer = addRefProps(FooterBase)
