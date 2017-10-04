// Author: iraj jelodari <iraj.jelo@gmail.com>
var translation = true;

var browser_action_on_icons = {16: "icons/16.png", 32: "icons/32.png"};
var browser_action_off_icons = {16: "icons/16-off.png", 32: "icons/32-off.png"};

function log(msg){
  console.log(msg);
}

function onError(error) {
  console.error(`Error: ${error}`);
}

function toggle_translating() {
  if (translation == true) {
    translation = false;
    browser.browserAction.setIcon({path: browser_action_off_icons}); 
    sendMessageToTabs();
  } else {
    translation = true;
    browser.browserAction.setIcon({path: browser_action_on_icons});
    sendMessageToTabs();
  }
}

function sendMessageToTabsCallbak(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id, {translation: translation}).then(response => {}).catch(onError);
  }
}

function sendMessageToTabs() {
  browser.tabs.query({
    active: true
  }).then(sendMessageToTabsCallbak).catch(onError);
}

function handleActivated(activeInfo) {
  sendMessageToTabs();
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status == "complete"){ sendMessageToTabs() };
}

browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onActivated.addListener(handleActivated);
browser.browserAction.onClicked.addListener(toggle_translating);

function handleMessage(request, sender, sendResponse) {
  if (request.translation == true || request.translation == false) toggle_translating()
}

browser.runtime.onMessage.addListener(handleMessage);

