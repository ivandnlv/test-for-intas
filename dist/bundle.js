(()=>{"use strict";var e={417:(e,t,n)=>{n.r(t)},294:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(a,i){function d(e){try{c(s.next(e))}catch(e){i(e)}}function o(e){try{c(s.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(d,o)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),n(417);const a="https://64bf6c1e5ee688b6250d63ba.mockapi.io/tests/items",i=document.querySelector(".main");let d=null,o=null,c=null;const l=()=>{const e=document.querySelectorAll(".aside__list-item");e.forEach((t=>{t.addEventListener("click",(()=>{e.forEach((e=>{e.classList.remove("_active")})),t.classList.add("_active"),r(t.dataset.id)}))}))},r=e=>{(e=>{s(void 0,void 0,void 0,(function*(){try{const t=yield fetch(`${a}/${e}`).then((e=>e.json()));console.log(t),t&&(c=t,console.log(c),(()=>{var e;const t=document.createElement("div");t.classList.add("main__wrapper","main-started");const n=document.createElement("header");n.classList.add("main__header");const s=document.createElement("span");s.classList.add("main__header-subtitle"),s.textContent="Выход";const a=document.createElement("h1");a.classList.add("main__header-title"),a.textContent=null!==(e=c.item.name)&&void 0!==e?e:"Тест";const d=document.createElement("div");d.classList.add("main__header-func");const o=document.createElement("span");o.textContent="Сбросить все ответы",o.classList.add("main__header-subtitle"),o.id="resetTest";const l=document.createElement("span");l.classList.add("main__header-subtitle"),l.id="testCounter",l.textContent=(0).toString();const r=document.createElement("span");r.classList.add("main__header-subtitle"),r.id="testTimer",r.textContent="00:00:00",d.append(o,l,r),n.append(s,a,d),t.append(n);const m=document.createElement("div");m.classList.add("main-started__content");const u=document.createElement("form");u.action="#",u.classList.add("main-started__form"),c&&c.item.questions.forEach((e=>{const t=document.createElement("fieldset");t.classList.add("main-started__form-question");const n=document.createElement("div");n.classList.add("main-started__form-question__wrapper"),e.variants.forEach(((t,s)=>{const a=document.createElement("div");a.classList.add("main-started__form-question__answer");const i=`question${e.id}answer${s+1}`;a.innerHTML=`\n          <input type="radio" value="${s}" name="question${e.id}" id=${i} />\n          <label for=${i}>${t}</label>\n        `,n.append(a)})),t.innerHTML=`\n       <legend class="main-started__form-question__title">${e.text}</legend>\n      `,t.append(n),u.append(t)}));const _=document.createElement("div");_.classList.add("divider");const p=document.createElement("button");p.classList.add("btn","outlined","red"),p.textContent="Завершить",u.append(_,p),u.addEventListener("submit",(e=>((e,t)=>{e.preventDefault();const n=new FormData(t);console.log(n)})(e,u))),m.append(u),t.append(m),i.innerHTML="",i.append(t)})())}catch(e){console.log("Произошла ошибка!",e)}}))})(e)};window.addEventListener("DOMContentLoaded",(()=>{i.innerHTML="",i.innerHTML='\n          <div class="main__wrapper main-initial">\n            <span class="main__intital-text">Выберите тест из списка</span>\n          </div>\n        <div class="main__wrapper main-selected">\n            <header class="main__header">\n              <span class="main__header-subtitle">Описание</span>\n            </header>\n            <div class="divider main-selected__divider"></div>\n            <div class="main-selected__test">\n              <p class="main-selected__test-description">\n                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos placeat quisquam\n                consequatur repudiandae repellendus possimus, cupiditate molestias officia ab?\n                Accusantium.\n              </p>\n              <div class="main-selected__test-btns">\n                <button class="btn main-selected__test-btn">Начать</button>\n                <button class="btn outlined main-selected__test-btn">Отмена</button>\n              </div>\n            </div>\n          </div>\n  '}));const m=document.querySelector(".aside"),u=document.querySelector(".aside__top-btn"),_=document.querySelectorAll(".aside__top");u.addEventListener("click",(()=>{_.forEach(((e,t)=>{e.classList.contains("_hidden")?(e.classList.remove("_hidden"),e.classList.add("_opened")):(e.classList.remove("_opened"),e.classList.add("_hidden"))})),m.classList.toggle("_opened"),s(void 0,void 0,void 0,(function*(){try{const e=yield fetch(a).then((e=>e.json()));e&&(d=e,o=d.map((e=>e.item.name)),(()=>{const e=document.querySelector(".aside__list");o.forEach(((t,n)=>{const s=document.createElement("li");s.classList.add("aside__list-item"),s.dataset.id=d[n].id,console.log(t),s.textContent=t,e.append(s),n===o.length-1&&l()}))})())}catch(e){console.log("Произошла ошибка: ",e)}}))}))}},t={};function n(s){var a=t[s];if(void 0!==a)return a.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,n),i.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(294)})();