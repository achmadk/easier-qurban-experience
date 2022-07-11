import { addRefProps, PropsWithInnerRef } from 'utils'

/* eslint-disable @next/next/no-html-link-for-pages */
const SectionHomeBase = ({ innerRef }: PropsWithInnerRef) => {
  return (
    <section ref={innerRef} id="home" className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
      <div className="text-center space-y-4">
        <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
          Taste
          <span className="text-blue-700"> easier experiences </span>
          when doing Qurban
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          Provide features for commitees to make ummah easier doing qurban
        </p>
      </div>
      <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
        <a
          href="/admin/home"
          className="px-10 py-3.5 w-full bg-blue-700 text-white text-center rounded-md shadow-md block sm:w-auto"
        >
          Sign In as commitee
        </a>
      </div>
    </section>
  )
}

export const SectionHome = addRefProps(SectionHomeBase)
