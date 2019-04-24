var correct = '张恺程';
var incorrect = '张凯程';
var nameReplaceInterval;
var notified = 0;

$(function () {
    getStorage({nameReplaceStatus: 'off'}, function (items) {
        var status = items.nameReplaceStatus;
        if (status && status === 'on') {
            replaceOn();
        } else {
            replaceOff();
        }
    });

});

function replaceOn() {
    console.log('检测到日志平台, 启动姓名纠正...');
    nameReplaceInterval = setInterval(function () {
        replace();
    }, 114);
}

function replaceOff() {
    console.log('日志平台姓名纠正已关闭.');
    clearInterval(nameReplaceInterval);
}

function replace() {
    var $jsWorkLogsBox = $('#jsWorkLogsBox');
    if ($jsWorkLogsBox && $jsWorkLogsBox.html() && $jsWorkLogsBox.html().indexOf(incorrect) > -1) {
        $jsWorkLogsBox.html($jsWorkLogsBox.html().replace(incorrect, correct));
        notify();
    }
    var $header = $('.layui-header');
    if ($header && $header.html() && $header.html().indexOf(incorrect) > -1) {
        $header.html($header.html().replace(incorrect, correct));
        notify();
    }
    var $inputUser = $('input[name=dutyUsers]').siblings('div').find('.tag span');
    if ($inputUser && $inputUser.html() && $inputUser.html().indexOf(incorrect) > -1) {
        $inputUser.html($inputUser.html().replace(incorrect, correct));
        notify();
    }
    $('*').on('click', '#addUserLayer .layui-btn', function () {
        var $input = $('input[name=dutyUsers]');
        if ($input && $input.val() && $input.val().indexOf(incorrect) > -1) {
            $input.val($input.val().replace(incorrect, correct));
            notify();
        }
    });
}

function notify() {
    if (notified !== 0) {
        notification({
            title: '检测到错别字',
            tag: 'zhihu fuzzy',
            body: '已进行替换'
        });
        notified = 1;
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.nameReplaceStatus) {
        if (request.nameReplaceStatus === 'on') {
            replaceOn();
        } else {
            replaceOff();
        }
    }
    sendResponse('name replace: received！');
});
