
var language_codes = {'Detect language': 'auto',
'Afrikaans': 'af', 
'Albanian': 'sq', 
'Amharic': 'am', 
'Arabic': 'ar', 
'Armenian': 'hy', 
'Azerbaijani': 'az', 
'Basque': 'eu', 
'Belarusian': 'be', 
'Bengali': 'bn', 
'Bosnian': 'bs',
'Bulgarian': 'bg', 
'Catalan': 'ca', 
'Cebuano': 'ceb',
'Chichewa': 'ny', 
'Chinese': 'zh', 
'Corsican': 'co', 
'Croatian': 'hr', 
'Czech': 'cs', 
'Danish': 'da', 
'Dutch': 'nl', 
'English': 'en', 
'Esperanto': 'eo',    
'Estonian': 'et', 
'Filipino': 'tl', 
'Finnish': 'fi', 
'French': 'fr', 
'Frisian': 'fy', 
'Galician': 'gl', 
'Georgian': 'ka', 
'German': 'de', 
'Greek': 'el', 
'Gujarati': 'gu', 
'Haitian Creole': 'ht', 
'Hausa': 'ha', 
'Hawaiian': 'haw', 
'Hebrew': 'he', 
'Hindi': 'hi', 
'Hmong': 'hmn', 
'Hungarian': 'hu', 
'Icelandic': 'is', 
'Igbo': 'ig', 
'Indonesian': 'id', 
'Irish': 'ga', 
'Italian': 'it', 
'Japanese': 'ja', 
'Javanese': 'jw',  
'Kannada': 'kn', 
'Kazakh': 'kk', 
'Khmer': 'km', 
'Korean': 'ko', 
'Kurdish (Kurmanji)': 'ku', 
'Kyrgyz': 'ky', 
'Lao': 'lo', 
'Latin': 'la', 
'Latvian': 'lv', 
'Lithuanian': 'lt', 
'Luxembourgish': 'lb', 
'Macedonian': 'mk', 
'Malagasy': 'mg', 
'Malay': 'ms', 
'Malayalam': 'ml', 
'Maltese': 'mt', 
'Maori': 'mi', 
'Marathi': 'mr', 
'Mongolian': 'mn', 
'Myanmar (Burmese)': 'my', 
'Nepali': 'ne', 
'Norwegian': 'no', 
'Pashto': 'ps', 
'Persian': 'fa', 
'Polish': 'pl', 
'Portuguese': 'pt', 
'Punjabi': 'pa', 
'Romanian': 'ro', 
'Russian': 'ru', 
'Samoan': 'sm', 
'Scots Gaelic': 'gd', 
'Serbian': 'sr', 
'Sesotho': 'st', 
'Shona': 'sn', 
'Sindhi': 'sd', 
'Sinhala': 'si', 
'Slovak': 'sk', 
'Slovenian': 'sl', 
'Somali': 'so', 
'Spanish': 'es', 
'Sundanese': 'su', 
'Swahili': 'sw', 
'Swedish': 'sv', 
'Tajik': 'tg', 
'Tamil': 'ta', 
'Telugu': 'te', 
'Thai': 'th', 
'Turkish': 'tr', 
'Ukrainian': 'uk', 
'Urdu': 'ur', 
'Uzbek': 'uz', 
'Vietnamese': 'vi', 
'Welsh': 'cy', 
'Xhosa': 'xh', 
'Yiddish': 'yi', 
'Yoruba': 'yo', 
'Zulu': 'zu'};

for (language in language_codes){
  var source_option = document.createElement('option');
  source_option.innerText = language;
  source_option.value = language_codes[language];
  document.querySelector("#sourceLanguageSelect").append(source_option);

  var target_option = document.createElement('option'); 
  target_option.innerText = language;
  target_option.value = language_codes[language];
  document.querySelector("#targetLanguageSelect").append(target_option)
}

function saveOptions(e) {
  e.preventDefault();
  var sl_selected_index = document.querySelector("#sourceLanguageSelect").selectedIndex;
  var tl_selected_index = document.querySelector("#targetLanguageSelect").selectedIndex;
  
  browser.storage.local.set({
    translateFromSelectedIndex: sl_selected_index,
    translateToSelectedIndex: tl_selected_index
  });
  alert("successfully saved.");
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#sourceLanguageSelect").selectedIndex = result.translateFromSelectedIndex || "21"; // 21 is selected index of English language in select options
    document.querySelector("#targetLanguageSelect").selectedIndex = result.translateToSelectedIndex || "70"; // 70 is selected index of Persian language in select options
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["translateFromSelectedIndex", "translateToSelectedIndex"]);
  getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

