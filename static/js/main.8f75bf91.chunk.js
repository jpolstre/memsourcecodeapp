(window.webpackJsonpsavecodeapp=window.webpackJsonpsavecodeapp||[]).push([[0],{21:function(e,t,a){e.exports=a(37)},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(2),l=a.n(n),o=a(16),r=a.n(o),c=a(8),i=a(9),d=a(11),s=a(10),u=a(12),m=a(17),p=a(18),h=a.n(p),f=a(14),v=a(13),g=a.n(v);function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var E={root:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(a,!0).forEach(function(t){Object(m.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({fontSize:"12px",width:"100%",border:"1px solid mediumvioletred",borderRadius:"5px",boxSizing:"border-box",fontFamily:'"Dank Mono", "Fira Code", monospace'},g.a.plain)},b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(s.a)(t).call(this,e))).onValueChange=function(e){a.setState({code:e}),a.props.valueChange(e)},a.highlight=function(e){return l.a.createElement(f.a,Object.assign({},f.b,{theme:g.a,code:e,language:a.props.codeSelected.languaje}),function(e){e.className,e.style;var t=e.tokens,a=e.getLineProps,o=e.getTokenProps;return l.a.createElement(n.Fragment,null,t.map(function(e,t){return l.a.createElement("div",a({line:e,key:t}),e.map(function(e,t){return l.a.createElement("span",o({token:e,key:t}))}))}))})},a.state={code:e.codeSelected.code,language:e.codeSelected.languaje},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return l.a.createElement(h.a,{value:this.props.codeSelected.code,onValueChange:this.onValueChange,highlight:this.highlight,padding:10,style:E.root})}}]),t}(n.Component),C=a(5);a(36);C.apps.length||C.initializeApp({apiKey:"AIzaSyDkhUoMj1amCq4Yzrz-1hTxP7c615j88ZI",authDomain:"appcode-137e8.firebaseapp.com",databaseURL:"https://appcode-137e8.firebaseio.com",projectId:"appcode-137e8",storageBucket:"",messagingSenderId:"863316602971",appId:"1:863316602971:web:1d80bfcee0fcd063"});var y=C.database(),k=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={filterText:"",titleForm:"New Block Code",swForm:!1,codes:[],codeSelected:{id:null,description:"",languaje:"",code:"",date:C.database.ServerValue.TIMESTAMP}},a.handledChange=function(e){var t=e.target,n=t.name,l=t.value,o=JSON.parse(JSON.stringify(a.state.codeSelected));o[n]=l,a.setState({codeSelected:o})},a.handledClickShowCode=function(e){a.setState({codeSelected:e,swForm:!0,titleForm:"Edit Block Code"})},a.handledClickDelete=function(e){window.confirm("Delete code?")&&(y.ref("codes").child(e.id).remove(),a.handledClickClear())},a.save=function(){if(""===a.state.codeSelected.description||""===a.state.codeSelected.languaje||""===a.state.codeSelected.code)alert("All fields required!");else{if(a.state.codeSelected.id){var e=JSON.parse(JSON.stringify(a.state.codeSelected));e.date=C.database.ServerValue.TIMESTAMP,y.ref().child("codes/".concat(a.state.codeSelected.id)).update(e)}else{var t=JSON.parse(JSON.stringify(a.state.codeSelected)),n=y.ref("codes").push().key;t.id=n,t.date=C.database.ServerValue.TIMESTAMP,y.ref("codes").child(n).set(t)}a.setState({swForm:!1}),a.handledClickClear()}},a.handledSubmitSave=function(e){e.preventDefault(),a.save()},a.valueChange=function(e){var t=JSON.parse(JSON.stringify(a.state.codeSelected));t.code=e,a.setState({codeSelected:t})},a.handledClickClear=function(){a.setState({codeSelected:{id:null,description:"",languaje:"",code:""},titleForm:"New Block Code"}),setTimeout(function(){document.getElementById("description")&&document.getElementById("description").focus()},100)},a.escFunction=function(e){27===e.keyCode&&(e.preventDefault(),a.setState({swForm:!1}))},a.handledClickAdd=function(){a.setState({swForm:!0,titleForm:"New Block Code"}),a.handledClickClear()},a.handledFilterChange=function(e){var t=e.target.value;a.setState({filterText:t})},a.handledClickFilerClear=function(){setTimeout(function(){a.setState({filterText:""}),document.getElementById("filter").focus()})},a.handledKeyDown=function(e){27===e.keyCode&&setTimeout(function(){a.setState({filterText:""}),document.getElementById("filter").focus()})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"setDataBaseStart",value:function(){var e=this;y.ref("codes").orderByChild("date").on("value",function(t){var a=t.val();if(a){var n=Object.keys(a).reverse().map(function(e){return a[e]});e.setState({codes:n})}})}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.escFunction,!1),this.setDataBaseStart()}},{key:"getFormatDate",value:function(e){var t=new Date(e);return"".concat((t.getMonth()+1).toString().padStart(2,"0"),"/").concat(t.getDate().toString().padStart(2,"0"),"/").concat(t.getFullYear().toString().padStart(4,"0")," ").concat(t.getHours().toString().padStart(2,"0"),":").concat(t.getMinutes().toString().padStart(2,"0"),":").concat(t.getSeconds().toString().padStart(2,"0"))}},{key:"getFilterCodes",value:function(){var e=this.state.filterText.trim().toLocaleLowerCase().split(" ");return e.length?this.state.codes.filter(function(t){var a=t.description.toLowerCase();return e.every(function(e){return a.indexOf(e)>-1||t.languaje.indexOf(e)>-1})}):this.state.codes}},{key:"render",value:function(){var e=this,t=this.getFilterCodes().map(function(t){return l.a.createElement("tr",{key:t.id},l.a.createElement("td",{onClick:function(){return e.handledClickShowCode(t)}},t.description),l.a.createElement("td",null,t.languaje),l.a.createElement("td",null,e.getFormatDate(t.date)),l.a.createElement("td",null,l.a.createElement("button",{onClick:function(){return e.handledClickDelete(t)}},"Delete")))}),a=void 0;if(this.state.swForm){var n="New Block Code"===this.state.titleForm?"bg-indigo":"bg-purple";a=l.a.createElement("form",{className:"box form ".concat(n),onSubmit:this.handledSubmitSave,autoComplete:"off"},l.a.createElement("h2",null,this.state.titleForm),l.a.createElement("br",null),l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"description"},"Description"),l.a.createElement("input",{type:"text",name:"description",id:"description",placeholder:"Description",value:this.state.codeSelected.description,onChange:this.handledChange})),l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"languaje"},"Languaje"),l.a.createElement("select",{type:"text",name:"languaje",id:"languaje",placeholder:"Languaje",value:this.state.codeSelected.languaje,onChange:this.handledChange},l.a.createElement("option",{value:""}),l.a.createElement("option",{value:"javascript"},"Javascript"),l.a.createElement("option",{value:"jsx"},"jsx"),l.a.createElement("option",{value:"tsx"},"tsx"),l.a.createElement("option",{value:"typescript"},"typescript"),l.a.createElement("option",{value:"coffeescript"},"coffeescript"),l.a.createElement("option",{value:"json"},"json"),l.a.createElement("option",{value:"html"},"html"),l.a.createElement("option",{value:"css"},"css"),l.a.createElement("option",{value:"sass"},"sass"),l.a.createElement("option",{value:"less"},"less"),l.a.createElement("option",{value:"php"},"php"),l.a.createElement("option",{value:"java"},"java"),l.a.createElement("option",{value:"visual-basic"},"visual-basic"),l.a.createElement("option",{value:"python"},"python"),l.a.createElement("option",{value:"ruby"},"ruby"))),l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"code"},"Code (ctrl+shift+v, paste whit format)"),l.a.createElement(b,{codeSelected:this.state.codeSelected,valueChange:function(t){return e.valueChange(t)}})),l.a.createElement("div",{className:"btns-option"},l.a.createElement("button",{type:"button",onClick:this.handledClickClear},"Clear"),l.a.createElement("button",{type:"submit"},"Save"),l.a.createElement("button",{type:"button",onClick:function(){e.setState({swForm:!1})}},"Close")))}else a=l.a.createElement("div",{className:"btn-add"},l.a.createElement("button",{type:"button",onClick:this.handledClickAdd},"Add"));return l.a.createElement(l.a.Fragment,null,a,l.a.createElement("div",{className:"flex"},l.a.createElement("div",{className:"box list"},l.a.createElement("h2",null,"Block Codes"),l.a.createElement("br",null),l.a.createElement("form",{className:"box filter",autoComplete:"off"},l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"filter"},"Filter"),l.a.createElement("input",{type:"text",name:"filter",id:"filter",placeholder:"Filter",value:this.state.filterText,onChange:this.handledFilterChange,onKeyDown:this.handledKeyDown})),l.a.createElement("span",{className:"clear-filter",onClick:this.handledClickFilerClear},"\xd7")),l.a.createElement("br",null),l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Description"),l.a.createElement("th",null,"Languaje"),l.a.createElement("th",null,"Update"),l.a.createElement("th",null,"Options"))),l.a.createElement("tbody",null,t)))))}}]),t}(l.a.Component);r.a.render(l.a.createElement(k,null),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.8f75bf91.chunk.js.map