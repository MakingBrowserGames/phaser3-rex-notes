import TextStyle from 'rexPlugins/utils/text/TextStyle.js';

var GETPROP_RESULT = {
    rawText: null,
    prevProp: null
};

var STYLE_RESULT = new TextStyle();
var EMPTYPROP = {};

var parser = {
    splitText: function (text, mode) {
        var result = [];
        var arr, m, charIdx = 0,
            totalLen = text.length,
            matchStart = totalLen;

        while (true) {
            arr = RE_SPLITTEXT.exec(text);
            if (!arr) {
                break;
            }

            m = arr[0];
            matchStart = RE_SPLITTEXT.lastIndex - m.length;

            if (charIdx < matchStart) {
                result.push(text.substring(charIdx, matchStart));

            }

            if (mode === undefined)
                result.push(m);

            charIdx = RE_SPLITTEXT.lastIndex;
        }

        if (charIdx < totalLen) {
            result.push(text.substring(charIdx, totalLen));
        }
        return result; // [text,...]
    },

    tagTextToProp: function (text, prevProp) {
        var rawText, innerMatch;

        if (prevProp == null) {
            prevProp = {};
        }

        // close image tag
        if (prevProp.img) {
            updateProp(prevProp, PROP_REMOVE, "img");
        }
        // Check if current fragment is a class tag
        if (RE_BLOD_OPEN.test(text)) {
            updateProp(prevProp, PROP_ADD, "b", true);
            rawText = "";
        } else if (RE_BLOD_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "b");
            rawText = "";
        } else if (RE_ITALICS_OPEN.test(text)) {
            updateProp(prevProp, PROP_ADD, "i", true);
            rawText = "";
        } else if (RE_ITALICS_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "i");
            rawText = "";
        } else if (RE_SIZE_OPEN.test(text)) {
            innerMatch = text.match(RE_SIZE_OPEN);
            updateProp(prevProp, PROP_ADD, "size", innerMatch[1] + "px");
            rawText = "";
        } else if (RE_SIZE_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "size");
            rawText = "";
        } else if (RE_COLOR_OPEN.test(text)) {
            innerMatch = text.match(RE_COLOR_OPEN);
            updateProp(prevProp, PROP_ADD, "color", innerMatch[1]);
            rawText = "";
        } else if (RE_COLOR_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "color");
            rawText = "";
        } else if (RE_UNDERLINE_OPEN.test(text)) {
            innerMatch = text.match(RE_UNDERLINE_OPEN);
            updateProp(prevProp, PROP_ADD, "u", true);
            rawText = "";
        } else if (RE_UNDERLINE_OPENC.test(text)) {
            innerMatch = text.match(RE_UNDERLINE_OPENC);
            updateProp(prevProp, PROP_ADD, "u", innerMatch[1]);
            rawText = "";
        } else if (RE_UNDERLINE_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "u");
            rawText = "";
        } else if (RE_SHADOW_OPEN.test(text)) {
            updateProp(prevProp, PROP_ADD, "shadow", true);
            rawText = "";
        } else if (RE_SHADOW_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "shadow");
            rawText = "";
        } else if (RE_STROKE_OPEN.test(text)) {
            updateProp(prevProp, PROP_ADD, "stroke", true);
            rawText = "";
        } else if (RE_STROKE_OPENC.test(text)) {
            innerMatch = text.match(RE_STROKE_OPENC);
            updateProp(prevProp, PROP_ADD, "stroke", innerMatch[1]);
            rawText = "";
        } else if (RE_STROKE_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "stroke");
            rawText = "";
        } else if (RE_IMAGE_OPEN.test(text)) {
            innerMatch = text.match(RE_IMAGE_OPEN);
            updateProp(prevProp, PROP_ADD, "img", innerMatch[1]);
            rawText = "";
        } else if (RE_IMAGE_CLOSE.test(text)) {
            updateProp(prevProp, PROP_REMOVE, "img");
            rawText = "";
        } else {
            rawText = text
        }

        var result = GETPROP_RESULT;
        result.rawText = rawText;
        result.prop = prevProp;
        return result;
    },

    propToContextStyle: function (defaultStyle, prop) {
        var result = STYLE_RESULT;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family')) {
                result.fontFamily = prop.family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size')) {
                var size = prop.size;
                if (typeof (size) === 'number') {
                    size = size.toString() + 'px';
                }
                result.fontSize = size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }
            result.fontStyle = getFontStyle(prop.b, prop.i);

            if (prop.hasOwnProperty('color')) {
                result.color = prop.color;
            } else {
                result.color = defaultStyle.color;
            }

            if (prop.hasOwnProperty('stroke')) {
                if (prop.stroke === true) {
                    result.stroke = defaultStyle.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                } else {
                    result.stroke = prop.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                }
            } else {
                result.stroke = defaultStyle.stroke;
                result.strokeThickness = 0;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            if (prop.shadow === true) {
                result.shadowColor = defaultStyle.shadowColor;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            } else {
                result.shadowColor = prop.shadow;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            }
        } else {
            result.shadowColor = '#000';
            result.shadowOffsetX = 0;
            result.shadowOffsetY = 0;
            result.shadowBlur = 0;
            result.shadowStroke = false;
            result.shadowFill = false;
        }

        if (prop.hasOwnProperty('u')) {
            if (prop.u === true) {
                result.underlineColor = defaultStyle.underlineColor;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffset = defaultStyle.underlineOffset;
            } else {
                result.underlineColor = prop.u;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffset = defaultStyle.underlineOffset;
            }
        } else {
            result.underlineColor = '#000';
            result.underlineThickness = 0;
            result.underlineOffset = 0;
        }

        return result;
    },

    propToTagText: function (text, prop, prevProp) {
        if (prevProp == null)
            prevProp = EMPTYPROP;

        for (var k in prevProp) {
            if (prop.hasOwnProperty(k))
                continue;

            text = "[/" + k + "]" + text;
        }

        var header = "";
        for (var k in prop) {
            if (prevProp[k] === prop[k])
                continue;

            if (k === "size")
                header += ("[size=" + prop[k].replace("px", "") + "]");
            else if ((k === "color") || (k === "stroke") || (k === "img"))
                header += ("[" + k + "=" + prop[k] + "]");

            else if (k === "u") {
                if (prop[k] === true)
                    header += "[u]";
                else
                    header += ("[u=" + prop[k] + "]");
            } else
                header += ("[" + k + "]");
        }
        text = header + text;

        return text;
    }
};

var updateProp = function (prop, op, key, value) {
    if (op === PROP_ADD) {
        // PROP_ADD     
        prop[key] = value;
    } else {
        // PROP_REMOVE        
        if (prop.hasOwnProperty(key)) {
            delete prop[key];
        }
    }

    return prop;
};

var getFontStyle = function (isBold, isItalic) {
    if (isBold && isItalic)
        return "bold italic";
    else if (isBold)
        return "bold";
    else if (isItalic)
        return "italic";
    else
        return "";
};

var RE_SPLITTEXT = /\[b\]|\[\/b\]|\[i\]|\[\/i\]|\[size=(\d+)\]|\[\/size\]|\[color=([a-z]+|#[0-9abcdef]+)\]|\[\/color\]|\[u\]|\[u=([a-z]+|#[0-9abcdef]+)\]|\[\/u\]|\[shadow\]|\[\/shadow\]|\[stroke\]|\[stroke=([a-z]+|#[0-9abcdef]+)\]|\[\/stroke\]|\[img=([^\]]+)\]|\[\/img\]/ig;

var RE_BLOD_OPEN = /\[b\]/i;
var RE_BLOD_CLOSE = /\[\/b\]/i;
var RE_ITALICS_OPEN = /\[i\]/i;
var RE_ITALICS_CLOSE = /\[\/i\]/i;
var RE_SIZE_OPEN = /\[size=(\d+)\]/i;
var RE_SIZE_CLOSE = /\[\/size\]/i;
var RE_COLOR_OPEN = /\[color=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_COLOR_CLOSE = /\[\/color\]/i;
var RE_UNDERLINE_OPEN = /\[u\]/i;
var RE_UNDERLINE_OPENC = /\[u=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_UNDERLINE_CLOSE = /\[\/u\]/i;
var RE_SHADOW_OPEN = /\[shadow\]/i;
var RE_SHADOW_CLOSE = /\[\/shadow\]/i;
var RE_STROKE_OPEN = /\[stroke\]/i;
var RE_STROKE_OPENC = /\[stroke=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_STROKE_CLOSE = /\[\/stroke\]/i;
var RE_IMAGE_OPEN = /\[img=([^\]]+)\]/i;
var RE_IMAGE_CLOSE = /\[\/img\]/i;
const PROP_REMOVE = false;
const PROP_ADD = true;

export default parser;