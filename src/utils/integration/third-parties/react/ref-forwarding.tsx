import { forwardRef } from 'react'
import type { Ref, ComponentType } from 'react'

export interface PropsWithInnerRef<RefElement = HTMLDivElement> {
  innerRef?: Ref<RefElement>
}

export function addRefProps<
  RefElement = HTMLDivElement,
  ComponentProps extends PropsWithInnerRef<RefElement> = PropsWithInnerRef<RefElement>
>(Component: ComponentType<ComponentProps>) {
  const forwardRefCallback = (props, ref) => <Component innerRef={ref} {...props} />
  return forwardRef<RefElement, ComponentProps>(forwardRefCallback)
}
