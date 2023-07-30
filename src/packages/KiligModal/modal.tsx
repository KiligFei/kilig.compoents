import { CloseOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import useTrigger from '../useTrigger/index'
import type { MsModalAction, MsModalProps } from './types'

const SIZE_WIDTH_MAP = {
  small: 500,
  middle: 700,
  large: 900,
}

const KiligModal = forwardRef<MsModalAction, MsModalProps>((props, ref) => {
  const { destroyOnClose = false, maskClosable = false, onOk, onCancel, closable, size = 'small', width, ...restProps } = props
  const { open, trigger, toggle, setOpen } = useTrigger(props)
  const [okLoading, setOkLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)

  const _width = width ?? (size && SIZE_WIDTH_MAP[size])
  const handleOk = async () => {
    try {
      setOkLoading(true)
      await onOk?.()
      setOpen(false)
    }
    finally {
      setOkLoading(false)
    }
  }
  const handleCancel = async () => {
    try {
      setCancelLoading(true)
      await onCancel?.()
      setOpen(false)
    }
    finally {
      setCancelLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    toggle,
    setOpen,
  }))
  return (
    <>
      {trigger}
      <Modal
        width={width}
        open={open}
        destroyOnClose={destroyOnClose}
        maskClosable={maskClosable}
        okButtonProps={{ loading: okLoading, disabled: cancelLoading }}
        cancelButtonProps={{ loading: cancelLoading, disabled: okLoading }}
        closable={closable ?? !(okLoading || cancelLoading)}
        closeIcon={<CloseOutlined />}
        onOk={handleOk}
        onCancel={handleCancel}
        {...restProps}
      />
    </>
  )
})

export default KiligModal
