$(function () {
    getStorage({csdnExpendStatus: 'off'}, function (items) {
        var status = items.csdnExpendStatus;
        if (status && status === 'on') {
            csdnExpendOn();
        } else {
            csdnExpendOff();
        }
    });

});

function csdnExpendOn() {
    console.log('检测到csdn, 启动自动展开...');
    csdnExpend();
}

function csdnExpendOff() {
    console.log('csdn自动展开已关闭.');
}

function csdnExpend() {
    $('.hide-article-box').remove();
    $('#article_content').css('height', 'auto');
    notification({
        title: '检测到csdn',
        tag: 'csdn expend',
        body: '自动展开全文'
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.nameReplaceStatus) {
        if (request.nameReplaceStatus === 'on') {
            csdnExpendOn();
        } else {
            csdnExpendOff();
        }
    }
    sendResponse('csdn expend: received！');
});
