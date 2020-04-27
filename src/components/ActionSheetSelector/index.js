
import React, { useState, useCallback, useEffect } from 'react'
import Modal from '../Modal'
import styles from './index.less'

function ActionSheetSelector(props) {
  const  {
      visible, // 是否可见
      modalClick, // 点击modal回调
      items, // 每项
      onClose, // 关闭回调
      onConfirm, // 去定回调
      type, // 单选还是多选
      defaultSelected // 默认选中
    } = props

  // 处理选中
  const [selected , setSelected] = useState(() => {
    if (defaultSelected) {
      return [...defaultSelected]
    } else {
      return []
    }
  })
  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])
  const onSelect = useCallback((key) => {
      if (type === 'multi') {
        const newSelected = [...selected]
        if (newSelected.includes(key)) { // 已经选中，反选
          const index = newSelected.indexOf(key)
          newSelected.splice(index, 1)
          setSelected(newSelected)
        } else { // 未选中，则加入选择
          newSelected.push(key)
          setSelected(newSelected)
        }
      } else {
        setSelected([ key ])
      }
  }, [selected, type])
  // 关闭
  const handleClose = useCallback(() => {
    onClose && onClose();
    setSelected([]);
  }, [onClose])
  // 确认
  const handleConfirm = useCallback(() => {
    onConfirm && onConfirm(selected);
    setSelected([])
  }, [onConfirm, selected])

  return (
    <Modal
      visible={visible}
      modalClick={modalClick}
    >
      <div className={styles.selector} >
        <div className={styles.selector_cancel_confirm}  >
          <div
            onClick={handleClose}
            className={styles.selector_cancel}
          >
            取消
          </div>
          <div
            onClick={handleConfirm}
            className={styles.selector_confirm}
          >
            完成
          </div>
        </div>
        <div className={styles.selector_item_container} >
          { items && items.map(item => {
            return (
              <div key={item.key} className={styles.selector_item} >
                <div
                  className={styles.selector_item_content}
                  onClick={() => { onSelect && onSelect(item.key) }}
                >
                  <div className={styles.selector_item_name} >
                    {item.name}
                  </div>
                  <div className={styles.selector_isSelected} >
                    {  selected.includes(item.key ) ?
                      <img
                        className={styles.selector_isSelected_icon}
                        alt=""
                        src="https://p1.meituan.net/myvideodistribute/9ade8f177caceeca93e13493d63e3e24349.png"
                      /> :
                      null
                    }
                  </div>
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    </Modal>
  )
}

export default React.memo(ActionSheetSelector)
