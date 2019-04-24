$(function () {
    getStorage({zhihuFuzzyStatus: 'off'}, function (items) {
        var status = items.zhihuFuzzyStatus;
        if (status && status === 'on') {
            fuzzyOn();
        } else {
            fuzzyOff();
        }
    });

});

function fuzzyOn() {
    console.log('检测到zhihu, 启动超级变换形态...');
    // nameReplaceInterval = setInterval(function () {
    dummy();
    // }, 114);
}

function fuzzyOff() {
    console.log('zhihu超级变换形态已关闭.');
    // clearInterval(nameReplaceInterval);
}

function dummy() {
    fuzzy();
}

function fuzzy() {
    $('.zu-top').hide();
    $('.ColumnPageHeader').hide();
    $('.AppHeader').hide();
    $('.QuestionHeader').hide();
    $('.Question-main').css('margin', 0);
    $('.AuthorInfo').hide();
    $('.VoteButton').hide();
    $('.Question-sideColumn').hide();
    // todo more fuzzy
    notification({
        title: '检测到摸鱼',
        tag: 'zhihu fuzzy',
        body: ''
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.nameReplaceStatus) {
        if (request.nameReplaceStatus === 'on') {
            fuzzyOn();
        } else {
            fuzzyOff();
        }
    }
    sendResponse('zhihu fuzzy: received！');
});