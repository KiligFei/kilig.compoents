import React, { useRef } from 'react'
import KiligModal from './modal'
import type { MsModalAction, MsModalProps, UseOpenType } from './types'

const useOpen: UseOpenType = () => {
  const actionRef = useRef<MsModalAction>(null)
  const NewModal: React.FC<MsModalProps> = (props) => {
    return <KiligModal {...props} ref={actionRef} />
  }

  return [
    NewModal,
    {
      toggle: () => {
        actionRef.current?.toggle()
      },
      setOpen: (open: boolean) => {
        actionRef.current?.setOpen(open)
      },
    },
  ]
}

export default useOpen
