import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react'
import { Modal } from 'antd'
import type { ComponentType } from 'react'
import useOpen from './hooks'
import InternalMsModal from './modal'
import type { MsModalProps } from './types'

export type { MsModalProps }

interface MsModalHandler<Props = Record<string, unknown>> {
  props: {
    open: boolean
    onCancel: () => Promise<any>
    onOk: () => Promise<any>
    afterClose: () => void
  }
  open: (args?: Props) => Promise<unknown>
  close: () => Promise<unknown>
  destroy: () => void
  resolve: (args?: unknown) => void
  reject: (args?: unknown) => void
}

declare function UseModalFC(): MsModalHandler
declare function UseModalFC(modal: string, args?: any): MsModalHandler

type MsModalComponent = ComponentType<Omit<MsModalProps, 'useModal'>> & {
  useOpen: typeof useOpen
  create: typeof NiceModal.create
  useModal: typeof UseModalFC
  open: typeof NiceModal.show
  close: typeof NiceModal.hide
  destroy: typeof NiceModal.remove
} & typeof Modal

const MsModal = InternalMsModal as unknown as MsModalComponent

MsModal.useOpen = useOpen
MsModal.useModal = ((...props: any) => {
  const modal = (useModal as any).apply(props)
  modal.props = antdModalV5(modal)
  modal.open = modal.show
  modal.close = modal.hide
  modal.destroy = modal.remove
  return modal
}) as any

MsModal.info = Modal.info
MsModal.success = Modal.success
MsModal.warning = Modal.warning
MsModal.error = Modal.error
MsModal.confirm = Modal.confirm
MsModal.destroyAll = Modal.destroyAll
MsModal.create = NiceModal.create
MsModal.open = NiceModal.show
MsModal.close = NiceModal.hide
MsModal.destroy = NiceModal.remove

export default MsModal
