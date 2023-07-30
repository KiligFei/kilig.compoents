import type { ModalProps } from 'antd'
import type React from 'react'
import type { ComponentType } from 'react'

export type MsModalProps = Omit<ModalProps, 'onOk' | 'onCancel'> & {
  trigger?: React.ReactNode
  onOk?: () => Promise<any>
  onCancel?: () => Promise<any>
  size?: 'small' | 'middle' | 'large'
}

export type UseOpenType = () => [
  ComponentType<MsModalProps>,
  { toggle: () => void ;setOpen: (open: boolean) => void },
]

export interface MsModalAction { toggle: () => void ;setOpen: (open: boolean) => void }
