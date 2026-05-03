/**
 * 基础渲染测试
 * 验证 DraggableList 组件的基本渲染行为，包括：
 * - 能否正确渲染所有数据项
 * - 能否使用自定义容器 slot
 * - 空数据时能否正常渲染不报错
 * - 组件默认导出是否正确
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DraggableList } from '../src';
import DragListDefault from '../src';

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
    render(
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

  it('should render empty list without errors', () => {
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

  it('should export DraggableList as default export', () => {
    expect(DragListDefault).toBe(DraggableList);
  });
});
