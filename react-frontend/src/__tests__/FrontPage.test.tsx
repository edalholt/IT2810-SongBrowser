import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App';
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { mocks } from '../__mocks__/datamock'; 

// test if the title renders correctly
test('should render title', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(await screen.findByText("Spotify explorer")).toBeInTheDocument();
});

//tests if the search button renders correctly
test('should render search button', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(await screen.findByText("Search")).toBeInTheDocument();
});

// tests if the search bar renders correctly
test('should render search box', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
});

// tests if the sort-by drop-down menu renders correctly
test('should render sort-by box', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const sortByElement = screen.getByText("Sort by");
  expect(sortByElement).toBeInTheDocument();
});

// tests if the order (asc/desc) drop-down menu renders correctly
test('should render order-by box', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const orderByElement = screen.getByText("Order");
  expect(orderByElement).toBeInTheDocument();
});

// test input in the serach bar
test('test input', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const input = screen.getByPlaceholderText("Search...")
  fireEvent.change(input, { target: { value: 'kygo' } })
  expect(screen.getByPlaceholderText("Search...")).toHaveValue("kygo")
});