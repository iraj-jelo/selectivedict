function saveOptions(e) {
  e.preventDefault();
  var sl = document.querySelector("#translateFrom").value;
  var tl = document.querySelector("#translateTo").value;
  
  browser.storage.local.set({
    translateFrom: sl,
    translateTo: tl
  });

  alert(sl+" -> "+tl+" successfully saved.");
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result.translateFrom, result.translateFrom);
    document.querySelector("#translateFrom").value = result.translateFrom || "en";
    document.querySelector("#translateTo").value = result.translateTo || "fa";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["translateFrom", "translateTo"]);
  getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

