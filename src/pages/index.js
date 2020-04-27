import React from 'react'
import styles from './index.less';

class Index extends React.Component {
  render () {
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
      </div>
    );
  }
}

export default Index
