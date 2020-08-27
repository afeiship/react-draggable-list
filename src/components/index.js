import noop from '@feizheng/noop';
import ReactList from '@feizheng/react-list';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sortable from 'sortablejs';

const CLASS_NAME = 'react-draggable-list';
const DEFAULT_SORTABLE_OPTIONS = {
  animation: 300,
  draggable: `.${CLASS_NAME}__item`, // Specifies which items inside the element should be sortable
  ghostClass: 'react-draggable-list__ghost', // Class name for the drop placeholder
  chosenClass: 'react-draggable-list__chosen', // Class name for the chosen item
  dragClass: 'react-draggable-list__drag' // Class name for the dragging item
};

export default class ReactDraggableList extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * When sortable list changed.
     */
    onChange: PropTypes.func,
    /**
     * The list data source.
     */
    items: PropTypes.array,
    /**
     * The list item template.
     */
    template: PropTypes.func,
    /**
     * The uniq row key.
     */
    rowKey: PropTypes.any.isRequired,
    /**
     * The core sortable component options (@sortable: https://github.com/SortableJS/Sortable).
     */
    options: PropTypes.object
  };

  static defaultProps = {
    onChange: noop,
    items: [],
    template: noop,
    rowKey: 'id',
    options: {}
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
    onChange({ target: { value } });
  };

  handleRef = (inElement) => {
    const { rowKey, options } = this.props;
    const compoutedOptions = {
      dataIdAttr: rowKey,
      onUpdate: this.handleUpdate,
      ...DEFAULT_SORTABLE_OPTIONS,
      ...options
    };

    Sortable.create(inElement, compoutedOptions);
  };

  render() {
    const {
      className,
      children,
      animation,
      items,
      template,
      rowKey,
      options,
      ...props
    } = this.props;
    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}
        ref={this.handleRef}>
        <ReactList virtual items={items} template={this.template} />
        {children}
      </div>
    );
  }
}
