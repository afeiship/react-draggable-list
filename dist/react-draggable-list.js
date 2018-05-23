!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("classnames"),require("noop"),require("object-assign"),require("prop-types"),require("react"),require("sortablejs")):"function"==typeof define&&define.amd?define(["classnames","noop","object-assign","prop-types","react","sortablejs"],t):"object"==typeof exports?exports.ReactDraggableList=t(require("classnames"),require("noop"),require("object-assign"),require("prop-types"),require("react"),require("sortablejs")):e.ReactDraggableList=t(e.classnames,e.noop,e["object-assign"],e["prop-types"],e.react,e.sortablejs)}(this,function(e,t,r,a,n,o){return function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="/",t(0)}([function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=a(n);t.default=o.default},function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){var r={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,u,c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},p=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),f=r(6),d=a(f),m=r(5),b=a(m),y=r(2),g=a(y),h=r(3),v=a(h),j=r(4),O=a(j),_=r(7),x=a(_),q=(u=l=function(e){function t(e){o(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r._onUpdate=function(e){var t=e.oldIndex,a=e.newIndex,n=r.props,o=n.items,s=n.onChange,i=n.itemKey,l=o[t];o[a];a<t?(o.splice(t,1),o.splice(a,0,l)):(o.splice(a+1,0,l),o.splice(t,1));var u=o.map(function(e,t){return e[i||t]});(0,O.default)(e.target,{value:u,items:o}),r.setState({items:o},function(){s(e)})},r._sortableGroupDecorator=function(e){if(e){var t=r.props,a=t.animation,n=t.itemKey,o=t.sortableOptions,s=(0,O.default)({animation:a,dataIdAttr:n,draggable:".react-draggable-list-item",ghostClass:"react-draggable-list-ghost",chosenClass:"react-draggable-list-chosen",dragClass:"react-draggable-list-drag",onUpdate:r._onUpdate},o);r._sortableIntance=x.default.create(e,s)}},r.state={items:e.items},r}return i(t,e),p(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.items;t!==this.state.items&&this.setState({items:t})}},{key:"render",value:function(){var e=this.props,t=e.className,r=(e.animation,e.items),a=e.template,o=e.itemKey,s=e.handles,i=(e.sortableOptions,n(e,["className","animation","items","template","itemKey","handles","sortableOptions"]));return d.default.createElement("div",c({className:(0,g.default)("react-draggable-list",t)},i,{ref:this._sortableGroupDecorator}),r.map(function(e,t){return d.default.createElement("div",{key:e[o]||t,className:"react-draggable-list-item"},s&&d.default.createElement("span",{className:"react-draggable-list-handles"},"☰"),a(e,t))}))}}]),t}(f.Component),l.propTypes={className:b.default.string,handles:b.default.bool,animation:b.default.number,onChange:b.default.func,itemKey:b.default.any,items:b.default.array,sortableOptions:b.default.object},l.defaultProps={handles:!1,animation:150,onChange:v.default,itemKey:"id",items:[],sortableOptions:{}},u);t.default=q},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t){e.exports=a},function(e,t){e.exports=n},function(e,t){e.exports=o}])});
//# sourceMappingURL=react-draggable-list.js.map