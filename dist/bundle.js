(()=>{"use strict";var e={417:(e,t,n)=>{n.r(t)},72:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(a,d){function i(e){try{o(s.next(e))}catch(e){d(e)}}function c(e){try{o(s.throw(e))}catch(e){d(e)}}function o(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}o((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchTestById=t.fetchAllData=t.test=t.testNames=t.data=void 0;const a=n(362);t.data=null,t.testNames=null,t.test=null;const d="https://64bf6c1e5ee688b6250d63ba.mockapi.io/tests/items";t.fetchAllData=()=>s(void 0,void 0,void 0,(function*(){try{(0,a.renderLoadingTitle)();const e=yield fetch(d).then((e=>e.json()));e&&(t.data=e,t.testNames=t.data.map((e=>e.item.name)),(0,a.renderTitles)())}catch(e){console.log("Произошла ошибка: ",e)}})),t.fetchTestById=e=>s(void 0,void 0,void 0,(function*(){try{const n=yield fetch(`${d}/${e}`).then((e=>e.json()));n&&(t.test=n,(0,a.renderTestDescription)())}catch(e){console.log("Произошла ошибка!",e)}}))},362:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.renderTestDescription=t.renderTitles=t.renderTest=t.renderLoadingTitle=t.renderInitialMain=void 0;const s=n(72),a=document.querySelector(".main"),d=()=>{i("Вы уверены что хотите выйти?","Все результаты будут сброшены")},i=(e,t)=>{const n=document.createElement("div");n.classList.add("modal"),n.innerHTML=`\n\t<div class="modal__wrapper">\n          <span class="modal__title">${e}</span>\n          <p class="modal__description">${t}</p>\n          <div class="modal__btns">\n            <button class="btn outlined red modal__btns-close">Выход</button>\n            <button class="btn red modal__btns-cancel">Отмена</button>\n          </div>\n        </div>\n\t`;const s=n.querySelector(".modal__btns-close"),a=n.querySelector(".modal__btns-cancel");s.addEventListener("click",(()=>{n.parentNode.removeChild(n),o()})),a.addEventListener("click",(()=>n.parentNode.removeChild(n))),document.body.prepend(n)};t.renderTestDescription=()=>{const e=document.createElement("div");e.classList.add("main__wrapper","main-selected"),e.innerHTML=`\n\t\t<header class="main__header">\n            <span class="main__header-subtitle">Описание</span>\n        </header>\n        <div class="divider main-selected__divider"></div>\n        <div class="main-selected__test">\n        \t<p class="main-selected__test-description">\n            \t${s.test.item.description}\n            </p>\n\t\t</div>\n\t`;const t=e.querySelector(".main-selected__test"),n=document.createElement("div");n.classList.add("main-selected__test-btns");const d=document.createElement("button");d.classList.add("btn","main-selected__test-btn"),d.textContent="Начать";const i=document.createElement("button");i.classList.add("btn","outlined","main-selected__test-btn"),i.textContent="Отмена",d.addEventListener("click",c),i.addEventListener("click",o),n.append(d,i),t.append(n),a.innerHTML="",a.append(e)};const c=()=>{var e;const t=document.createElement("div");t.classList.add("main__wrapper","main-started");const n=document.createElement("header");n.classList.add("main__header");const i=document.createElement("span");i.classList.add("main__header-subtitle"),i.id="testClose",i.textContent="Выход";const c=document.createElement("h1");c.classList.add("main__header-title"),c.textContent=null!==(e=s.test.item.name)&&void 0!==e?e:"Тест";const o=document.createElement("div");o.classList.add("main__header-func");const r=document.createElement("span");r.textContent="Сбросить все ответы",r.classList.add("main__header-subtitle"),r.id="resetTest";const l=document.createElement("span");l.classList.add("main__header-subtitle"),l.id="testCounter",l.textContent=`0/${s.test.item.questions.length}`;const m=document.createElement("span");m.classList.add("main__header-subtitle"),m.id="testTimer",m.textContent="00:00:00",o.append(r,l,m),n.append(i,c,o),t.append(n);const u=document.createElement("div");u.classList.add("main-started__content");const _=document.createElement("form");_.action="#",_.classList.add("main-started__form"),i.addEventListener("click",d),r.addEventListener("click",(()=>{return e=l,_.reset(),void(e.textContent=`0/${s.test.item.questions.length}`);var e})),s.test&&s.test.item.questions.forEach((e=>{const t=document.createElement("fieldset");t.classList.add("main-started__form-question");const n=document.createElement("div");n.classList.add("main-started__form-question__wrapper"),e.variants.forEach(((t,s)=>{const a=document.createElement("div");a.classList.add("main-started__form-question__answer");const d=`question${e.id}answer${s+1}`;a.innerHTML=`\n          <input type="radio" value="${s}" name="question${e.id}" id=${d}/>\n          <label for=${d}>${t}</label>\n        `,n.append(a)})),t.innerHTML=`\n       <legend class="main-started__form-question__title">${e.id}. ${e.text}</legend>\n      `,t.append(n),_.append(t)}));const p=document.createElement("div");p.classList.add("divider");const v=document.createElement("button");v.classList.add("btn","outlined","red"),v.textContent="Завершить",_.append(p,v),u.append(_),t.append(u),_.addEventListener("submit",(e=>((e,t)=>{e.preventDefault()})(e))),_.addEventListener("change",(()=>((e,t)=>{let n=[];s.test&&s.test.item.questions.forEach(((t,s)=>{e.elements[`question${s+1}`].value&&n.push(e.elements[`question${s+1}`].value)})),t.textContent=`${n.length}/${s.test.item.questions.length}`})(_,l))),a.innerHTML="",a.append(t)};t.renderTest=c;const o=()=>{r(),a.innerHTML="",a.innerHTML='\n          <div class="main__wrapper main-initial">\n            <span class="main__intital-text">Выберите тест из списка</span>\n          </div>\n  '};t.renderInitialMain=o,t.renderLoadingTitle=()=>{document.querySelector(".aside__list").innerHTML="<p>Тесты загружаются...</p>"},t.renderTitles=()=>{const e=document.querySelector(".aside__list");e.innerHTML="",s.testNames.forEach(((t,n)=>{const a=document.createElement("li");a.classList.add("aside__list-item"),a.dataset.id=s.data[n].id,a.textContent=t,e.append(a),n===s.testNames.length-1&&l()}))};const r=()=>{document.querySelectorAll(".aside__list-item").forEach((e=>e.classList.remove("_active")))},l=()=>{const e=document.querySelectorAll(".aside__list-item");e.forEach((t=>{t.addEventListener("click",(()=>{e.forEach((e=>{e.classList.remove("_active")})),t.classList.add("_active"),m(t.dataset.id)}))}))},m=e=>{(0,s.fetchTestById)(e)}}},t={};function n(s){var a=t[s];if(void 0!==a)return a.exports;var d=t[s]={exports:{}};return e[s].call(d.exports,d,d.exports,n),d.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=n(362),t=n(72),s=n(72);n(417),window.addEventListener("DOMContentLoaded",e.renderInitialMain);const a=document.querySelector(".aside"),d=document.querySelectorAll(".aside__top-btn"),i=(document.querySelector(".aside__top-btn-close"),document.querySelectorAll(".aside__top"));d.forEach((e=>{e.addEventListener("click",(()=>{i.forEach((e=>{e.classList.contains("_hidden")?(e.classList.remove("_hidden"),e.classList.add("_opened")):(e.classList.remove("_opened"),e.classList.add("_hidden"))})),a.classList.toggle("_opened"),s.testNames||(0,t.fetchAllData)()}))}))})()})();