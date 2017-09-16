// Author: iraj jelodari <iraj.jelo@gmail.com>

var __version__ = 'v1.1.0';
var text, sl, tl, enabled;

function log(msg){
 console.log(msg);
}

log(__version__);

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

var create_translation_tr = function(text, option){
  var option = (option != undefined) ? option : {};
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var div = document.createElement('div');
  var span = document.createElement('span');
  tr.className = option.trClassName? option.trClassName : '';
  td.className = option.tdClassName? option.tdClassName : '';
  div.className = option.divClassName? option.divClassName : '';
  span.className = option.spanClassName? option.spanClassName : '';
  span.innerText = text;
  div.appendChild(span);
  td.appendChild(div);
  tr.appendChild(td);
  return tr
}

var create_translations_table = function(a){
  var table = document.createElement('table');
  table.className = 'trans-table'; 
  var tbody = document.createElement('tbody');
  var translation_types_array = a[1]; 

  if (translation_types_array == undefined) { 
    var translates_array = a[0];
    var translate_array = translates_array[0];
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');

      td1.className = 'trans-td';       
      td2.className = 'synonyms-td';

      td1.innerText = translate_array[0];
      td2.innerText = translate_array[1];
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
      table.appendChild(tbody);
    return table
  }

  for (var index in translation_types_array) {
    var translation_type_array = translation_types_array[index];  
    var type = translation_type_array[0];
    var translations_array = translation_type_array[2];
     
    var type_tr = create_translation_tr(type, {'divClassName': 'gt-baf-cell gt-baf-pos-head', 'spanClassName' : 'trans-type'});
    tbody.appendChild(type_tr);
    
    for (var jndex  in translations_array ){
      //console.log(translations_array[jndex]);
      var translation_array = translations_array[jndex];
      var translation = translation_array[0];    
      var dist_sysnonyms_array = translation_array[1];

      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');

      td1.className = 'trans-td';       
      td2.className = 'synonyms-td';

      td1.innerText = translation;
      tr.appendChild(td1);

      for (var kndex = 0; kndex < dist_sysnonyms_array.length; kndex++) {
        var s = document.createElement('span');
        s.innerText = dist_sysnonyms_array[kndex];
        td2.appendChild(s);
        if (kndex < (dist_sysnonyms_array.length - 1)){
          var seperator = document.createTextNode(", ");
          td2.appendChild(seperator);
        }
      }

      tr.appendChild(td2);
      tbody.appendChild(tr);
      //console.log(translation, ':', dist_sysnonyms);  
    }  
  }
  table.appendChild(tbody);
  return table
}


var create_modal = function(element) {
  log('open modal');
  var backdrop = document.createElement('div');
  backdrop.className = 'trans-modal-backdrop';

  var d = document.createElement('div'); 
  var d2 = document.createElement('div'); 

  d.id = 'SelectiveDictModal';
  d.style.zIndex = 10000;
  d.style.position = 'fixed';
  d.style.color = 'rgb(59, 59, 59)';
  d.style.fontSize = '14px';
  d.style.left = '20%';
  d.style.right = '20%';
  d.style.top = '20%';
  d.style.padding = '15px';
  d.style.fontWeight = 700;
  d.style.background = '#fff';
  d.style.border = '1px solid';
  d.style.borderColor = 'rgb(209, 209, 209)';
  d.style.boxShadow  = '1px 6px 10px rgb(0, 0, 0)';
  d.style.direction = 'ltr';
  d.style.wordWrap = 'break-word';
  d.style.height = '400px';
  d.style.maxHeight = '100%';

  d.className = 'trans-modal';
  d2.className = 'modal-guts';

  var source_text_form = document.createElement('form');
  var translate_button = document.createElement('button');
  translate_button.innerText = 'Translate';
  translate_button.style.height = '37px';
  translate_button.style.margin  = '0px 0px 0px 5px';

  translate_button.addEventListener('click', translateButtonCallback);
 
  var text_input = document.createElement('input');
  text_input.type = 'text'; 
  text_input.id = 'sourceTextInput';
  
  var source_language_select = document.createElement('select'); 
  source_language_select.id = 'sourceLanguageSelect';

  var target_language_select = document.createElement('select'); 
  target_language_select.id = 'targetLanguageSelect';

  source_text_form.appendChild(text_input);
  var source_language_label = document.createElement('label');

  source_language_label.style.padding = '11px';
  source_language_label.innerText = 'from';
  source_text_form.appendChild(source_language_label);
  source_text_form.appendChild(source_language_select);
  var target_language_label = document.createElement('lebel');
  target_language_label.innerText = 'to';
  target_language_label.style.padding = '11px';

  source_text_form.appendChild(target_language_label);
  source_text_form.appendChild(target_language_select);

  source_text_form.appendChild(translate_button);

  d.appendChild(source_text_form);

  for (language in language_codes){
    var source_option = document.createElement('option');
    source_option.innerText = language;
    source_option.value = language_codes[language];
    source_language_select.append(source_option);

    var target_option = document.createElement('option'); 
    target_option.innerText = language;
    target_option.value = language_codes[language];
    target_language_select.append(target_option)
  }

  d2.appendChild(element);

  var close_button = document.createElement('button');
  close_button.id = 'transCloseButton';  
  close_button.innerText = 'close';
  close_button.style.background = 'rgb(103, 128, 205)';
  close_button.style.border = 'none';
  close_button.style.color = '#fff';
  close_button.style.bottom = '12px';
  close_button.style.position = 'absolute';

  var close_modal = function (){
      d.addEventListener('transitionend', function(e){
          e.target.remove();
          backdrop.remove();
      }, false);

      d.style.top = '-150%';
      d.style.opacity = '.8';  
      d.style.MozTransition = 'top 1s, opacity .5s ease-out'
  }

  var close_modal_callback = function(e){
    close_modal();
  }

  close_button.addEventListener('click', close_modal_callback);
  //backdrop.addEventListener('click', close_modal_callback);
 
 document.onkeydown = function(evt) {
      evt = evt || window.event;
      // handle <ESC> key as an close shortcut
      if (evt.keyCode == 27) {
          close_modal();
      }
  };

  d.appendChild(close_button);
  d.appendChild(d2);

  document.body.appendChild(backdrop);
  document.body.appendChild(d);

  // Animating as bigan as appedning element to the dom:
  d.style.MozTransition = 'opacity .5s ease-in-out, top .5s ease-in-out'
  d.style.opacity = '0';
  d.style.top = '15%';
  
  // reflow: to solve immediate CSS transitions on newly-appended elements `document.body.appendChild(p);` are 
  //somehow ignored - the end state of the transition is rendered immediately.
  // reference: https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
  d.getBoundingClientRect();  
  
  d.style.opacity = '1'; 
  d.style.top = '10%';    

}

var translate = function(text, sl, tl) {
  var source_language = (source_language == undefined)? true : false;
  var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='+sl+'&tl='+tl+'&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&ssel=3&tsel=6&kc=5&q='+text;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var  j = JSON.parse(this.responseText);
       create_modal(create_translations_table(j));
    }
  };
  xhttp.open("GET", url, false);
  xhttp.send();
}

function restoreOptions() {

  function setCurrentChoice(result) {
    sl = result.translateFrom || "en";
    tl = result.translateTo || "fa";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["translateFrom", "translateTo"]);
  getting.then(setCurrentChoice, onError);

}

var translateButtonCallback = function(e){
    var sl = document.getElementById('sourceLanguageSelect').value;
    var tl = document.getElementById('targetLanguageSelect').value; 
    text = window.getElementById('sourceTextInput').value;
    window.getSelection().removeAllRanges()
    if (text != ''){
      translate(text, sl, tl);
    }
}

var mouseUpEvevntCallback = function(e){
    restoreOptions();
    text = window.getSelection().toString();
    window.getSelection().removeAllRanges()
    if (text != ''){
      translate(text, sl, tl);
    }
}

document.addEventListener('keyup', function(e) { 
  if (e.altKey && e.ctrlKey && (e.keyCode == 84)) {
    // <alt> + <ctrl> + <doubleclick>
    if (enabled){
      enabled = false;
      document.body.style.cursor = "";
      document.body.removeEventListener('mouseup', mouseUpEvevntCallback);
      window.getSelection().removeAllRanges();
    } else {
      enabled = true;
      document.body.style.cursor = 'help';
      document.body.addEventListener('mouseup', mouseUpEvevntCallback);
      window.getSelection().removeAllRanges();
    }
  } 
}, false);
