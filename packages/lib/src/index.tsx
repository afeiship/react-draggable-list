import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';
import classNames from 'classnames';
import React, { Component } from 'react';
import Sortable from 'sortablejs';

const CLASS_NAME = 'react-draggable-list';
const DEFAULT_SORTABLE_OPTIONS = {
  animation: 300,
  draggable: `.${CLASS_NAME}__item`, // Specifies which items inside the element should be sortable
  ghostClass: 'react-draggable-list__ghost', // Class name for the drop placeholder
  chosenClass: 'react-draggable-list__chosen', // Class name for the chosen item
  dragClass: 'react-draggable-list__drag', // Class name for the dragging item
};

// @ts-ignore
export interface ReactDraggableListProps extends Omit<React.HTMLAttributes<any>, 'onChange'> {
  items: any[];
  template: (args: { item: any; index: number }) => React.ReactNode;
  className?: string;
  onChange?: (inEvent: { target: { value: any[] } }) => void;
  rowKey?: any;
  options?: any;
}

export default class ReactDraggableList extends Component<ReactDraggableListProps> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    items: [],
    template: noop,
    rowKey: 'id',
    options: DEFAULT_SORTABLE_OPTIONS,
  };

  template = ({ item, index }) => {
    const { template, rowKey } = this.props;
    return (
      <div key={item[rowKey]} className={`${CLASS_NAME}__item`}>
        {template({ item, index })}
      </div>
    );
  };

  handleUpdate = (inEvent) => {
    const { oldIndex, newIndex } = inEvent;
    const { items, onChange, rowKey } = this.props;
    const oldItem = items[oldIndex];
    //up
    if (newIndex < oldIndex) {
      items.splice(oldIndex, 1);
      items.splice(newIndex, 0, oldItem);
    } else {
      //down:
      items.splice(newIndex + 1, 0, oldItem);
      items.splice(oldIndex, 1);
    }
    const value = items.map((item) => item[rowKey]);
    onChange!({ target: { value } });
  };

  handleRef = (inElement) => {
    if (!inElement) return;
    const { rowKey, options } = this.props;
    const compoutedOptions = {
      dataIdAttr: rowKey,
      onUpdate: this.handleUpdate,
      ...options,
    };

    Sortable.create(inElement, compoutedOptions);
  };

  render() {
    const { className, children, items, template, rowKey, options, ...props } = this.props;
    return (
      // @ts-ignore
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}
        ref={this.handleRef}>
        <ReactList items={items} template={this.template} />
        {children}
      </div>
    );
  }
}
