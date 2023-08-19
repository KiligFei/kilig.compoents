import { Button } from 'antd'
import { useState } from 'react'
import KiligModal from '../packages/KiligModal'

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(''), time))
}

const PromiseResolveModal = KiligModal.create((props: any) => {
  const { title } = props
  const modal = KiligModal.useModal()
  const handleOk = async () => {
    await sleep(1000)
    modal.resolve('弹窗Promise成功返回的内容')
    modal.close()
  }
  return (
    <KiligModal {...modal.props} title={title} onOk={handleOk} >
      <p>点击确认按钮等待1s，查看控制台的消息</p>
    </KiligModal>
  )
})

const useParadigmModal = KiligModal.create(() => {
  const modal = KiligModal.useModal()
  const [NewModal] = KiligModal.useOpen()
  const [open, setOpen] = useState<boolean>(true)

  const onClose = async () => {
    await sleep(1000)
    setOpen(false)
    modal.resolve('弹窗Promise成功返回的内容')
  }
  const handleOk = async () => {
    await sleep(1000)
    modal.resolve('弹窗Promise成功返回的内容')
    setOpen(false)
  }

  const handleCancel = async () => {
    await sleep(1000)
    modal.resolve('handleCancel')
  }

  return <NewModal {...modal.props} trigger={<div>trigger</div>} />
})

export default function HomePage() {
  const clickUseOpen = () => {
    KiligModal.open(useParadigmModal)
  }

  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <Button onClick={() => KiligModal.open(PromiseResolveModal, { title: 'Nate' })}>Promise成功</Button>
      <Button onClick={() => clickUseOpen()}>useOpen</Button>
    </div>
  )
}
