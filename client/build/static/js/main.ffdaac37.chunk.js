(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{105:function(e,t,a){"use strict";a.r(t);var s=a(2),n=a.n(s),c=a(50),r=a.n(c),o=(a(25),a(1)),u=a(9),l=a.n(u),i=a(14),j=a(10),m=a(51),d=a.n(m)()(),b=a(19),O=a.n(b),p=a(0),h=function(e){var t=e.onLogin,a=e.setListAllRoom,n=Object(s.useState)(""),c=Object(j.a)(n,2),r=c[0],o=c[1],u=Object(s.useState)(""),m=Object(j.a)(u,2),d=m[0],b=m[1],h={userName:r},x=function(){var e=Object(i.a)(l.a.mark((function e(){var s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",alert("Please, enter your name!"));case 2:return b(!0),e.prev=3,e.next=6,O.a.post("/room",h);case 6:s=e.sent,h=s.data,a(h.roomID),f()&&f()!==h.roomID&&(h={userName:h.userName,roomID:f()},a(h.roomID)),window.history.replaceState({},"Chat ".concat(h.roomID),"/room?roomID=".concat(h.roomID)),t(h),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=new URL(window.location.href);return!!e.searchParams.has("roomID")&&e.searchParams.get("roomID")};return Object(p.jsxs)("div",{className:"join-block",children:[Object(p.jsx)("input",{value:r,onChange:function(e){o(e.target.value)},type:"text",placeholder:"Your name"}),Object(p.jsx)("button",{onClick:x,className:"btn btn-success",children:d?"Starting":"Start chat"})]})};var x=function(e){var t=e.users,a=e.messages,s=e.userName,c=e.currentRoomID,r=e.onAddMessage,o=e.allRoomID,u=e.updateUsersAndMessagesList,l=e.setCurrentRoom,i=n.a.useState(""),m=Object(j.a)(i,2),b=m[0],O=m[1],h=n.a.useRef(null);return n.a.useEffect((function(){h.current.scrollTo(0,99999)}),[a]),Object(p.jsxs)("div",{className:"chat",children:[Object(p.jsxs)("div",{className:"chat-users",children:[Object(p.jsx)("b",{children:"Rooms:"}),Object(p.jsx)("ul",{children:o.map((function(e,t){return Object(p.jsx)("li",{onClick:function(){l(e),u({roomID:e,userName:s}),window.history.replaceState({},"Chat ".concat(e),"/room?roomID=".concat(e))},children:e===c?Object(p.jsx)("b",{children:e}):e},e+t)}))}),Object(p.jsx)("hr",{}),Object(p.jsxs)("b",{children:["Online (",t.length,"):"]}),Object(p.jsx)("ul",{children:t.map((function(e,t){return Object(p.jsx)("li",{children:e===s?Object(p.jsx)("b",{children:e}):e},e+t)}))})]}),Object(p.jsxs)("div",{className:"chat-messages",children:[Object(p.jsx)("div",{ref:h,className:"messages",children:a.map((function(e,t){return e.userName===s?Object(p.jsxs)("div",{className:"myMessage",children:[Object(p.jsx)("p",{children:e.textMessage}),Object(p.jsx)("div",{children:Object(p.jsx)("span",{children:"".concat(e.userName," ").concat(e.dateMessage)})})]},"qw"+t):Object(p.jsxs)("div",{className:"message",children:[Object(p.jsx)("p",{children:e.textMessage}),Object(p.jsx)("div",{children:Object(p.jsx)("span",{children:"".concat(e.userName," ").concat(e.dateMessage)})})]},"er"+t)}))}),Object(p.jsxs)("form",{children:[Object(p.jsx)("textarea",{value:b,onChange:function(e){return O(e.target.value)},className:"form-control",rows:"3"}),0!==b.length?Object(p.jsx)("button",{onClick:function(){d.emit("ROOM:NEW_MESSAGE_FROM_USER",{roomID:c,userName:s,textMessage:b});var e=new Date,t=e.getFullYear(),a=("0"+e.getDate()).slice(-2),n=("0"+(e.getMonth()+1)).slice(-2),o=("0"+e.getHours()).slice(-2),u=("0"+e.getMinutes()).slice(-2);r({userName:s,textMessage:b,dateMessage:o+":"+u+"  "+a+"."+n+"."+t}),O("")},type:"button",className:"btn btn-primary",children:"Send message"}):Object(p.jsx)("button",{disabled:!0,type:"button",className:"btn btn-primary",children:"Send message"})]})]})]})},f=a(24),g=function(e,t){switch(t.type){case"JOINED":return Object(o.a)(Object(o.a)({},e),{},{isJoined:!0,userName:t.payload.userName,currentRoomID:t.payload.roomID});case"SET_DATA":return Object(o.a)(Object(o.a)({},e),{},{users:t.payload.users,messages:t.payload.messages});case"SET_USERS":return Object(o.a)(Object(o.a)({},e),{},{users:t.payload});case"SET_CURRENT_RoomID":return Object(o.a)(Object(o.a)({},e),{},{currentRoomID:t.payload});case"SET_ROOMS_LIST":return Object(o.a)(Object(o.a)({},e),{},{allRoomID:[].concat(Object(f.a)(e.allRoomID),[t.payload])});case"NEW_MESSAGE":return Object(o.a)(Object(o.a)({},e),{},{messages:[].concat(Object(f.a)(e.messages),[t.payload])});default:return e}};var S=function(){var e=Object(s.useReducer)(g,{isJoined:!1,userName:null,users:[],messages:[],currentRoomID:null,allRoomID:[]}),t=Object(j.a)(e,2),a=t[0],n=t[1],c=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"JOINED",payload:t}),e.next=3,r(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r=function(){var e=Object(i.a)(l.a.mark((function e(t){var a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{d.emit("ROOM:JOIN",t)}catch(c){console.log(c),console.log("\u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u0441 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u043e\u0439 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440")}return e.prev=1,e.next=4,O.a.get("/get/room?id_room=".concat(t.roomID));case 4:a=e.sent,s=a.data,n({type:"SET_DATA",payload:s}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0),console.log("\u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u043f\u0440\u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u043f\u043e \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u043e\u0439 \u043a\u043e\u043c\u043d\u0430\u0442\u0435 (\u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0443 \u0441\u0435\u0431\u044f)");case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),u=function(e){n({type:"SET_USERS",payload:e})},m=function(e){n({type:"NEW_MESSAGE",payload:e})};return Object(s.useEffect)((function(){d.on("ROOM:SET_USERS",u),d.on("ROOM:NEW_MESSAGE_FROM_SERVER",m)}),[]),Object(p.jsx)("div",{className:"wrapper",children:a.isJoined?Object(p.jsx)(x,Object(o.a)(Object(o.a)({},a),{},{onAddMessage:m,updateUsersAndMessagesList:r,setCurrentRoom:function(e){n({type:"SET_CURRENT_RoomID",payload:e})}})):Object(p.jsx)(h,{onLogin:c,setListAllRoom:function(e){n({type:"SET_ROOMS_LIST",payload:e})}})})};r.a.render(Object(p.jsx)(S,{}),document.getElementById("root"))},25:function(e,t,a){}},[[105,1,2]]]);
//# sourceMappingURL=main.ffdaac37.chunk.js.map