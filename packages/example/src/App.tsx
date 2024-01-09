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

const sharedItems1 = [
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
];

const sharedItems2 = [
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

  return (
    <>
      <h1>react-draggable-list same group</h1>
      <ReactDraggableList
        className="dg3"
        onChange={onChange}
        template={({ item }) => <div>{item.title}</div>}
        rowKey="id"
        items={sharedItems1}
        options={{ group: 'shared' }}
        onDrop={(e) => {
          console.log('onDrop: ', e.target.value);
        }}
      />

      <ReactDraggableList
        className="dg4"
        onChange={onChange}
        template={({ item }) => <div>{item.title}</div>}
        rowKey="id"
        items={sharedItems2}
        options={{ group: 'shared' }}
        onDrop={(e) => {
          console.log('onDrop: ', e.target.value);
        }}
      />
      <hr />
      <h2>不同的group</h2>
      <ReactDraggableList
        className="dg1"
        onChange={onChange}
        template={({ item }) => <div>{item.title}</div>}
        rowKey="title"
        items={items1}
      />

      <ReactDraggableList
        className="dg2"
        onChange={onChange}
        template={({ item }) => <div>{item.title}</div>}
        rowKey="title"
        items={items2}
      />
    </>
  );
}

export default App;
