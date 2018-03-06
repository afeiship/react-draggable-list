import './dev.scss';
import ReactDraggableList from './main';

/*===example start===*/

// install: npm install afeiship/react-draggable-list --save import : import
// ReactDraggableList from 'react-draggable-list'

class App extends React.Component {
    state = {
      items: [
        {
          title: '猫妖传1',
          img: 'http://placeholder.qiniudn.com/150x150',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传2',
          img: 'http://placeholder.qiniudn.com/150x150',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传3',
          img: 'http://placeholder.qiniudn.com/150x150',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传4',
          img: 'http://placeholder.qiniudn.com/150x150',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传5',
          img: 'http://placeholder.qiniudn.com/150x150',
          description: '讲述大唐传奇的奇幻剧'
        },
        {
          title: '猫妖传6',
          img: 'http://placeholder.qiniudn.com/150x150',
          description: '讲述大唐传奇的奇幻剧'
        }
      ]
    };

    constructor(props) {
        super(props);
        window.demo = this;
        window.refs = this.refs;
        window.rc = this.refs.rc;
    }
    _onChange = e =>{
      const { value } = e.target;
      console.log(value);
    };

    render() {
        return (
            <div className="hello-react-draggable-list">
                <ReactDraggableList
                  onChange={this._onChange}
                  template={(item, index) => <div>{ item.title }</div>}
                  itemKey='title'
                  items={ this.state.items }
                  ref='rc'/>
            </div>
        );
    }
}
/*===example end===*/

ReactDOM.render(
    <App/>, document.getElementById('app'));
