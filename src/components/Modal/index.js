import React, { useRef, useEffect, useCallback, useState } from 'react'
import Portal from '../Portal'
import styles from './index.less'


function Modal(props) {
  const { visible, children, modalClick } = props

  // 点击 和 滑动控制回调
  const touchMove = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation();
  }, [])

  const handleModalClick = useCallback(() => {
    modalClick && modalClick()
  }, [modalClick])

  // 监听和移除弹窗的监听器
  // 禁止滑动: https://segmentfault.com/a/1190000018598630
  const modelEl = useRef(null)
  const [prevEl, setPrevEl] = useState(() => {
    if (modelEl) {
      return modelEl.current
    } else {
      return null
    }
  })
  useEffect(() => {
    if (visible) { // 可见
      // console.log('add')
      const el = modelEl.current
      el.addEventListener('touchmove', touchMove, { passive: false });
      setPrevEl(el)
    } else { // 不可见
      // console.log('remove')
      prevEl && prevEl.removeEventListener('touchmove', touchMove, { passive: false }); // 移除监听，防止内存泄漏
    }
  }, [prevEl, touchMove, visible])

  return (
    <Portal className="modal_portal" >
      {
        visible &&
        <div
          ref={modelEl}
          className={styles.modal_container}
          onClick={handleModalClick}
        >
          <div
            onClick={handleClick}
            onTouchStart={handleClick}
            onTouchEnd={handleClick}
            className={styles.content}
          >
            { visible && children }
          </div>
        </div>
      }
    </Portal>
  )
}

export default React.memo(Modal)


