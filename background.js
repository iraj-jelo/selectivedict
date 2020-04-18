/**
 * @author Iraj Jelodari <iraj.jelo@gmail.com>
 * @license GNU Lesser General Public License, version 3.0
 */
var is_translating;

var browser_action_on_icons = {16: "icons/16.png", 32: "icons/32.png"};
var browser_action_off_icons = {16: "icons/16-off.png", 32: "icons/32-off.png"};

browser.storage.onChanged.addListener((result)=>{
    if (result.is_translating != undefined) {
        is_translating = result.is_translating.newValue;
        if (result.is_translating.newValue == true) {
            browser.browserAction.setIcon({path: browser_action_on_icons});
        } else {
            browser.browserAction.setIcon({path: browser_action_off_icons});
        }
    }
});

function toggle_translating() {
    browser.storage.local.set({
        is_translating: !is_translating,
    }).then(()=>{ is_translating = !is_translating }); 
}

browser.browserAction.onClicked.addListener(toggle_translating);

browser.storage.local.get(["is_translating"]).then((result)=>{
    is_translating = (result.is_translating == undefined)? true : result.is_translating
    
    browser.storage.local.set({
        is_translating: is_translating,
    })
    
}, (error)=>{console.error(`Error: ${error}`)});
