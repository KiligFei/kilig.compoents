// src/app.js

import NiceModal from '@ebay/nice-modal-react'
import React from 'react'

export function rootContainer(container: any) {
  // 在根组件外层添加 Provider
  return <React.StrictMode>
    <NiceModal.Provider>
      {container}
    </NiceModal.Provider>
  </React.StrictMode>
}
