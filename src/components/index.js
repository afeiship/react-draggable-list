import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import Sortable from 'sortablejs';
import objectAssign from 'object-assign';

const CLASS_NAME = 'react-draggable-list';

export default class extends Component {
  static displayName = CLASS_NAME;
  static propTypes = {
    className: PropTypes.string,
    handles: PropTypes.bool,
    animation: PropTypes.number,
    onChange: PropTypes.func,
    itemKey: PropTypes.any,
    items: PropTypes.array,
    sortableOptions: PropTypes.object
  };

  static defaultProps = {
    handles: false,
    animation: 150,
    onChange: noop,
    itemKey: 'id',
    items: [],
    sortableOptions: {}
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      items: inProps.items
    };
  }

  componentWillReceiveProps(inProps) {
    const { items } = inProps;
    if (items !== this.state.items) {
      this.setState({ items });
    }
  }

  onUpdate = (inEvent) => {
    const { oldIndex, newIndex } = inEvent;
    const { items, onChange, itemKey } = this.props;
    const oldItem = items[oldIndex];
    const newItem = items[newIndex];
    //up
    if (newIndex < oldIndex) {
      items.splice(oldIndex, 1);
      items.splice(newIndex, 0, oldItem);
    } else {
      //down:
      items.splice(newIndex + 1, 0, oldItem);
      items.splice(oldIndex, 1);
    }

    const value = items.map((item, index) => item[itemKey || index]);
    objectAssign(inEvent.target, { value, items });

    this.setState({ items }, () => {
      onChange(inEvent);
    });
  };

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const { animation, itemKey, sortableOptions } = this.props;
      // const ghostClass = ;
      const options = objectAssign(
        {
          animation: animation,
          dataIdAttr: itemKey,
          draggable: '.react-draggable-list-item', // Specifies which items inside the element should be sortable
          // group: "shared",
          ghostClass: 'react-draggable-list-ghost', // Class name for the drop placeholder
          chosenClass: 'react-draggable-list-chosen', // Class name for the chosen item
          dragClass: 'react-draggable-list-drag', // Class name for the dragging item
          onUpdate: this.onUpdate
        },
        sortableOptions
      );
      this._sortableIntance = Sortable.create(
        componentBackingInstance,
        options
      );
    }
  };

  render() {
    const {
      className,
      animation,
      items,
      template,
      itemKey,
      handles,
      sortableOptions,
      ...props
    } = this.props;
    return (
      <div
        className={classNames('react-draggable-list', className)}
        {...props}
        ref={this.sortableGroupDecorator}>
        {items.map((item, index) => (
          <div
            key={item[itemKey] || index}
            className="react-draggable-list-item">
            {handles && (
              <span className="react-draggable-list-handles">&#9776;</span>
            )}
            {template(item, index)}
          </div>
        ))}
      </div>
    );
  }
}
