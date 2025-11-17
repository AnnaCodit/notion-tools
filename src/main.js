console.log("main.js loaded");

const config = {};
config.extension_id = chrome.runtime.id;
config.show_options_on_update = false;
config.version = '1.2.3';
config.options = {
    o1: {
        title: 'Colored headings',
        default: true,
    },
    o2: {
        title: 'Folded sidebar buttons',
        default: true,
    },
    o3: {
        title: 'Headings hashtag symbols',
        default: true,
    },
    o4: {
        title: 'More space for board view',
        default: false,
    },
    o5: {
        title: 'Reduced page header',
        default: true,
    },
    o6: {
        title: 'Hide "invite members" button from sidebar',
        default: true,
    },
    // headings_hashtag: 0,
    // shorten_sidebar_base_links: 1, // more compact search, inbox and settings buttons
    // more_space_for_board_view: 1,
}

// Получаем язык интерфейса пользователя
const lang = navigator.language || navigator.userLanguage;
// let language = chrome.i18n.getUILanguage();

let messages = {
    "en": "Hello, World!",
    "ru": "Привет, мир!",
    // Добавьте сюда текст на других языках, которые вы хотите поддерживать
};

// Выводим соответствующий текст на странице настроек
// document.getElementById("settingsText").innerText = messages[language] || messages["en"];

// console.log("Extension ID n2:", extension_id);
// document.querySelector("#debug").insertAdjacentHTML("beforeend", `Extension ID n2: ${extension_id}`);

// function $$(sel, el = document) {
//     return Array.from(el.querySelectorAll(sel));
// }

// if (typeof window !== 'undefined') {
//     window.$ = function (sel, el = document) {
//         return el.querySelector(sel);
//     }
//     window.$$ = function (sel, el = document) {
//         return el.querySelectorAll(sel);
//         // return Array.from(el.querySelectorAll(sel));
//     }
// }

function log() {
    // fetch('https://api.example.com/data')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Данные получены:', data);
    //         // Обработка полученных данных
    //     })
    //     .catch(error => console.error('Ошибка при получении данных:', error));
}

function tellFrontendToUpdate(message) {

    // chrome.tabs.query({}, (tabs) => {
    chrome.tabs.query({ url: "*://*.notion.so/*" }, function (tabs) {
        // console.log(tabs);
        tabs.forEach((tab) => {
            // Send a message to each tab
            message.type = 'option_change';
            chrome.tabs.sendMessage(tab.id, message, (response) => {
                // console.log(response.status);
                // чтобы эта ошибка не выпадала, надо после установки или обновления экстеншена перезагузить страницы
                if (chrome.runtime.lastError) {
                    console.log('202406121534: ', chrome.runtime.lastError.message);
                }
            });
            // Programmatically reload matching tabs
            // chrome.tabs.reload(tab.id);
        });
    });

    // chrome.runtime.sendMessage({ type: 'option_change' });
}

// применяем или выключаем опцию
function frontendOptionSwitch(optionId, optionValue) {
    const className = `anco-nt-${optionId}`;
    if (optionValue == true) {
        document.body.classList.add(className);
        // folded sidebar
        if (optionId == 'o2') {
            // console.log('we are in o2');
            // check if inbox notifications empty, set or remove specific class for it
            const o2_update_class = 'anco-nt-o2-upd-empty';
            const o2_interval = setInterval(() => {
                // console.log('we are in o2 interval');
                const element = document.querySelector('.notion-sidebar > div > div:nth-child(2) > div > * > div > div:nth-child(3) span');
                // console.log('element', element);
                // const element = document.querySelector('.notion-sidebar > div > div:nth-child(2) > div > * > div > div:nth-child(3) > div > span');
                // const check = element ? element.textContent : null;
                // console.log(check);
                // if (!check) {
                if (!element) {
                    // console.log('o2 interval: no updates');
                    document.body.classList.add(o2_update_class);
                } else {
                    document.body.classList.remove(o2_update_class);
                }
            }, 4000);
        }
        if (optionId == 'o5') {
            // console.log('we are in o2');
            const o5_update_class = 'anco-nt-o5-w-cover';
            const o5_interval = setInterval(() => {
                // console.log('we are in o2 interval');
                const check = document.querySelector('main .layout-full');
                if (check && check.querySelector('img')) {
                    // console.log('o2 interval: no updates');
                    document.body.classList.add(o5_update_class);
                } else {
                    document.body.classList.remove(o5_update_class);
                }
            }, 3000);
        }
    } else {
        if (optionId == 'o2') {
            // destroy interval
            // console.log('we are in o2 destroy interval');
            if (typeof o2_interval !== 'undefined') clearInterval(o2_interval);
        }
        if (optionId == 'o5') {
            // destroy interval
            // console.log('we are in o2 destroy interval');
            if (typeof o5_interval !== 'undefined') clearInterval(o5_interval);
        }
        document.body.classList.remove(className);
    }
}

// console.log('we are in main');
