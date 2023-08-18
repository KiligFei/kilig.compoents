import { useControllableValue } from 'ahooks'
import React, { useMemo } from 'react'

export interface TriggerProps {
  trigger?: React.ReactNode
  open?: boolean
  onClose?: ((e: React.MouseEvent | React.KeyboardEvent) => void) | (() => void)
}
/**
 * 组件调用方式
 * 1.只传 trigger，由组件内部维护 open,setOpen
 * 2.不传 trigger，传 open 和 onClose，由调用者维护 open 和 setOpen
 */
function useTrigger(props: Record<string, any> & TriggerProps) {
  console.log('🚀 ~ file: index.tsx:15 ~ props:', props)
  const { trigger } = props
  const [open, setOpen] = useControllableValue<boolean>(props, {
    valuePropName: 'open',
    trigger: 'onClose',
  })
  const triggerDom = useMemo(() => {
    if (trigger) {
      const _trigger = trigger as any
      return React.cloneElement(_trigger, {
        key: 'trigger',
        ..._trigger.props,
        onclick: (e: any) => {
          setOpen(true)
          _trigger.props.onClick?.(e)
        },
      })
    }
    return null
  }, [setOpen, trigger])

  return {
    trigger: triggerDom,
    open,
    onClose: () => setOpen(false),
    setOpen: (flag: boolean) => setOpen(flag),
    toggle: () => setOpen(prev => !prev),
  }
}

export default useTrigger
