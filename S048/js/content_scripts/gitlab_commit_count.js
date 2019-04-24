$(function () {
    getStorage({gitlabCommitStatus: 'off'}, function (items) {
        var status = items.gitlabCommitStatus;
        if (status && status === 'on') {
            gitLabCommitCountOn();
        } else {
            gitLabCommitCountOff();
        }
    });

});

function gitLabCommitCountOn() {
    console.log('检测到gitlab, 启动自动统计...');
    setTimeout('count();', 500);
}

function gitLabCommitCountOff() {
    console.log('gitlab自动统计已关闭.');
}

function count() {
    var count = 0;
    $.each($('rect.user-contrib-cell'), function (i, v) {
        if ($.isNumeric($(v).attr('data-original-title').split(' ')[0])) {
            count += ($(v).attr('data-original-title').split(' ')[0] - 0);
        }
    });
    notification({
        title: '提交统计',
        tag: 'commit count',
        body: '截止 ' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ' 你已提交 ' + count + ' 次'
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.gitlabCommitStatus) {
        if (request.gitlabCommitStatus === 'on') {
            gitLabCommitCountOn();
        } else {
            gitLabCommitCountOff();
        }
    }
    sendResponse('gitlab count: received！');
});