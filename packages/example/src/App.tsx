import { useEffect, useState } from 'react';
import ReactDraggableList from '../../lib/src';
import './App.css';

const items1 = [
  {
    title: '猫妖传1',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传2',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传3',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传4',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传5',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传6',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
];

const items2 = [
  {
    title: '猫妖传1',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传2',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传3',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传4',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传5',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    title: '猫妖传6',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
];


const sharedItems2 = [
  {
    id: 1,
    title: '猫妖传1',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 2,
    title: '猫妖传2',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 3,
    title: '猫妖传3',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 4,
    title: '猫妖传4',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 5,
    title: '猫妖传5',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 6,
    title: '猫妖传6',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 7,
    title: '猫妖传7',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
  {
    id: 8,
    title: '猫妖传8',
    img: 'http://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
    description: '讲述大唐传奇的奇幻剧',
  },
];

function App() {
  const onChange = (e) => {
    console.log('on change value: ', e.target.value);
  };

  const [sharedItems1, setSharedItems1] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      setSharedItems1([
        { id: 10, title: '猫妖传10' },
        { id: 11, title: '猫妖传11' },
        { id: 12, title: '猫妖传12' },
        { id: 13, title: '猫妖传13' },
        { id: 14, title: '猫妖传14' },
        { id: 15, title: '猫妖传15' },
        { id: 16, title: '猫妖传16' },
        { id: 17, title: '猫妖传17' },
      ]);
    }, 1000);
  }, []);

  return (
    <>
      <h1>react-draggable-list same group</h1>
      <ReactDraggableList
        name="shared"
        className="dg3"
        emptySlot={<div>empty1</div>}
        template={({ item }) => <div key={item.id}>{item.title}</div>}
        items={sharedItems1}
        onChange={onChange}
        onChooseDrop={(e) => {
          console.log('onDrop: ', e.target);
        }}
      />

      <ReactDraggableList
        name="shared"
        className="dg4"
        template={({ item }) => <div key={item.id}>{item.title}</div>}
        items={sharedItems2}
        emptySlot={() => <div>empty2</div>}
        onChange={onChange}
        onChooseDrop={(e) => {
          console.log('onDrop: ', e.target);
        }}
      />
      <hr />
      <h2>不同的group</h2>
      {/* <ReactDraggableList
        className="dg1"
        onChange={onChange}
        template={({ item }) => <div key={item.id}>{item.title}</div>}
        rowKey="title"
        items={items1}
      />

      <ReactDraggableList
        className="dg2"
        onChange={onChange}
        template={({ item }) => <div key={item.id}>{item.title}</div>}
        rowKey="title"
        items={items2}
      /> */}
    </>
  );
}

export default App;
