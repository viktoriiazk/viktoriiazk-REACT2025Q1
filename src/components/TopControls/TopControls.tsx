import { Component } from 'react';
import styles from './TopControls.module.css';
import Search from '../Search/Search';
import Button from '../Button/Button';
import TopControlsProps from './TopControls.props';

class TopControls extends Component<TopControlsProps> {
  triggerError = () => {
    throw new Error('Error! Something went wrong.');
  };

  render() {
    return (
      <div>
        <h1>Welcome to the React Components Class Task</h1>
        <div className={styles.controls}>
          <Search
            initialSearchTerm={this.props.searchTerm}
            onSearch={this.props.onSearch}
          />
          <div className={styles.btns}>
            <Button onClick={this.triggerError} label="Trigger Error" />
          </div>
        </div>
      </div>
    );
  }
}

export default TopControls;
