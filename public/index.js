import React from 'react';
import ReactDOM from 'react-dom';
import ReactDraggableList from '../src/main';
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
    console.log('value: ',value);
  };

  render() {
    return (
      <div className="app-container">
        <ReactDraggableList
          className="dg1"
          onChange={this.onChange}
          template={({ item }) => <div>{item.title}</div>}
          rowKey="title"
          items={this.state.items}
        />

        <ReactDraggableList
          className="dg2"
          onChange={this.onChange}
          template={({ item }) => <div>{item.title}</div>}
          rowKey="title"
          items={this.state.items2}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
