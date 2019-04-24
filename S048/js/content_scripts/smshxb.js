$(function () {
    getStorage({smshxbStatus: 'off'}, function (items) {
        var status = items.smshxbStatus;
        if (status && status === 'on') {
            smshxbOn();
        } else {
            smshxbOff();
        }
    });

});

function smshxbOn() {
    getStorage({time: '18:00'}, function (items) {
        var defaultTime;
        if (items.time) {
            defaultTime = new Date().Format('yyyy-MM-dd ' + items.time + ':00');
        } else {
            defaultTime = new Date().Format('yyyy-MM-dd 18:00:00');
        }
        tikTok('xb', defaultTime, function () {
            notification({
                title: '侦测到xb',
                tag: 'xb',
                body: new Date().Format('yyyy-MM-dd hh:mm:ss') + ' xbl\r\n请滚，不要浪费电费'
            });
        });
    });
}

function smshxbOff() {
    console.log('jb');
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.smshxbStatus) {
        if (request.smshxbStatus === 'on') {
            smshxbOn(request.time);
        } else {
            smshxbOff();
        }
    }
    sendResponse('smshxb: received！');
});
