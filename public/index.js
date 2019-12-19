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
