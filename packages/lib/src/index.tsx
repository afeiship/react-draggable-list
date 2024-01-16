import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';
import classNames from 'classnames';
import React, { Component } from 'react';
import { ReactSortable } from 'react-sortablejs'

// @thankto: https://github.com/SortableJS/react-sortablejs/issues/55

const CLASS_NAME = 'react-draggable-list';
const DEFAULT_SORTABLE_OPTIONS = {
  animation: 300,
  draggable: `.${CLASS_NAME}__item`, // Specifies which items inside the element should be sortable
  ghostClass: 'react-draggable-list__ghost', // Class name for the drop placeholder
  chosenClass: 'react-draggable-list__chosen', // Class name for the chosen item
  dragClass: 'react-draggable-list__drag', // Class name for the dragging item
};

const randomKey = () => Math.random().toString(36).substr(2);


// @ts-ignore
export interface ReactDraggableListProps extends Omit<React.HTMLAttributes<any>, 'onChange'> {
  name?: string;
  items: any[];
  template: (args: { item: any; index: number }) => React.ReactNode;
  emptySlot?: React.ReactNode;
  className?: string;
  onChange?: (inEvent: { target: { value: any[] } }) => void;
  onChooseDrop?: (inEvent: any) => void;
  rowKey?: any;
  options?: any;
}

interface ReactDraggableListState {
  stateItems: any[];
}

export default class ReactDraggableList extends Component<ReactDraggableListProps> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    onChooseDrop: noop,
    items: [],
    template: noop,
    rowKey: 'id',
    options: DEFAULT_SORTABLE_OPTIONS,
  };

  static cachedItems = {};
  private cacheKey: string;


  constructor(inProps) {
    super(inProps);
    const { items } = inProps;
    this.cacheKey = randomKey();
    ReactDraggableList.cachedItems[this.cacheKey] = items;
    this.state = { stateItems: items };
  }

  template = ({ item, index }) => {
    const { template, rowKey } = this.props;
    return (
      <div key={item[rowKey]} className={`${CLASS_NAME}__item`}>
        {template({ item, index })}
      </div>
    );
  };

  handleAdd = (inEvent) => {
    const { newIndex, oldIndex, from } = inEvent;
    const cacheKey = from.id;
    const cachedItems = ReactDraggableList.cachedItems[cacheKey];
    const currentCacheItems = ReactDraggableList.cachedItems[this.cacheKey];
    const { name, onChange, onChooseDrop, rowKey } = this.props;
    const newItem = cachedItems[oldIndex];
    currentCacheItems.splice(newIndex, 0, newItem);
    const value = currentCacheItems.map((item) => item[rowKey]);
    this.execChange(currentCacheItems);
    onChange!({ target: { value } });
    onChooseDrop!({ target: { value: newItem[rowKey], name } });
  };

  handleRemove = (inEvent) => {
    const { oldIndex, from } = inEvent;
    const cacheKey = from.id;
    const cacheItems = ReactDraggableList.cachedItems[cacheKey];
    const { onChange, rowKey } = this.props;
    cacheItems.splice(oldIndex, 1);
    const value = cacheItems.map((item) => item[rowKey]);
    this.execChange(cacheItems);
    onChange!({ target: { value } });
  };

  handleUpdate = (inEvent) => {
    const { oldIndex, newIndex } = inEvent;
    const { name, onChange, onChooseDrop, rowKey } = this.props;
    const { stateItems } = this.state;
    const oldItem = stateItems[oldIndex];
    //up
    if (newIndex < oldIndex) {
      stateItems.splice(oldIndex, 1);
      stateItems.splice(newIndex, 0, oldItem);
    } else {
      //down:
      stateItems.splice(newIndex + 1, 0, oldItem);
      stateItems.splice(oldIndex, 1);
    }
    const value = stateItems.map((item) => item[rowKey]);
    this.execChange(stateItems);
    onChange!({ target: { value } });
    onChooseDrop!({ target: { value: oldItem[rowKey], name } });
  };

  execChange = (inItems) => {
    this.setState({ stateItems: inItems.slice(0) });
  }

  render() {
    const {
      className,
      children,
      template,
      rowKey,
      options,
      onChooseDrop,
      emptySlot,
      ...props
    } = this.props;

    const { stateItems } = this.state;

    if (stateItems.length === 0 && emptySlot) return emptySlot;

    return (
      <ReactSortable
        id={this.cacheKey}
        group={name}
        className={classNames(CLASS_NAME, className)}
        list={stateItems}
        setList={noop}
        onUpdate={this.handleUpdate}
        onAdd={this.handleAdd}
        onRemove={this.handleRemove}
        {...options}
        {...props}
      >
        {stateItems.length > 0 && <ReactList items={stateItems} template={this.template} />}
      </ReactSortable>
    );
  }
}
