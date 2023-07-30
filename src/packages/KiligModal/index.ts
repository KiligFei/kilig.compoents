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

const KiligModal = InternalMsModal as unknown as MsModalComponent

KiligModal.useOpen = useOpen
KiligModal.useModal = ((...props: any) => {
  const modal = (useModal as any).apply(props)
  modal.props = antdModalV5(modal)
  modal.open = modal.show
  modal.close = modal.hide
  modal.destroy = modal.remove
  return modal
}) as any

KiligModal.info = Modal.info
KiligModal.success = Modal.success
KiligModal.warning = Modal.warning
KiligModal.error = Modal.error
KiligModal.confirm = Modal.confirm
KiligModal.destroyAll = Modal.destroyAll
KiligModal.create = NiceModal.create
KiligModal.open = NiceModal.show
KiligModal.close = NiceModal.hide
KiligModal.destroy = NiceModal.remove

export default KiligModal
