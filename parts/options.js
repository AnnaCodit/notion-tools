// import { config } from "../src/config.js";
// import { debug } from "../src/utils.js";
// import * as main from "../src/main.js";
// importScripts("../src/main.js");

function init() {

    // загружаем текущие значения опций и проставляем их на странице
    options_restore();

    // ExtensionStorage.set({ test: 'test1', bla: 'asdf' });

    // console.log(config.extension_id);
    // debug(config);
    // debug('asdasd');

    document.querySelector('.toggle-crypto-addresses').addEventListener('click', () => {
        const el = document.querySelector('.crypto-addresses');
        el.style.maxHeight = (el.style.maxHeight == '0px') ? el.scrollHeight + 'px' : '0px'
        // el.style.display = (el.style.display == 'none') ? 'block' : 'none'
    });

    // if we got here (options.html) from an update, show changelog div
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("from") === "update") {
        const changelogDiv = document.querySelector(".changelog");
        if (changelogDiv) {
            changelogDiv.style.display = "block";
        }
    }

    document.querySelector('.changelog .close').addEventListener('click', () => {
        document.querySelector('.changelog').style.display = 'none';
    });

}

// обрабатываем чекбоксы включения модулей
document.querySelectorAll('.option input[type="checkbox"]').forEach(function (element) {
    element.addEventListener('change', function (event) {
        const option_id = this.getAttribute('data-option-id');
        chrome.storage.sync.get('options', (data) => {
            // console.log('data asyn 1: ', JSON.stringify(data));
            data.options[option_id] = this.checked;
            // console.log('data asyn 2: ', JSON.stringify(data));
            chrome.storage.sync.set(data);
            const options = { [option_id]: this.checked }
            // console.log(options);
            tellFrontendToUpdate({ options: options });
        });

    });
});

function options_restore() {
    chrome.storage.sync.get(
        'options',
        (items) => {
            // console.log(items.options);
            Object.entries(items.options).forEach(([option_id, option]) => {
                // console.log([option_id, option]);
                const el = document.querySelector(`[data-option-id="${option_id}"]`);
                // console.log(el);
                el.checked = option;
            });
        }
    );
}

document.addEventListener('DOMContentLoaded', init);
// document.getElementById('save').addEventListener('click', options_save);