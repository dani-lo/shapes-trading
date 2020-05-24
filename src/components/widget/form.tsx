import React, { Component } from 'react';

import * as STLib from '@styled/index';

interface IProps {
  foo?: boolean;
}
interface IState {
  value: string;
}

class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    const { value } = event.target;

    this.setState(() => {
      return {
        value,
      };
    });
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <STLib.STButton>go go go duderss</STLib.STButton>
        </form>
        <h2>fooooo?</h2>
      </div>
    );
  }
}

export { Form };
