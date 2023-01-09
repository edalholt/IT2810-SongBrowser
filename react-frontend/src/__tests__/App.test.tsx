import React from 'react';
import { render} from '@testing-library/react';
import App from '../App';
import {mocks} from '../__mocks__/datamock'; 
import { MockedProvider } from '@apollo/client/testing';

it("should match snapshot", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(mocks).toMatchSnapshot();
});


