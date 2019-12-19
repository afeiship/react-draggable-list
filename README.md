# react-draggable-list
> A simple draggable list component.

## installation
```shell
npm install -S @feizheng/react-draggable-list
```
## properties
| property        | type | description |
| --------------- | ---- | ----------- |
| className       | -    | -           |
| value           | -    | -           |
| onChange        | -    | -           |

## usage
1. import css
  ```scss
  @import "~@feizheng/react-draggable-list/dist/style.scss";

  // customize your styles:
  $react-draggable-list-options: ()
  ```
2. import js
  ```js
  import ReactDraggableList from '../src/main';
  import ReactDOM from 'react-dom';
  import React from 'react';
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
      const { value, items } = e.target;
      console.log(value, items);
      this.setState({ items });
    };

    render() {
      return (
        <div className="app-container">
          <ReactDraggableList
            className="dg1"
            onChange={this.onChange}
            template={(item, index) => <div>{item.title}</div>}
            itemKey="title"
            items={this.state.items}
            ref="rc"
          />

          <ReactDraggableList
            className="dg2"
            onChange={this.onChange}
            template={(item, index) => <div>{item.title}</div>}
            itemKey="title"
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
