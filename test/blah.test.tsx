import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichText } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RichText />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
