import { Footer } from "./Base";

import { addRefProps, PropsWithInnerRef } from "utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FooterAdminBaseProps extends PropsWithInnerRef {}

const FooterAdminBase = <
  PropType extends FooterAdminBaseProps = FooterAdminBaseProps
>({ innerRef }: PropType) => {
  return (
    <footer ref={innerRef} className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-blueGray-200" />
        <div
          className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full px-4">
            <div
              className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left flex flex-col">
              <Footer onlySpan underlinedLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const FooterAdmin = addRefProps(FooterAdminBase)