(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),u=n.n(c),o=n(14),l=n(2),i=function(e){var t=e.person,n=e.handleDelete;return a.a.createElement("div",null,t.name," ",t.number,a.a.createElement("button",{onClick:function(){return n(t)}},"delete"))},s=function(e){var t=e.persons,n=e.showAll,r=e.selected,c=e.handleDelete;return n?t.map((function(e){return a.a.createElement(i,{key:e.id,person:e,handleDelete:c})})):t.filter((function(e){return e.name.toLowerCase().includes(r)})).map((function(e){return a.a.createElement(i,{key:e.id,person:e,handleDelete:c})}))},m=function(e){var t=e.handleChangeFilter,n=e.selected;return a.a.createElement("div",null,"filter shown with",a.a.createElement("input",{onChange:t,value:n}))},f=function(e){var t=e.handleSubmit,n=e.handleChange,r=e.newName,c=e.handleChangeNumber,u=e.newNumber;return a.a.createElement("form",{onSubmit:t},a.a.createElement("div",null,"name: ",a.a.createElement("input",{onChange:n,value:r})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{onChange:c,value:u})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=function(e){var t=e.message;return null===t?null:"error"===t.type?a.a.createElement("div",{className:"error"},t.text):a.a.createElement("div",{className:"success"},t.text)},h=n(3),b=n.n(h),p="/api/persons",v=function(){return b.a.get(p).then((function(e){return e.data}))},O=function(e){return b.a.post(p,e).then((function(e){return e.data}))},E=function(e){return b.a.delete("".concat(p,"/").concat(e))},g=function(e,t){return b.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(n,!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),o=Object(l.a)(u,2),i=o[0],h=o[1],b=Object(r.useState)(""),p=Object(l.a)(b,2),w=p[0],y=p[1],C=Object(r.useState)(!0),D=Object(l.a)(C,2),S=D[0],N=D[1],P=Object(r.useState)(""),k=Object(l.a)(P,2),x=k[0],A=k[1],T=Object(r.useState)(null),L=Object(l.a)(T,2),F=L[0],I=L[1];Object(r.useEffect)((function(){v().then((function(e){c(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(d,{message:F}),a.a.createElement(m,{handleChangeFilter:function(e){A(e.target.value),0===e.target.value.length?N(!0):N(!1)},selected:x}),a.a.createElement("h3",null,"Add a new"),a.a.createElement(f,{handleSubmit:function(e){e.preventDefault();var t={name:i,number:w},r=n.filter((function(e){return e.name.toLowerCase().includes(i.toLowerCase())}));if(r.length>0){var a=r[0];if(window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one?"))){var u={text:"Updated ".concat(a.name),type:"success"};g(a.id,j({},t,{name:a.name})).then((function(e){c(n.map((function(t){return t.id!==e.id?t:j({},t,{number:e.number})}))),h(""),y(""),I(u),setTimeout((function(){I(null)}),5e3)}))}}else O(t).then((function(e){var t={text:"Added ".concat(e.name),type:"success"};c(n.concat(e)),h(""),y(""),I(t),setTimeout((function(){I(null)}),5e3)})).catch((function(e){var t={text:"".concat(e.response.data.error),type:"error"};I(t),setTimeout((function(){I(null)}),5e3)}))},handleChange:function(e){return h(e.target.value)},newName:i,handleChangeNumber:function(e){return y(e.target.value)},newNumber:w}),a.a.createElement("h3",null,"Numbers"),a.a.createElement(s,{persons:n,showAll:S,selected:x,handleDelete:function(e){if(window.confirm("Delete ".concat(e.name))){E(e.id).catch((function(t){var n={text:"Information of ".concat(e.name," has already been removed from server"),type:"error"};I(n),setTimeout((function(){I(null)}),5e3)}));var t=n.filter((function(t){return t.id!==e.id}));c(t)}}}))};n(37);u.a.render(a.a.createElement(y,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.1e5b2f95.chunk.js.map