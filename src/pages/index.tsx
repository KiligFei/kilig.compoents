import { Button } from 'antd'
import { useState } from 'react'
import KiligModal from '../packages/KiligModal'

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(() => resolve(''), time))
}

const PromiseResolveModal = KiligModal.create((props: { title: string}) => {
  console.log('🚀 ~ file: index.tsx:10 ~ props:', props)
  const { title } = props
  const modal = KiligModal.useModal()
  const handleOk = async () => {
    await sleep(1000)
    modal.resolve('弹窗Promise成功返回的内容')
    modal.close()
  }

  return (
    <KiligModal {...modal.props} title={title} onOk={handleOk} trigger={<div>trigger</div>} >
      <p>点击确认按钮等待1s，查看控制台的消息</p>
    </KiligModal>
  )
})

export default function HomePage() {
  const [visible, setVisible] = useState<boolean>(true);
  const onClose=()=>{
    console.log('🚀 ~ file: index.tsx:27 ~ visible:', visible)
    setVisible(false)
  }
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <Button onClick={() => KiligModal.open(PromiseResolveModal, { title: 'Nate' }).then(console.log)}>Promise成功</Button>
    </div>
  )
}
