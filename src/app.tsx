import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { Form } from '@widget/form';

import { theme } from '@styled/theme';

const wrapper = document.getElementById('container');

const App = (
  <ThemeProvider theme={theme}>
    <Form />
  </ThemeProvider>
);

ReactDOM.render(App, wrapper);
