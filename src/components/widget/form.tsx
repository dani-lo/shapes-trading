import React, { Component } from 'react';

import * as STElement from '@styled/index';

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
          <STElement.STButton>go go go duderss</STElement.STButton>
        </form>
      </div>
    );
  }
}

export { Form };
