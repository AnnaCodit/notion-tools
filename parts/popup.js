
// In your popup.js (linked to popup.html)
// document.getElementById("open-options").addEventListener("click", () => {
//     chrome.runtime.openOptionsPage();
// });

document.querySelector('.extension-id-href').setAttribute('href', 'chrome-extension://' + chrome.runtime.id + '/options.html')