## Introduction

Typing on text object.

- Author: Rex
- A plugin of text object

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/texttyping/TextTypingPlugin.js)

## Usage

### Create instance

```javascript
txt.typing = new TextTypingPlugin(txt, {
    //speed: 333,       // typing speed in ms
    //typeMode: 0,      //0|'left-to-right'|1|'right-to-left'|2|'middle-to-sides'|3|'sides-to-middle'
    //setTextCallback: function(text, isLastChar, insertIdx){ return text; }  // callback before set-text
    //setTextCallbackScope: null
});
```

Properties

- speed: typing speed in ms
- typeMode :
    - `'left-to-right'`, or `0` : typing characters from left to right.
    - `'right-to-left'`, or `1` : typing characters from right to left.
    - `'middle-to-sides'`, or `2` : typing characters from middle to sides, optional.
    - `'sides-to-middle'`, or `3` : typing characters from sides to middle.    
- setTextCallback : callback befor set-text, to decorate display text.
    ```javascript
    function(text, isLastChar, insertIdx) { return text; }
    ```
- setTextCallbackScope : scope of setTextCallback function.

### Start typing

```javascript
txt.typing.start('ABCDEFG');
// txt.typing.start('ABCDEFG', 333);  // speed in ms
```

### Events

- On typing event :

```javascript
txt.on('typing', function(){});
```

- On typing completed :

```javascript
txt.on('typingcompleted', function(){});
```

### Other commands

- Is-typing state

```javascript
var isTyping = txt.typing.isTyping;
```

- Stop typing

```javascript
txt.typing.stop();
// txt.typing.stop(true);;  // stop and show all text
```

- Pause/resume typing

```javascript
txt.typing.pause();
```

- Resume typing

```javascript
txt.typing.resume();
```

- Set typing speed

```javascript
txt.typing.setTypeSpeed(speed);  // speed in ms
```

Set speed in `typing` event or setTextCallback to change typing speed of remaining text.

- Typing more text

```javascript
txt.typing.appendText(text);
```

- Set typing mode

```javascript
txt.typing.setTypeMode(mode);  //0|'left-to-right'|1|'right-to-left'|2|'middle-to-sides'|3|'sides-to-middle'
```