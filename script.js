const {log} = console;
const bodyEL = document.getElementsByTagName('body')[0];

const ruKeyboard = [ 'ё','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                    'Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ', '&#92','Del',
                    'CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter',
                    'Shift','я','ч','с','м','и','т','ь','б','ю', '.', '▲', 'Shift',
                    'Ctrl','Win','Alt',' ','Alt','◄','▼','►','Ctrl' ];

const enKeyboard = [ '`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace',
                    'Tab','q','w','e','r','t','y','u','i','o','p','[',']', '&#92;','Del',
                    'CapsLock','a','s','d','f','g','h','j','k','l',';',`'`,'Enter',
                    'Shift','z','x','c','v','b','n','m',',','.', '/', '▲', 'Shift',
                    'Ctrl','Win','Alt',' ','Alt','◄','▼','►','Ctrl' ];

const ruShiftKeyboard = ['Ё','!','"','№',';','%',':','?','*','(',')','_','+'];

const enShiftKeyboard = ['~','!','@', '#', '$','%','^','&','*','(',')','_','+'];

const containerEL = document.createElement('div');
const textAreaEL = document.createElement('textarea');
const keyboardEL = document.createElement('div');
const h1EL = document.createElement('h1');

h1EL.innerText = 'RSS Виртуальная клавиатура';

containerEL.classList.add('container');
textAreaEL.classList.add('textarea');
keyboardEL.classList.add('keyboard');

containerEL.append(textAreaEL);
containerEL.append(keyboardEL);
bodyEL.prepend(h1EL)
bodyEL.append(containerEL)

function createButtonsKeyboard(arr) {
    if(keyboardEL.childNodes) {
        keyboardEL.innerHTML = '';
    }
    arr.forEach((elem) => {
        let buttonEL = document.createElement('button');
        buttonEL.innerHTML = elem;
        buttonEL.classList.add('k-key')
        buttonEL.setAttribute('code', elem)
        if(elem == 'Del') {
            buttonEL.setAttribute('code', 'Delete')
        }
        if(elem == '▲') {
            buttonEL.setAttribute('code', 'ArrowUp')
        }
        if(elem == '▼') {
            buttonEL.setAttribute('code', 'ArrowDown')
        }
        if(elem == '◄') {
            buttonEL.setAttribute('code', 'ArrowLeft')
        }
        if(elem == '►') {
            buttonEL.setAttribute('code', 'ArrowRight')
        }
        keyboardEL.append(buttonEL);
    })
}

createButtonsKeyboard(enKeyboard);

document.addEventListener('keydown', (event) => {
    if(event.code != 'AltLeft' 
    && event.code != 'CapsLock' && event.code != 'ControlLeft'
    && event.code != 'AltRight' && event.code != 'ControlRight'
    && event.code != 'Escape' && event.code != 'Backspace'
    && event.code != 'F1' && event.code != 'F2' && event.code != 'F3' && event.code != 'F4'
    && event.code != 'F5' && event.code != 'F6' && event.code != 'F7' && event.code != 'F8'
    && event.code != 'F9' && event.code != 'F10' && event.code != 'F11' && event.code != 'F12'
    && event.code != 'Delete' && event.code != 'Home' && event.code != 'NumLock' && event.code != 'PageUp'
    && event.code != 'PageDown' && event.code != 'Enter' && event.code != 'MetaLeft' && event.code != 'ShiftRight'
    && event.code != 'ContextMenu' && event.code != 'ArrowUp' && event.code != 'ArrowDown' 
    && event.code != 'ArrowLeft'&& event.code != 'ArrowRight' && event.code != 'Tab' && event.code != 'ShiftLeft') {
        textAreaEL.innerHTML += event.key; 
    }
    document.querySelectorAll('.k-key').forEach((elem) => {
        elem.classList.remove('active');
    })  
    document.querySelectorAll('.k-key[code = "'+ event.key +'"]').forEach((elem) => {
        elem.classList.add('active');   
    })
    if(event.code == 'CapsLock') {
        document.querySelectorAll('.k-key').forEach((elem) => {
            elem.classList.toggle('transform-upper');
        }) 
    }
});

const textarea = document.querySelector('textarea')

textarea.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      let start = this.selectionStart;
      let end = this.selectionEnd;
  
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
    if(e.code == 'ArrowUp') {
        this.value += '▲';
    }
    if(e.code == 'ArrowDown') {
        this.value += '▼';
    }
    if(e.code == 'ArrowLeft') {
        this.value += '◄';
    }
    if(e.code == 'ArrowRight') {
        this.value += '►';
    }
});

let n = true;

function runOnKeys(func, func1, ...codes) {
    let pressed = new Set();
    
    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) { 
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

      if(n === true) {
        func();
        n = false;
      } else {
        func1();
        n = true;
      }
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });
  }

runOnKeys(
    () => changeLanguage(enKeyboard),
    () => changeLanguage(ruKeyboard),
    "ShiftLeft",
    "AltLeft"
);

runOnKeys(
    () => shiftChange(ruShiftKeyboard),
    () => shiftChange(enShiftKeyboard),
    "ShiftLeft",
);

function changeLanguage(arr) {
    for(let i = 0; i<buttons.length; i++) {
        buttons[i].innerHTML = arr[i];
    }
}

function shiftChange(arr) {
    for(let i = 0; i<arr.length; i++) {
        buttons[i].innerHTML = arr[i];
    } 
}

const buttons = document.querySelectorAll('.k-key');
let textArea = document.querySelectorAll('textarea')[0];

buttons.forEach((elem) => {
    elem.addEventListener('click', (event) => {
        if(event.target.innerText != 'Alt' 
        && event.target.innerText != 'CapsLock' && event.target.innerText != 'Ctrl'
        && event.target.innerText != 'Backspace'
        && event.target.innerText != 'Del' && event.target.innerText != 'Enter' 
        && event.target.innerText != 'Tab' && event.target.innerText != 'Shift'&& event.target.innerText != 'Win') {
             textAreaEL.value += elem.innerText; 
        }
        if(event.target.innerText == 'Tab') {
            textAreaEL.value += "\t"; 
        }
        if(event.target.innerText == '') {
            textAreaEL.value += " ";
        }
        if(event.target.innerText == 'CapsLock') {
            document.querySelectorAll('.k-key').forEach((elem) => {
                elem.classList.toggle('transform-upper');
            }) 
        }
        if(event.target.innerText == 'Enter') {
            textAreaEL.value += "\n";
        }
        if(event.target.innerText == 'Backspace') {
            let sel = textArea.selectionEnd
            let start = textArea.selectionStart;
            if(sel == 0) {
                textArea.value = textArea.value;
            } else {
                let finText = textArea.value.slice(0, sel-1) + '' + textArea.value.slice(sel);
                textArea.value = finText;
                textArea.focus();
                textArea.setSelectionRange(start, sel)
            }
        }
        if(event.target.innerText == 'Del') {
            let sel = textArea.selectionEnd
            let start = textArea.selectionStart;
            let finText = textArea.value.slice(0, sel) + '' + textArea.value.slice(sel+1);
            textArea.value = finText;
            textArea.focus();
            textArea.setSelectionRange(start, sel)
        }

        if(event.target.innerText == 'Shift') {   
            if(n) {
                event.target.addEventListener('mousedown', function(event) {
                    shiftChange(enShiftKeyboard);
                });
            
                event.target.addEventListener('mouseup', function(event) {
                    for(let i = 0; i<enShiftKeyboard.length; i++) {
                        buttons[i].innerHTML = enKeyboard[i];
                    }
                });
            } 
        }
    })
})