(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{83:function(e,t,a){},84:function(e,t,a){},98:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(38),i=a.n(r),o=(a(83),a.p+"static/media/logo.6ce24c58.svg"),c=(a(84),a(14)),l=a(15),d=a(19),h=a(18),u=a(17),b=a(132),g=a(133),j=a(68),m=Object(j.a)("ws://18.220.211.136:5000"),p=a(2),v=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={username:"",password:"",er:""},e.handleUserChange=e.handleUserChange.bind(Object(d.a)(e)),e.handlePassChange=e.handlePassChange.bind(Object(d.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(d.a)(e)),e.ignoreError=e.ignoreError.bind(Object(d.a)(e)),e}return Object(l.a)(a,[{key:"handleSubmit",value:function(e){return e.preventDefault(),this.state.username?this.state.password?void m.emit("json",{command:"login",username:e.target[0].value,password:e.target[1].value}):this.setState({er:"Please Enter Your Password"}):this.setState({er:"Please Enter Your Username"})}},{key:"handleUserChange",value:function(e){this.setState({username:e.target.value})}},{key:"handlePassChange",value:function(e){this.setState({password:e.target.value})}},{key:"ignoreError",value:function(){this.setState({er:""})}},{key:"render",value:function(){return Object(p.jsx)("div",{className:"Login",children:Object(p.jsxs)("form",{onSubmit:this.handleSubmit,children:[this.state.er&&Object(p.jsxs)("h3",{"data-test":"er",onClick:this.ignoreError,children:[Object(p.jsx)("button",{onClick:this.ignoreError,children:"\u2716"}),this.state.er]}),Object(p.jsx)(b.a,{type:"text",label:"username",variant:"filled","data-test":"username",value:this.state.username,onChange:this.handleUserChange}),Object(p.jsx)(b.a,{type:"password",label:"password",variant:"filled","data-test":"password",value:this.state.password,onChange:this.handlePassChange}),Object(p.jsx)(g.a,{variant:"contained",type:"submit",value:"Log In","data-test":"submit",children:"Log In"})]})})}}]),a}(n.Component);var f=function(){return m.on("message",(function(e){"successful"===e.login||console.log("Login failed.")})),Object(p.jsx)("div",{className:"App",children:Object(p.jsxs)("header",{className:"App-header",children:[Object(p.jsx)("img",{src:o,className:"App-logo",alt:"logo"}),Object(p.jsx)(v,{})]})})},O=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,135)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),n(e),s(e),r(e),i(e)}))};i.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(f,{})}),document.getElementById("root")),O()}},[[98,1,2]]]);
//# sourceMappingURL=main.6af29cab.chunk.js.map