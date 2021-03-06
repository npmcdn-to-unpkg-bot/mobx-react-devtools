import React, { Component, PropTypes } from 'react';
import { getGlobalState, setGlobalState, restoreState, eventEmitter } from './globalStore';
import Panel from './Panel';
import Highlighter from './Highlighter';
import Graph from './Graph';

export default class DevTool extends Component {

  static propTypes = {
    hightlightTimeout: PropTypes.number,
    position: PropTypes.object,
    noPanel: PropTypes.bool,
    // logFilter: PropTypes.func,
  };

  static defaultProps = {
    noPanel: false,
  };

  componentWillMount() {
    this.setState(getGlobalState());
  }

  componentDidMount() {
    eventEmitter.on('update', this.handleUpdate);
    // if (this.props.logFilter) {
    //   setGlobalState({ logFilter: this.props.logFilter });
    // }
  }

  componentWillUnmount() {
    eventEmitter.removeListener('update', this.handleUpdate)
  }

  handleUpdate = () => this.setState(getGlobalState());

  handleToggleGraph = () => {
    this.setState({
      hoverBoxes: [],
      graphEnabled: !this.state.graphEnabled
    });
  };

  render() {
    const { noPanel } = this.props;
    const { renderingBoxes, hoverBoxes } = this.state;
    return (
      <div>
        {noPanel !== true && <Panel position={this.props.position} />}
        <Highlighter boxes={renderingBoxes.concat(hoverBoxes)} />
        <Graph />
      </div>
    );
  }
}


