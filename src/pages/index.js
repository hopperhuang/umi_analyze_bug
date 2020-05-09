import React from 'react'
import { Modal } from 'antd-mobile';
import styles from './index.less';

class Index extends React.Component {
  render () {
    const object1 = {
      a: 'somestring',
      b: 42
    };
    for (let [key, value] of Object.entries(object1)) {
      console.log(`${key}: ${value}`);
    }
    console.log(navigator)
    const width = 400
    const height = 250
    const windowWith = window.innerWidth
    const canvasWidth = windowWith
    const canvasHeight = windowWith / width * height
    return (
      <div>
        <div className={styles.content} >
          这里是主要内容
          <div className={styles.name} >
            name
          </div>
          <canvas id="myChart" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
        <div className={styles.half} >
          一半
        </div>
        <Modal />
      </div>
    );
  }
}

export default Index
