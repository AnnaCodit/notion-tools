// import { tellFrontendToUpdate } from "../src/main.js";
// import * as main from "../src/main.js";

// console.log('content.js loaded');

// Обработчик сообщений
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'option_change') {
        // Получение данных, например, из локального хранилища
        // let data = { key: 'value' };
        // sendResponse({ data: data });

        // если у нас массив опций
        // request.options.forEach(([option_id, option]) => {
        Object.entries(request.options).forEach(([option_id, option]) => {
            frontendOptionSwitch(option_id, option);
        });

        // // если у нас массив опций
        // if (request.options) {
        // } else {
        //     frontendOptionSwitch(request.option_id, request.option_value);
        // }

        // console.log('ok we got msg option_change');
    }
    // console.log(request);
    sendResponse({ status: 'ok' });
});

// сохранение статистики того, сколько раз срабатывали улучшения чтобы потом попросить донатик

// console.log(yal_test);


function init() {

    // console.log('abc from INIT content.js');

    // apply stored options on page load
    chrome.storage.sync.get('options', (result) => {

        // console.log('append options');

        // TODO: обернуть все заголовки в span.anco-nt-heading
        // if (result.options.o1) {
        //     document.querySelectorAll('h2,h3,h4').forEach((heading) => {
        //         // обернуть внутренний текст в span если уже не обернут
        //     });
        // }

        // применить существующие опции
        if (result.options) {
            // console.log(result.options);
            Object.entries(result.options).forEach(([option_id, option]) => {
                frontendOptionSwitch(option_id, option);
            });
            // tellFrontendToUpdate({ options: result.options });
            // document.body.style.backgroundColor = result.optionKey; // Example change
        }

    });
}

// el.insertAdjacentElement("beforeend", "hello world");
// const html_body = document.querySelector("body");
// html_body.insertAdjacentHTML("beforeend", "hello world");

// if (document.readyState === 'loading') {
//     console.log('check timing in content.js: readyState = loading');
//     // document.addEventListener('DOMContentLoaded', init);
// } else {
//     console.log('check timing in content.js: readyState != loading');
//     // DOMContentLoaded has already fired, run init directly
//     // init();
// }

init();