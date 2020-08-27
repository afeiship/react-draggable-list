# react-draggable-list
> A simple draggable list component.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @feizheng/react-draggable-list
```

## update
```shell
npm update @feizheng/react-draggable-list
```

## properties
| Name      | Type   | Required | Default | Description                                                                              |
| --------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------- |
| className | string | false    | -       | The extended className for component.                                                    |
| onChange  | func   | false    | noop    | When sortable list changed.                                                              |
| items     | array  | false    | []      | The list data source.                                                                    |
| template  | func   | false    | noop    | The list item template.                                                                  |
| rowKey    | any    | false    | 'id'    | The uniq row key.                                                                        |
| options   | object | false    | {}      | The core sortable component options (@sortable: https://github.com/SortableJS/Sortable). |


## usage
1. import css
  ```scss
  @import "~@feizheng/react-draggable-list/dist/style.scss";

  // customize your styles:
  $react-draggable-list-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactDraggableList from '@feizheng/react-draggable-list';
  import './assets/style.scss';

  class App extends React.Component {
    state = {
      items: [
        {
          title: '猫妖传1',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传2',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传3',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传4',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传5',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传6',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        }
      ],
      items2: [
        {
          title: '猫妖传1',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传2',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传3',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传4',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传5',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传6',
          img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
          description: '讲述大唐传奇的奇幻剧'
        }
      ]
    };

    onChange = (e) => {
      const { value } = e.target;
      console.log(value);
      // this.setState({ items });
    };

    render() {
      return (
        <div className="app-container">
          <ReactDraggableList
            className="dg1"
            onChange={this.onChange}
            template={({item, index}) => <div>{item.title}</div>}
            rowKey="title"
            items={this.state.items}
            ref="rc"
          />

          <ReactDraggableList
            className="dg2"
            onChange={this.onChange}
            template={({item, index}) => <div>{item.title}</div>}
            rowKey="title"
            items={this.state.items2}
            ref="rc"
          />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-draggable-list/


## license
Code released under [the MIT license](https://github.com/afeiship/react-draggable-list/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/react-draggable-list
[version-url]: https://npmjs.org/package/@feizheng/react-draggable-list

[license-image]: https://img.shields.io/npm/l/@feizheng/react-draggable-list
[license-url]: https://github.com/afeiship/react-draggable-list/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/react-draggable-list
[size-url]: https://github.com/afeiship/react-draggable-list/blob/master/dist/react-draggable-list.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/react-draggable-list
[download-url]: https://www.npmjs.com/package/@feizheng/react-draggable-list
