/**
 * @author Iraj Jelodari <iraj.jelo@gmail.com>
 * @license GNU Lesser General Public License, version 3.0
 */
var text, sl, tl;
var is_translating = false;
var has_update = false;
var default_source_language = "en";
var default_target_language = "fa";

var default_source_selected_index = "21";
var default_target_selected_index = "70";

var language_codes = {
    'Detect language': 'auto',
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
    'Zulu': 'zu'
};

function log(msg) {
    console.log(msg);
}

document.body.className = document.body.className.replace(new RegExp('help-cursor', 'g'), '').trim();

var request = function (text, sl, tl, callback) {
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sl + '&tl=' + tl + '&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&ssel=3&tsel=6&kc=5&q=' + text;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = callback;
    xhttp.open("GET", url, false);

    return xhttp
}

var playSound = function (text, tl) {
    // TODO: change below url to: https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=en&q=bag
    var url = 'http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=gtx&q=' + text + '&tl=' + tl;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var audio = document.createElement('audio');
            audio.style.display = "none";
            audio.src = window.URL.createObjectURL(this.response);;
            audio.autoplay = true;
            audio.onended = function () {
                audio.remove() //Remove when played.
            };
            document.body.appendChild(audio);

        }
    };

    xhttp.open("GET", url, false);
    xhttp.responseType = 'blob';
    xhttp.setRequestHeader('Referer', '')
    xhttp.send();
}

var create_translation_tr = function (text, option) {
    var option = (option != undefined) ? option : {};
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var div = document.createElement('div');
    var span = document.createElement('span');
    tr.className = option.trClassName ? option.trClassName : '';
    td.className = option.tdClassName ? option.tdClassName : '';
    div.className = option.divClassName ? option.divClassName : '';
    span.className = option.spanClassName ? option.spanClassName : '';
    span.innerText = text;
    div.appendChild(span);
    td.appendChild(div);
    tr.appendChild(td);
    return tr
}

function create_examples(data) {
    var examples_array = data[13]? data[13][0] : undefined
    
    if (examples_array) {
        var examples_container = document.createElement('div');
        examples_container.className = 'sd-examples-container';

        var examples_btn = document.createElement('span');
        examples_btn.className = 'sd-examples-open-btn';
        var examples_title = document.createElement('div');
        examples_title.className = 'sd-examples-title';
        examples_title.innerText = 'Show Examples';
        
        examples_container.appendChild(examples_title);
        
        examples_title.addEventListener('click', (e)=>{
            let examples = document.querySelectorAll('.sd-example');
            
            examples.forEach((ex)=>{
                if (ex.style.display == 'flex'){
                    ex.style.display = 'none';
                    ex.style.opacity = '0';
                    examples_title.innerText = 'Show Examples';
                } else {
                    ex.style.display = 'flex';
                    ex.style.opacity = '1';
                    examples_title.innerText = 'Hide Examples';
                }
            })
            e.target.scrollIntoView()

        })

        for (var index in examples_array) {
            var example = document.createElement('div');
            example.className = 'sd-example';

            var icon = document.createElement('span');
            icon.className = 'sd-example-icon';
            example.appendChild(icon);

            var text = document.createElement('text');
            text.innerHTML = examples_array[index][0];
            example.appendChild(text);


            examples_container.appendChild(example);
        }

        return examples_container
    }
}

var create_phonetic_table = function (data) {
    var table = document.createElement('table');
    table.className = 'trans-table';
    table.id = 'trans-table';

    var tbody = document.createElement('tbody');
    var translation_array = data[0][0];
    var source_text = data[0][0][1];
    var phonetic_array = data[0][1];
    var listen_button = document.createElement('span');
    listen_button.className = 'listen-button';

    if (phonetic_array != undefined) {
        var phonetic = phonetic_array[3];
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        td1.className = 'phonetic-td';
        td2.className = 'phonetic-td';

        td1.appendChild(listen_button);
        td1.appendChild(document.createTextNode(phonetic));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    } else {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        td1.className = 'phonetic-td';
        td2.className = 'phonetic-td';
        td1.appendChild(listen_button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }

    listen_button.addEventListener('click', function (e) {
        playSound(source_text, sl);
    });

    if (translation_array != undefined) {
        var translation = translation_array[0];
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        td1.className = 'translation-td';
        td2.className = 'source-text-td';

        td1.innerText = translation;
        td2.innerText = translation_array[1];

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    table.addEventListener('click', function (event) {
        if (event.target.tagName == "SPAN") {
            var sl = document.getElementById('sourceLanguageSelect').value;
            var tl = document.getElementById('targetLanguageSelect').value;
            text = event.target.textContent;

            if (text.trim() == '') {
                return
            }

            var xhttp = request(text, sl, tl, function () {
                if (this.readyState == 4 && this.status == 200) {
                    var j = JSON.parse(this.responseText);
                    element = display_translations(j);
                    table.replaceWith(element);
                    document.getElementById('sourceTextInput').value = text;
                }
            });

            xhttp.send();
        }
    }, false);

    return table
}

var create_translations_table = function (a) {
    var table = document.createElement('table');
    table.className = 'trans-table';
    table.id = 'trans-table';

    var tbody = document.createElement('tbody');
    var translation_array = a[0][0];
    var translation_types_array = a[1];

    for (var index in translation_types_array) {
        var translation_type_array = translation_types_array[index];
        var type = translation_type_array[0];
        var translations_array = translation_type_array[2];

        var type_tr = create_translation_tr(type, {
            'divClassName': 'gt-baf-cell gt-baf-pos-head',
            'spanClassName': 'trans-type',
            'tdClassName': 'trans-type-td'
        });
        tbody.appendChild(type_tr);

        for (var jndex in translations_array) {
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
                if (kndex < (dist_sysnonyms_array.length - 1)) {
                    var seperator = document.createTextNode(", ");
                    td2.appendChild(seperator);
                }
            }

            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    }

    table.appendChild(tbody);

    table.addEventListener('click', function (event) {
        if (event.target.tagName == "SPAN") {
            var sl = document.getElementById('sourceLanguageSelect').value;
            var tl = document.getElementById('targetLanguageSelect').value;
            text = event.target.textContent;

            if (text.trim() == '') {
                return
            }

            var xhttp = request(text, sl, tl, function () {
                if (this.readyState == 4 && this.status == 200) {
                    var j = JSON.parse(this.responseText);
                    
                    element = display_translations(j);
                    table.parentNode.parentNode.replaceWith(element);
                    document.getElementById('sourceTextInput').value = text;
                }
            });

            xhttp.send();
        }
    }, false);

    return table
}

var create_definitions = function (data) {
    var definitions_array = data[12]? data[12] : undefined
    
    if (definitions_array) {
        var definitions_container = document.createElement('div');
        definitions_container.className = 'definitions-container';
        
        var definitions_title = document.createElement('div');
        definitions_title.className = 'definitions-title';
        definitions_title.innerText = 'Definitions';
            
        for (var index in definitions_array) {

            let definitions_type = definitions_array[index][0];
            let definitions = definitions_array[index][1];

            var definitions_type_title = document.createElement('div');
            definitions_type_title.className = 'definitions-type';
            definitions_type_title.innerText = definitions_type;

            definitions_container.appendChild(definitions_type_title);

            for (var index in definitions) {
                var definition_wrapper = document.createElement('div');
                definition_wrapper.className = 'definition-wrapper';
    
                var icon = document.createElement('span');
                icon.className = 'definition-icon';
                icon.innerText = (Number(index)+1).toString().replace(/^0+/, '');
                
                var definition = document.createElement('div');
                definition.className = 'definition';
                
                var definition_text = document.createElement('div');
                definition_text.className = 'definition-text';
                definition_text.innerText = definitions[index][0];
                
                definition.appendChild(icon);
                definition.appendChild(definition_text);

                definition_wrapper.appendChild(definition);
                
                var definition_sample = document.createElement('div');
                definition_sample.className = 'definition-sample';

                if (definitions[index][2]) {
                    definition_sample.innerText = definitions[index][2];
                } else {
                    definition_sample.innerText = '';

                }
                
                definition_wrapper.appendChild(definition_sample);
                definitions_container.appendChild(definition_wrapper);
            }
        }

        return definitions_container
    }
}

function display_translations(data) {
    container = document.createElement('div');
    container.className = "translations-container"
    container.appendChild(create_phonetic_table(data))
    
    row = document.createElement('div');
    row.className = "translations-row"
    row.appendChild(create_translations_table(data))

    container.appendChild(row)
    
    let definitions = create_definitions(data)

    if (definitions) {
        row.appendChild(definitions)
    }

    let examples = create_examples(data)
    if (examples) {
        container.appendChild(examples)
    }

    return container
}

var create_modal = function (element) {
    var backdrop = document.createElement('div');
    backdrop.className = 'trans-modal-backdrop';

    var selective_dict_modal = document.createElement('div');
    selective_dict_modal.className = "selective-dict-modal";
    selective_dict_modal.style.zIndex = 9999999999;
    selective_dict_modal.style.position = 'fixed';
    selective_dict_modal.style.color = 'rgb(59, 59, 59)';
    selective_dict_modal.style.fontSize = '14px';
    selective_dict_modal.style.left = '20%';
    selective_dict_modal.style.right = '20%';
    selective_dict_modal.style.top = '20%';
    selective_dict_modal.style.fontWeight = 700;
    selective_dict_modal.style.background = '#fff';
    selective_dict_modal.style.border = '1px solid';
    selective_dict_modal.style.borderColor = 'rgb(209, 209, 209)';
    selective_dict_modal.style.boxShadow = '1px 6px 10px rgb(0, 0, 0)';
    selective_dict_modal.style.direction = 'ltr';
    selective_dict_modal.style.wordWrap = 'break-word';
    selective_dict_modal.style.height = '400px';
    selective_dict_modal.style.maxHeight = '100%';

    var selective_dict_modal_container = document.createElement('div');
    selective_dict_modal_container.style.padding = '15px';
    // modal guts
    var d2 = document.createElement('div');

    selective_dict_modal_container.className = 'trans-modal';
    d2.className = 'modal-guts';

    var selective_dict_modal_top_bar = document.createElement('div');
    selective_dict_modal_top_bar.className = 'selective-dict-modal-top-bar';
    selective_dict_modal_top_bar.style.display = 'flex';
    var translate_button = document.createElement('button');
    translate_button.className = 'translation-button';
    translate_button.innerText = 'Translate';
    translate_button.style.height = '37px';
    translate_button.style.margin = '0px 0px 0px 10px';

    var text_input = document.createElement('input');
    text_input.type = 'text';
    text_input.id = 'sourceTextInput';
    text_input.value = text;

    var source_language_select = document.createElement('select');
    source_language_select.id = 'sourceLanguageSelect';

    var target_language_select = document.createElement('select');
    target_language_select.id = 'targetLanguageSelect';

    selective_dict_modal_top_bar.appendChild(text_input);
    var source_language_label = document.createElement('label');

    source_language_label.style.padding = '9px';
    source_language_label.visibility = 'visible !important';
    source_language_label.innerText = 'from';
    selective_dict_modal_top_bar.appendChild(source_language_label);
    selective_dict_modal_top_bar.appendChild(source_language_select);
    var target_language_label = document.createElement('label');
    target_language_label.innerText = 'to';
    target_language_label.visibility = 'visible !important';
    target_language_label.style.padding = '9px';

    selective_dict_modal_top_bar.appendChild(target_language_label);
    selective_dict_modal_top_bar.appendChild(target_language_select);

    selective_dict_modal_top_bar.appendChild(translate_button);


    function handle_keydowns(e) {
        // scroll up
        if (e.key == "ArrowDown") {
            d2.scrollBy(0, 8)
            e.preventDefault()
        }
        // Scroll down
        if (e.key == "ArrowUp") {
            d2.scrollBy(0, -8)
            e.preventDefault()
        }
        // Translate by keydown
        if (e.key == "Enter") {
            translateButtonCallback()
            e.preventDefault()
        }
    }

    document.addEventListener('keydown', handle_keydowns)

    function saveOptions() {
        var sl_select = [source_language_select.selectedOptions[0].innerHTML, source_language_select.selectedIndex];
        var tl_select = [target_language_select.selectedOptions[0].innerHTML, target_language_select.selectedIndex];

        browser.storage.local.set({
            translateFromSelect: sl_select,
            translateToSelect: tl_select
        });

    }

    function restoreOptions() {

        function setCurrentChoice(result) {
            var source_selected_index = (result.translateFromSelect == undefined) ? default_source_selected_index : result.translateFromSelect[1] // 21 is selected index of English language in select options
            var target_selected_index = (result.translateToSelect == undefined) ? default_target_selected_index : result.translateToSelect[1] // 70 is selected index of Persian language in select options

            source_language_select.selectedIndex = source_selected_index;
            target_language_select.selectedIndex = target_selected_index;
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        var getting = browser.storage.local.get(["translateFromSelect", "translateToSelect"]);
        getting.then(setCurrentChoice, onError);

    }

    restoreOptions();

    var translateButtonCallback = function (e) {
        saveOptions();
        var sl = source_language_select.value;
        var tl = target_language_select.value;
        text = text_input.value;

        if (text.trim() == '') {
            return
        }

        var xhttp = request(text, sl, tl, function () {

            if (this.readyState == 4 && this.status == 200) {
                var j = JSON.parse(this.responseText);
                element = display_translations(j);
                d2.firstChild.remove();
                d2.appendChild(element);

            }
        });

        xhttp.send();
    }

    translate_button.addEventListener('click', translateButtonCallback);

    for (language in language_codes) {
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

    var close_modal = function () {
        selective_dict_modal.addEventListener('transitionend', function (e) {
            document.removeEventListener('keydown', handle_keydowns)
            selective_dict_modal.remove();
            backdrop.remove();
        }, false);

        selective_dict_modal.style.top = '-150%';
        selective_dict_modal.style.opacity = '.8';
        selective_dict_modal.style.MozTransition = 'top 1s, opacity .5s ease-out'
    }

    var close_modal_callback = function (e) {
        close_modal();
    }

    close_button.addEventListener('click', close_modal_callback);
    backdrop.addEventListener('click', close_modal_callback);

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        // handle <ESC> key as an close shortcut
        if (evt.keyCode == 27) {
            close_modal();
        }
    };

    if (has_update) {
        let update_icon =  document.createElement('a');
        update_icon.className = "sd-update-icon";
        update_icon.href = "https://addons.mozilla.org/addon/selectivedict/";
        update_icon.target = "_blank";
        selective_dict_modal_container.appendChild(update_icon)

        let update_tip =  document.createElement('div');
        update_tip.className = "sd-update-tip";
        update_tip.innerText = "A new update exists. please update the addon.";
        selective_dict_modal_container.appendChild(update_tip)

        update_icon.addEventListener('mouseover', ()=>{
            update_tip.style.display = 'flex';
        })
        update_icon.addEventListener('mouseout', ()=>{
            update_tip.style.display = 'none';
        })
    }


    selective_dict_modal.appendChild(selective_dict_modal_top_bar);
    selective_dict_modal.appendChild(selective_dict_modal_container);

    selective_dict_modal_container.appendChild(close_button);
    selective_dict_modal_container.appendChild(d2);

    document.body.appendChild(backdrop);
    document.body.appendChild(selective_dict_modal);

    // Animating as bigan as appedning element to the dom:
    selective_dict_modal.style.MozTransition = 'opacity .5s ease-in-out, top .5s ease-in-out'
    selective_dict_modal.style.opacity = '0';
    selective_dict_modal.style.top = '15%';

    // reflow: to solve immediate CSS transitions on newly-appended elements `document.body.appendChild(p);` are 
    //somehow ignored - the end state of the transition is rendered immediately.
    // reference: https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
    selective_dict_modal.getBoundingClientRect();
    selective_dict_modal.style.opacity = '1';
    selective_dict_modal.style.top = '10%';
}

function start_spiner() {
    var spinner = document.createElement('div');
    spinner.className = "selective-dict-spinner";
    document.body.appendChild(spinner);
}

function stop_spinner() {
    let spinner = document.getElementsByClassName('selective-dict-spinner')[0];
    spinner.remove();
}

var translate = function (text, sl, tl) {
    start_spiner();
    var xhttp = request(text, sl, tl, function () {
        if (this.readyState == 4 && this.status == 200) {
            var j = JSON.parse(this.responseText);
            create_modal(display_translations(j));
        }
        if (this.readyState == 4 && this.status == 0) {
            var note = document.createElement('p');
            note.innerText = 'Connection error.';
            note.style.margin = '15px';
            note.style.color = 'red';
            create_modal(note);
        }
        stop_spinner();
    });
    xhttp.send();
}

function restoreOptions() {

    function setCurrentChoice(result) {

        var source_selected_index = (result.translateFromSelect == undefined) ? default_source_language : language_codes[result.translateFromSelect[0]];
        var target_selected_index = (result.translateToSelect == undefined) ? default_target_language : language_codes[result.translateToSelect[0]];

        sl = source_selected_index;
        tl = target_selected_index;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get(["translateFromSelect", "translateToSelect"]);
    getting.then(setCurrentChoice, onError);

}

var mouseUpEvevntCallback = function (e) {
    restoreOptions();
    text = window.getSelection().toString();
    window.getSelection().removeAllRanges()
    
    if (text != '') {
        translate(text, sl, tl);
    }
}

var keyUpCallback = function (e) {
    e.preventDefault()
    // B keycode is 66. (Shift + Control + B)
    if (e.shiftKey && e.ctrlKey && (e.keyCode == 66)) {
        browser.storage.local.set({
            is_translating: !is_translating,
        })
    }
}

document.addEventListener('keyup', keyUpCallback, false);

var enable = function () {
    is_translating = true;
    document.body.className = (document.body.className != '') ? document.body.className + ' ' + 'help-cursor' : 'help-cursor';
    document.body.addEventListener('mouseup', mouseUpEvevntCallback);
    window.getSelection().removeAllRanges();
}

var disable = function () {
    is_translating = false;
    document.body.className = document.body.className.replace(new RegExp('help-cursor', 'g'), '').trim();
    document.body.removeEventListener('mouseup', mouseUpEvevntCallback);
    window.getSelection().removeAllRanges();
}

// If the web page was refreshed
browser.storage.local.get(["is_translating"]).then((result) => {
    if (result.is_translating) {
        enable();
    } else {
        disable();
    }
});

function check_for_update() {
    let current_version = browser.runtime.getManifest().version;
    let url = 'https://raw.githubusercontent.com/iraj-jelo/selectivedict/master/manifest.json'

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var j = JSON.parse(this.responseText);
            if (j.version != current_version) {
                has_update = true
            } else {
                has_update = false
            }
        }
    };
    xhttp.open("GET", url, false);
    xhttp.send();
}

browser.storage.onChanged.addListener((result) => {
    if (result.is_translating.newValue == true) {
        check_for_update()
        enable()
    } else {
        disable();
    }
})