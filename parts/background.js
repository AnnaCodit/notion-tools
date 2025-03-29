// import { config } from "../src/config.js";
// import { debug } from "../src/utils.js";
// import * as main from "../src/main.js";
// import * as main from "../src/main.js";
importScripts("../src/main.js");

chrome.runtime.onInstalled.addListener(function (details) {

    if (details.reason === "install") {

        // Выполнить действия при установке расширения
        console.log("Extension installed for the first time.");

        const defaultOptions = {};

        Object.entries(config.options).forEach(([option_id, option]) => {
            defaultOptions[option_id] = option.default;

            console.log(option_id); // This will log the name of each option
            console.log(option.default); // This will log the value of each option
        });

        chrome.storage.sync.set({ options: defaultOptions }, () => {

            // сначала применяем дефолтные опции фронтенду
            tellFrontendToUpdate({ options: defaultOptions });

            // открываем страницу опций
            chrome.tabs.create({
                url: "options.html?from=install"
            });

            // TODO: DRY with update
            chrome.tabs.query({ url: "*://*.notion.so/*" }, function (tabs) {
                tabs.forEach((tab) => {
                    chrome.tabs.reload(tab.id);
                });
            });

        });



    } else if (details.reason === "update") {

        console.log("Extension updated.");

        // Выполнить действия при обновлении расширения
        // открываем страницу опций (пока разрабатываем)
        chrome.tabs.create({
            url: "options.html?from=update"
        });

        chrome.tabs.query({ url: "*://*.notion.so/*" }, function (tabs) {
            tabs.forEach((tab) => {
                chrome.tabs.reload(tab.id);
            });
        });

    }
});

// chrome.storage.onChanged.addListener((changes, namespace) => {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//         // console.log(`Storage key "${key}" in namespace "${namespace}" changed. Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`);

//         // отправляем сообщение в content.js чтобы включилась или отключилась опция на странице

//         // console.log(
//         //     `Storage key "${key}" in namespace "${namespace}" changed.`,
//         //     `Old value was "${oldValue}", new value is "${newValue}".`
//         // );
//     }
// });

