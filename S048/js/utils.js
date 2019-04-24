/**
 * 从local获取数据
 * @param keyArrays
 * @param cb
 */
function getStorage(keyArrays, cb) {
    chrome.storage.local.get(keyArrays, function (items) {
        if (cb && $.isFunction(cb)) {
            cb(items);
        }
    });
}

/**
 * 保存数据到local
 * @param keyArrays
 * @param cb
 */
function setStorage(keyArrays, cb) {
    chrome.storage.local.set(keyArrays, function () {
        if (cb && $.isFunction(cb)) {
            cb(items);
        }
    });

}

/**
 * 向contentScript发送消息
 * @param message
 * @param callback
 */
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function notification(opt) {
    Notification.requestPermission(function (permission) {
        var notification = new Notification(opt.title, {
            dir: "auto",
            lang: "zh-CN",
            tag: opt.tag,
            body: opt.body
        });
    });
}

/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var Intervals = {};

function addIntervals(key, action, time) {
    Intervals[key] = setInterval(action, time);
}

function getIntervals(key) {
    return Intervals.key;
}

function removeIntervals(key) {
    clearInterval(Intervals[key]);
}

function tikTok(key, time, todo) {
    var now = new Date();
    var date = new Date(time);
    var diff = date.getTime() - now.getTime();
    var oneSecond = 1000;
    var oneMinutes = 60 * oneSecond;
    var fiveMinutes = 5 * oneMinutes;
    var quarterHour = 15 * oneMinutes;
    var halfHour = 30 * oneMinutes;
    var oneHour = 60 * oneMinutes;
    var nextBound;
    if (diff >= oneHour) {
        nextBound = oneHour;
    } else if (diff < oneHour && diff >= halfHour) {
        nextBound = halfHour;
    } else if (diff < halfHour && diff >= quarterHour) {
        nextBound = quarterHour;
    } else if (diff < quarterHour && diff >= fiveMinutes) {
        nextBound = fiveMinutes;
    } else if (diff < fiveMinutes && diff >= oneMinutes) {
        nextBound = oneMinutes;
    } else if (diff < oneMinutes && diff >= oneSecond) {
        nextBound = oneSecond;
    }
    removeIntervals(key);
    var diffSecond = diff / 1000;
    var diffMinutes = diffSecond / 60;
    var diffHour = diffMinutes / 60;
    var msg = key + ': ';
    if (diffSecond > 1) {
        if (diffHour > 1) {
            msg += Math.floor(diffHour) + 'h ';
        }
        if (diffMinutes > 1) {
            msg = now.Format('yyyy-MM-dd hh:mm:ss') + ' -> ' + msg;
            msg += Math.floor(diffMinutes % 60) + 'm ';
        }
        msg += Math.floor(diffSecond % 60) + 's';
    } else {
        if (diffHour < -1) {
            msg += Math.floor(-diffHour) + 'h ';
        }
        if (diffMinutes < -1) {
            msg = now.Format('yyyy-MM-dd hh:mm:ss') + ' -> ' + msg;
            msg += Math.floor(-diffMinutes % 60) + 'm ';
        }
        msg += Math.floor(-diffSecond % 60) + 's ago';
    }
    console.log(msg);
    if (nextBound) {
        addIntervals(key, function () {
            tikTok(key, time, todo);
        }, nextBound);
    } else {
        if (diffMinutes > -15) {
            todo();
        }
    }
}

/* ↓姓名纠正↓ */
function replaceOn(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-default');
    $switch.addClass('label-success');
    setStorage({nameReplaceStatus: 'on'});
    sendMessageToContentScript({nameReplaceStatus: 'on'});
}

function replaceOff(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-success');
    $switch.addClass('label-default');
    setStorage({nameReplaceStatus: 'off'});
    sendMessageToContentScript({nameReplaceStatus: 'off'});
}

/* ↑姓名纠正↑ */

/* ↓zhihu fuzzy↓ */
function fuzzyOn(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-default');
    $switch.addClass('label-success');
    setStorage({zhihuFuzzyStatus: 'on'});
    sendMessageToContentScript({zhihuFuzzyStatus: 'on'});
}

function fuzzyOff(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-success');
    $switch.addClass('label-default');
    setStorage({zhihuFuzzyStatus: 'off'});
    sendMessageToContentScript({zhihuFuzzyStatus: 'off'});
}

/* ↑zhihu fuzzy↑ */

/* ↓csdn expend↓ */
function csdnExpendOn(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-default');
    $switch.addClass('label-success');
    setStorage({csdnExpendStatus: 'on'});
    sendMessageToContentScript({csdnExpendStatus: 'on'});
}

function csdnExpendOff(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-success');
    $switch.addClass('label-default');
    setStorage({csdnExpendStatus: 'off'});
    sendMessageToContentScript({csdnExpendStatus: 'off'});
}

/* ↑csdn expend↑ */


/* ↓switch-gitlab-count↓ */
function gitLabCommitCountOn(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-default');
    $switch.addClass('label-success');
    setStorage({gitlabCommitStatus: 'on'});
    sendMessageToContentScript({gitlabCommitStatus: 'on'});
}

function gitLabCommitCountOff(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-success');
    $switch.addClass('label-default');
    setStorage({gitlabCommitStatus: 'off'});
    sendMessageToContentScript({gitlabCommitStatus: 'off'});
}

/* ↑switch-gitlab-count↑ */

/* ↓smshxb↓ */
function smshxbOn(obj, time) {
    var $switch = $(obj);
    $switch.removeClass('label-default');
    $switch.addClass('label-success');
    setStorage({smshxbStatus: 'on', time: time});
    sendMessageToContentScript({smshxbStatus: 'on'});
}

function smshxbOff(obj) {
    var $switch = $(obj);
    $switch.removeClass('label-success');
    $switch.addClass('label-default');
    setStorage({smshxbStatus: 'off'});
    sendMessageToContentScript({smshxbStatus: 'off'});
}

/* ↑smshxb↑ */

/* ↓↓ */
/* ↑↑ */