(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{358:function(e,t,n){},359:function(e,t,n){},629:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(57),o=n.n(i),r=(n(358),n(359),n(20)),c=n(18),l=n(35),u=n(26),d=n(25),h=n(320),m=n(322),b=n(338),j=Object(b.a)("ws://18.220.211.136:5000"),p=n.p+"static/media/logo.6ce24c58.svg",f=n(1),g=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this)).state={username:"",password:"",er:""},a.usernameChange=a.usernameChange.bind(Object(l.a)(a)),a.passwordChange=a.passwordChange.bind(Object(l.a)(a)),a.pass=a.pass.bind(Object(l.a)(a)),a.performSubmit=a.performSubmit.bind(Object(l.a)(a)),a}return Object(c.a)(n,[{key:"performSubmit",value:function(e){return e.preventDefault(),this.state.username?this.state.password?void j.emit("json",{command:"login",username:e.target[0].value,password:e.target[1].value}):this.setState({er:"Enter your password."}):this.setState({er:"Enter your username."})}},{key:"usernameChange",value:function(e){this.setState({username:e.target.value})}},{key:"passwordChange",value:function(e){this.setState({password:e.target.value})}},{key:"pass",value:function(){this.setState({er:""})}},{key:"render",value:function(){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("img",{src:p,className:"App-logo",alt:"logo"}),Object(f.jsx)("div",{className:"Login",children:Object(f.jsxs)("form",{onSubmit:this.performSubmit,children:[this.state.er&&Object(f.jsxs)("h3",{"data-test":"er",onClick:this.pass,children:[Object(f.jsx)("button",{onClick:this.pass,children:"\u2716"}),this.state.er]}),Object(f.jsx)(h.a,{type:"text",label:"username",variant:"filled","data-test":"username",value:this.state.username,onChange:this.usernameChange}),Object(f.jsx)(h.a,{type:"password",label:"password",variant:"filled","data-test":"password",value:this.state.password,onChange:this.passwordChange}),Object(f.jsx)(m.a,{variant:"contained",type:"submit",value:"Log In","data-test":"submit",children:"Log In"})]})})]})}}]),n}(a.Component),O=n(21),x=n(332),v=n.n(x),w=n(689),C=n(339),S=n(686),y=n(687),D=n(300),I=n(645),k=n(683),_=n(684),M=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).showingModal=function(e){a.close(),a.setState({showModal:e})},a.close=function(){a.props.onPopupClose(!1)},a.changeID=function(e){a.setState({subscription_id:e.target.value})},a.changePlatform=function(e){a.setState({platform:e.target.value})},a.changeAmount=function(e){a.setState({card_num:e.target.value})},a.changeCard=function(e){a.setState({card_num:e.target.value})},a.changeEmail=function(e){a.setState({email:e.target.value})},a.changeUsername=function(e){a.setState({username:e.target.value})},a.changePassword=function(e){a.setState({password:e.target.value})},a.send=function(e){console.log("here"),j.emit("json",{command:"INSERT",platform:a.state.platform,username:a.state.username,password:a.state.password,email:a.state.email}),a.close(),a.showingModal(!0)},a.state={showModal:!1,subscription_id:"",platform:"",next_amount_due:0,card_num:"",email:"",username:"",password:""},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return Object(f.jsx)(a.Fragment,{children:Object(f.jsxs)(_.a,{show:this.props.showModalPopup,onHide:this.close,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(f.jsx)("form",{onSubmit:this.send,children:Object(f.jsxs)(_.a.Body,{children:[Object(f.jsx)(h.a,{variant:"filled",label:"subscription ID",onChange:this.changeID}),Object(f.jsx)(h.a,{variant:"filled",label:"platform",onChange:this.changePlatform}),Object(f.jsx)(h.a,{variant:"filled",label:"Next Amount Due",onChange:this.changeAmount}),Object(f.jsx)(h.a,{variant:"filled",label:"Card Number",onChange:this.changeCard}),Object(f.jsx)(h.a,{variant:"filled",label:"Email",onChange:this.changeEmail}),Object(f.jsx)(h.a,{variant:"filled",label:"Username",onChange:this.changeUsername}),Object(f.jsx)(h.a,{variant:"filled",label:"Password",onChange:this.changePassword}),Object(f.jsx)(m.a,{variant:"contained",type:"submit",children:"Submit"})]})}),Object(f.jsx)("div",{className:"signUp",children:Object(f.jsx)(m.a,{variant:"outlined",onClick:function(){return e.showingModal(!0)},children:"Close"})})]})})}}]),n}(a.Component),P=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this)).isShowPopup=function(e){a.setState({showPopup:e})},j.emit("json",{command:"SHOW",args:"None"}),a.state={showPopup:!1,subscriptions:[{id:1,platform:"test_subscription",next_amount_due:0,card_num:"",email:"",username:"",password:""}],info:"Click on platform for more data",selectedRow:"N/A"},a}return Object(c.a)(n,[{key:"renderData",value:function(){return this.state.subscriptions.map((function(e,t){var n=e.id,a=e.platform;return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:n}),Object(f.jsx)("td",{children:a})]},n)}))}},{key:"remove",value:function(){j.emit("json",{command:"REMOVE",platform:this.state.selectedRow[0]})}},{key:"render",value:function(){var e=this;j.on("message",function(e){this.setState({subscriptions:[]}),e.subscriptions.forEach(function(e,t){this.setState({subscriptions:[].concat(Object(O.a)(this.state.subscriptions),[{id:e[0],platform:e[1],next_amount_due:e[2],billing_freq:e[3],card_num:e[4],email:e[5],username:e[6],password:e[7]}])})}.bind(this))}.bind(this));var t=Object(C.a)();t=Object(S.a)(t);var n=[{name:"id",options:{filterType:"custom",customFilterListOptions:{render:function(t){return t[0]&&t[1]&&e.state.ageFilterChecked?["Min ID: ".concat(t[0]),"Max ID: ".concat(t[1])]:t[0]&&t[1]&&!e.state.ageFilterChecked?"Min ID: ".concat(t[0],", Max ID: ").concat(t[1]):t[0]?"Min ID: ".concat(t[0]):t[1]?"Max ID: ".concat(t[1]):[]},update:function(e,t,n){return console.log("customFilterListOnDelete: ",e,t,n),0===t?e[n].splice(t,1,""):1===t?e[n].splice(t,1):-1===t&&(e[n]=[]),e}},filterOptions:{names:["id"],logic:function(e,t){return t[0]&&t[1]?e<t[0]||e>t[1]:t[0]?e<t[0]:!!t[1]&&e>t[1]},display:function(e,t,n,a){return Object(f.jsxs)("div",{children:[Object(f.jsx)(I.a,{children:"ID Number"}),Object(f.jsxs)(D.a,{row:!0,children:[Object(f.jsx)(h.a,{label:"min",value:e[n][0]||"",onChange:function(s){e[n][0]=s.target.value,t(e[n],n,a)},style:{width:"45%",marginRight:"5%"}}),Object(f.jsx)(h.a,{label:"max",value:e[n][1]||"",onChange:function(s){e[n][1]=s.target.value,t(e[n],n,a)},style:{width:"45%"}})]})]})}},print:!1}},{name:"platform",filter:!0},{name:"next_amount_due",filter:!0,options:{filterType:"custom",customFilterListOptions:{render:function(e){return e[0]&&e[1]?["Min ID: ".concat(e[0]),"Max ID: ".concat(e[1])]:e[0]&&e[1]?"Min ID: ".concat(e[0],", Max ID: ").concat(e[1]):e[0]?"Min ID: ".concat(e[0]):e[1]?"Max ID: ".concat(e[1]):[]},update:function(e,t,n){return 0===t?e[n].splice(t,1,""):1===t?e[n].splice(t,1):-1===t&&(e[n]=[]),e}},filterOptions:{names:["next_amount_due"],logic:function(e,t){return t[0]&&t[1]?e<t[0]||e>t[1]:t[0]?e<t[0]:!!t[1]&&e>t[1]},display:function(e,t,n,a){return Object(f.jsxs)("div",{children:[Object(f.jsx)(I.a,{children:"Next Amount Due"}),Object(f.jsxs)(D.a,{row:!0,children:[Object(f.jsx)(h.a,{label:"min",value:e[n][0]||"",onChange:function(s){e[n][0]=s.target.value,t(e[n],n,a)},style:{width:"45%",marginRight:"5%"}}),Object(f.jsx)(h.a,{label:"max",value:e[n][1]||"",onChange:function(s){e[n][1]=s.target.value,t(e[n],n,a)},style:{width:"45%"}})]})]})}}},print:!1},{name:"billing_freq"},{name:"card_num",filter:!0,options:{filterType:"textField"}},{name:"email",filter:!0,options:{filterType:"textField"}},{name:"username",filter:!0,options:{filterType:"textField"}},{name:"password",filter:!0,options:{filterType:"textField"}}],a={selectableRows:"single",selectableRowsHideCheckboxes:!0,expandableRowsOnClick:!0,selectableRowsOnClick:!0,selectToolbarPlacement:"none",onRowsDelete:function(){return!1},onRowSelectionChange:function(t,n,a){var s=n.map((function(t){return e.state.subscriptions.at(t.i)})).map((function(e){return e.platform}));e.setState({selectedRow:s}),j.emit("json",{command:"SHOW",args:"INFO",data:s}),j.on("platform_data",function(e){this.setState({info:e})}.bind(e))}};return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("div",{children:[Object(f.jsxs)(w.a,{theme:t,children:[Object(f.jsxs)(k.a,{spacing:36,direction:"row",children:[Object(f.jsx)(m.a,{variant:"contained",onClick:function(){e.isShowPopup(!0)},children:"Insert"}),Object(f.jsx)(m.a,{variant:"contained",onClick:function(){return e.remove()},children:"Delete"})]}),Object(f.jsx)(v.a,{title:"Subscriptions",data:this.state.subscriptions,columns:n,options:a})]}),Object(f.jsx)(M,{showModalPopup:this.state.showPopup,onPopupClose:this.isShowPopup})]}),Object(f.jsx)(y.a,{sx:{width:500,maxWidth:"100%"},children:this.state.info})]})}}]),n}(a.Component),F=n(337),N=n(17);var R=function(){return j.on("message",(function(e){"successful"===e.login?window.location="/home":"failed"===e.login&&console.log("Login failed.")})),Object(f.jsx)("div",{className:"App",children:Object(f.jsx)("header",{className:"App-header",children:Object(f.jsx)(F.a,{basename:"/",children:Object(f.jsxs)(N.c,{children:[Object(f.jsx)(N.a,{path:"/",element:Object(f.jsx)(g,{})}),Object(f.jsx)(N.a,{path:"/home",element:Object(f.jsx)(P,{})})]})})})})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,690)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),s(e),i(e),o(e)}))};o.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(R,{})}),document.getElementById("root")),E()}},[[629,1,2]]]);
//# sourceMappingURL=main.b8267bdc.chunk.js.map