(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{353:function(e,t,n){},354:function(e,t,n){},624:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(57),o=n.n(i),r=(n(353),n(354),n(20)),c=n(18),l=n(35),h=n(26),d=n(25),u=n(315),b=n(318),j=n(334),p=Object(j.a)("ws://18.220.211.136:5000"),m=n.p+"static/media/logo.6ce24c58.svg",O=n(1),f=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this)).state={username:"",password:"",er:""},a.handleUserChange=a.handleUserChange.bind(Object(l.a)(a)),a.handlePassChange=a.handlePassChange.bind(Object(l.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(l.a)(a)),a.ignoreError=a.ignoreError.bind(Object(l.a)(a)),a}return Object(c.a)(n,[{key:"handleSubmit",value:function(e){return e.preventDefault(),this.state.username?this.state.password?void p.emit("json",{command:"login",username:e.target[0].value,password:e.target[1].value}):this.setState({er:"Please Enter Your Password"}):this.setState({er:"Please Enter Your Username"})}},{key:"handleUserChange",value:function(e){this.setState({username:e.target.value})}},{key:"handlePassChange",value:function(e){this.setState({password:e.target.value})}},{key:"ignoreError",value:function(){this.setState({er:""})}},{key:"render",value:function(){return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("img",{src:m,className:"App-logo",alt:"logo"}),Object(O.jsx)("div",{className:"Login",children:Object(O.jsxs)("form",{onSubmit:this.handleSubmit,children:[this.state.er&&Object(O.jsxs)("h3",{"data-test":"er",onClick:this.ignoreError,children:[Object(O.jsx)("button",{onClick:this.ignoreError,children:"\u2716"}),this.state.er]}),Object(O.jsx)(u.a,{type:"text",label:"username",variant:"filled","data-test":"username",value:this.state.username,onChange:this.handleUserChange}),Object(O.jsx)(u.a,{type:"password",label:"password",variant:"filled","data-test":"password",value:this.state.password,onChange:this.handlePassChange}),Object(O.jsx)(b.a,{variant:"contained",type:"submit",value:"Log In","data-test":"submit",children:"Log In"})]})})]})}}]),n}(a.Component),g=n(21),v=n(328),x=n.n(v),w=n(685),C=n(335),S=n(682),P=n(683),k=n(679),y=n(680),E=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).isShowModal=function(e){a.handleClose(),a.setState({showModal:e})},a.handleClose=function(){a.props.onPopupClose(!1)},a.handlePlatformChange=function(e){a.setState({platform:e.target.value})},a.send=function(e){console.log("here"),p.emit("json",{command:"INSERT",platform:a.state.platform}),a.handleClose(),a.isShowModal(!0)},a.state={showModal:!1,platform:""},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(O.jsx)(a.Fragment,{children:Object(O.jsxs)(y.a,{show:this.props.showModalPopup,onHide:this.handleClose,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(O.jsx)("form",{onSubmit:this.send,children:Object(O.jsxs)(y.a.Body,{children:[Object(O.jsx)(u.a,{variant:"filled",label:"platform",onChange:this.handlePlatformChange}),Object(O.jsx)(b.a,{variant:"contained",type:"submit",children:"Submit"})]})}),Object(O.jsx)("div",{className:"signUp",children:Object(O.jsx)(b.a,{variant:"outlined",onClick:function(){return e.isShowModal(!0)},children:" Close"})})]})})}}]),n}(a.Component),F=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this)).isShowPopup=function(e){a.setState({showPopup:e})},p.emit("json",{command:"SHOW",args:"None"}),a.state={showPopup:!1,subscriptions:[{id:1,name:"test_subscription"}],columns:["name"],info:"Click on a subscription for more data"},a}return Object(c.a)(n,[{key:"renderData",value:function(){return this.state.subscriptions.map((function(e,t){var n=e.id,a=e.name;return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:n}),Object(O.jsx)("td",{children:a})]},n)}))}},{key:"render",value:function(){var e=this;p.on("message",function(e){this.setState({subscriptions:[]}),e.subscriptions.forEach(function(e,t){this.setState({subscriptions:[].concat(Object(g.a)(this.state.subscriptions),[{id:t,name:e}])})}.bind(this))}.bind(this));var t=Object(C.a)();t=Object(S.a)(t);var n={selectableRows:"single",selectableRowsHideCheckboxes:!0,expandableRowsOnClick:!0,selectableRowsOnClick:!0,onRowSelectionChange:function(t,n,a){var s=n.map((function(t){return e.state.subscriptions.at(t.index)})).map((function(e){return e.name}));p.emit("json",{command:"SHOW",args:"INFO",data:s}),p.on("platform_data",function(e){this.setState({info:e})}.bind(e))}};return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)(w.a,{theme:t,children:[Object(O.jsxs)(k.a,{spacing:36,direction:"row",children:[Object(O.jsx)(b.a,{variant:"contained",onClick:function(){e.isShowPopup(!0)},children:"Insert"}),Object(O.jsx)(b.a,{variant:"contained",children:"Delete"})]}),Object(O.jsx)(x.a,{title:"Subscriptions",data:this.state.subscriptions,columns:this.state.columns,options:n})]}),Object(O.jsx)(E,{showModalPopup:this.state.showPopup,onPopupClose:this.isShowPopup})]}),Object(O.jsx)(P.a,{sx:{width:500,maxWidth:"100%"},children:this.state.info})]})}}]),n}(a.Component),M=n(333),N=n(17);var I=function(){return p.on("message",(function(e){"successful"===e.login?window.location="/home":"failed"===e.login&&console.log("Login failed.")})),Object(O.jsx)("div",{className:"App",children:Object(O.jsx)("header",{className:"App-header",children:Object(O.jsx)(M.a,{basename:"/",children:Object(O.jsxs)(N.c,{children:[Object(O.jsx)(N.a,{path:"/",element:Object(O.jsx)(f,{})}),Object(O.jsx)(N.a,{path:"/home",element:Object(O.jsx)(F,{})})]})})})})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,686)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),s(e),i(e),o(e)}))};o.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(I,{})}),document.getElementById("root")),L()}},[[624,1,2]]]);
//# sourceMappingURL=main.0ff77742.chunk.js.map