
import { Component } from 'react';
import withRouter from 'umi/withRouter';
import styles from './index.css'


class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return (
      <div id="base_layout" className={styles.base_layout} >
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Layout);

