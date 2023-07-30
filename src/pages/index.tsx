import { Button } from 'antd'
import KiligModal from '../packages/KiligModal'

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(''), time))
}

const PromiseResolveModal = KiligModal.create((props: { title: string }) => {
  const { title } = props
  const modal = KiligModal.useModal()
  const handleOk = async () => {
    await sleep(1000)
    modal.resolve('弹窗Promise成功返回的内容')
    modal.close()
  }

  return (
    <KiligModal {...modal.props} title={title} onOk={handleOk}>
      <p>点击确认按钮等待1s，查看控制台的消息</p>
    </KiligModal>
  )
})

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <Button onClick={() => KiligModal.open(PromiseResolveModal, { title: 'Nate' }).then(console.log)}>Promise成功</Button>
    </div>
  )
}
