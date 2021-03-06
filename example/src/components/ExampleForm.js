import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { Input, Textarea, CheckboxGroup, RadioGroup, Dropdown } from 'package';

const Main = styled.div`
  & > * {
    padding: 32px 16px;
  }
`;

class ExampleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      switch: 'ON',
      pets: '',
      airport: ['SFO'],
    };

    this.updateField = this.updateField.bind(this);
    this.callToRedux = _.debounce(this.callToRedux.bind(this), 1000);
  }

  callToRedux(value) {
    console.log('Updating field now to Redux: ', value);
  }

  updateField(e, value, field) {
    this.setState({ [field]: value }, this.callToRedux(value));
  }

  render() {
    return (
      <Main>
        <Dropdown
          searchable
          multiselect
          value={this.state.airport}
          onChange={(e, value) => {
            this.setState({ airport: value });
          }}
          label="Airport"
          placeholder="Airport"
          options={[
            { key: 'SFO', text: 'San Francisco' },
            { key: 'JFK', text: 'John F. Kennedy Airport' },
            { key: 'ORD', text: 'O\'Hare International Airport' }
          ]}
        />

        <Input
          autoFocus
          value={this.state.name}
          onChange={this.updateField}
          propName="name"
          // onChange={(e) => _.debounce(() => this.setState({ name: e.target.value }), 1000)}
          label="Name"
          labelWidth="600px"
          placeholder="Name"
        />

        <Textarea
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          label="Description"
          placeholder="Description"
        />

        <RadioGroup
          value={this.state.switch}
          onChange={e => this.setState({ switch: e.target.value })}
          label="Light Switch"
          options={[{ key: 'ON', text: 'On' }, { key: 'OFF', text: 'Off' }]}
        />

        <CheckboxGroup
          value={this.state.pets}
          onChange={(e, value) => this.setState({ pets: value })}
          label="Light Switch"
          options={[{ key: 'CAT', text: 'Cat' }, { key: 'DOG', text: 'Dog' }]}
        />
      </Main>
    );
  }
}

export default ExampleForm;
