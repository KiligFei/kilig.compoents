import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button, Modal } from 'antd'
import MsModal from '../packages/MsModal'

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(''), time))
}

const PromiseResolveModal = MsModal.create((props: { title: string }) => {
  const { title } = props
  const modal = MsModal.useModal()
  const handleOk = async () => {
    await sleep(1000)
    modal.resolve('弹窗Promise成功返回的内容')
    modal.close()
  }

  return (
    <MsModal {...modal.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1s，查看控制台的消息</p>
    </MsModal>
  )
})

export const MyAntdModal = NiceModal.create(({ name }: { name: string }) => {
  const modal = useModal()
  return (
    <Modal title="Hello Antd" visible={modal.visible} onOk={modal.hide} onCancel={modal.hide} afterClose={modal.remove}>
      Greetings: {name}!
    </Modal>
  )
})
export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <Button onClick={() => NiceModal.show(MyAntdModal, { name: 'Nate' })}>MyAntdModal</Button>
      <Button onClick={() => MsModal.open(PromiseResolveModal, { title: 'Nate' }).then(console.log)}>Promise成功</Button>
    </div>
  )
}
