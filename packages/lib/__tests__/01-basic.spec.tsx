import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DraggableList } from '../src';

const ITEMS = ['Alpha', 'Beta', 'Gamma'];

describe('DraggableList', () => {
  it('should render all items', () => {
    render(
      <DraggableList
        data={ITEMS}
        slots={{
          item: ({ item }) => <div data-testid="item">{item}</div>,
        }}
      />,
    );
    expect(screen.getAllByTestId('item')).toHaveLength(3);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('should render with a custom container slot', () => {
    const { container } = render(
      <DraggableList
        data={ITEMS}
        slots={{
          item: ({ item }) => <span>{item}</span>,
          container: ({ children }) => <section data-testid="custom-container">{children}</section>,
        }}
      />,
    );
    expect(screen.getByTestId('custom-container')).toBeInTheDocument();
  });

  it('should render empty list when data is empty', () => {
    const { container } = render(
      <DraggableList
        data={[]}
        slots={{
          item: ({ item }) => <div>{item}</div>,
        }}
      />,
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
