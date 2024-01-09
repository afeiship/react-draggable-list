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

function App() {
  const onChange = (items) => {
    console.log('on  change: ', items);
  };

  return (
    <>
      <h1>react-draggable-list</h1>
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
