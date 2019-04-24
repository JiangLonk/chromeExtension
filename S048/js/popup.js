var bg = chrome.extension.getBackgroundPage();
$(function () {

    /* ↓姓名纠正↓ */
    var $switchNameReplace = $('#switch-name-replace');
    bg.getStorage({nameReplaceStatus: 'off'}, function (items) {
        var status = items.nameReplaceStatus;
        if (status === 'on') {
            $switchNameReplace.removeClass('label-default');
            $switchNameReplace.addClass('label-success');
        } else {
            $switchNameReplace.removeClass('label-success');
            $switchNameReplace.addClass('label-default');
        }
    });

    $switchNameReplace.click(function () {
        bg.getStorage({nameReplaceStatus: 'off'}, function (items) {
            var status = items.nameReplaceStatus;
            if (status === 'on') {
                bg.replaceOff($switchNameReplace);
            } else {
                bg.replaceOn($switchNameReplace);
            }
        });
    });
    /* ↑姓名纠正↑ */

    /* ↓zhihu fuzzy↓ */
    var $switchZhihuFuzzy = $('#switch-zhihu-fuzzy');
    bg.getStorage({zhihuFuzzyStatus: 'off'}, function (items) {
        var status = items.zhihuFuzzyStatus;
        if (status === 'on') {
            $switchZhihuFuzzy.removeClass('label-default');
            $switchZhihuFuzzy.addClass('label-success');
        } else {
            $switchZhihuFuzzy.removeClass('label-success');
            $switchZhihuFuzzy.addClass('label-default');
        }
    });

    $switchZhihuFuzzy.click(function () {
        bg.getStorage({zhihuFuzzyStatus: 'off'}, function (items) {
            var status = items.zhihuFuzzyStatus;
            if (status === 'on') {
                bg.fuzzyOff($switchZhihuFuzzy);
            } else {
                bg.fuzzyOn($switchZhihuFuzzy);
            }
        });
    });
    /* ↑zhihu fuzzy↑ */

    /* ↓csdn expend↓ */
    var $switchCsdnExpend = $('#switch-csdn-expend');
    bg.getStorage({csdnExpendStatus: 'off'}, function (items) {
        var status = items.csdnExpendStatus;
        if (status === 'on') {
            $switchCsdnExpend.removeClass('label-default');
            $switchCsdnExpend.addClass('label-success');
        } else {
            $switchCsdnExpend.removeClass('label-success');
            $switchCsdnExpend.addClass('label-default');
        }
    });

    $switchCsdnExpend.click(function () {
        bg.getStorage({csdnExpendStatus: 'off'}, function (items) {
            var status = items.csdnExpendStatus;
            if (status === 'on') {
                bg.csdnExpendOff($switchCsdnExpend);
            } else {
                bg.csdnExpendOn($switchCsdnExpend);
            }
        });
    });
    /* ↑csdn expend↑ */

    /* ↓switch-gitlab-count↓ */
    var $switchGitlabCount = $('#switch-gitlab-count');
    bg.getStorage({gitlabCommitStatus: 'off'}, function (items) {
        var status = items.gitlabCommitStatus;
        if (status === 'on') {
            $switchGitlabCount.removeClass('label-default');
            $switchGitlabCount.addClass('label-success');
        } else {
            $switchGitlabCount.removeClass('label-success');
            $switchGitlabCount.addClass('label-default');
        }
    });

    $switchGitlabCount.click(function () {
        bg.getStorage({gitlabCommitStatus: 'off'}, function (items) {
            var status = items.gitlabCommitStatus;
            if (status === 'on') {
                bg.gitLabCommitCountOff($switchGitlabCount);
            } else {
                bg.gitLabCommitCountOn($switchGitlabCount);
            }
        });
    });
    /* ↑switch-gitlab-count↑ */

    /* ↓smshxb↓ */

    var time = bg.getStorage({time: '18:00'}, function (items) {
        $('#switch-smshxb-timer').val(items.time)
    });

    var $switchSmshxb = $('#switch-smshxb');
    bg.getStorage({smshxbStatus: 'off'}, function (items) {
        var status = items.smshxbStatus;
        if (status === 'on') {
            $switchSmshxb.removeClass('label-default');
            $switchSmshxb.addClass('label-success');
        } else {
            $switchSmshxb.removeClass('label-success');
            $switchSmshxb.addClass('label-default');
        }
    });

    $switchSmshxb.click(function () {
        $('#smshxb-form').fadeToggle();
    });

    $('#switch-smshxb-ok').click(function () {
        var time = $('#switch-smshxb-timer').val();
        bg.getStorage({smshxbStatus: 'on'}, function (items) {
            bg.smshxbOn($switchSmshxb, time);
        });
        $('#smshxb-form').fadeOut();
    });

    $('#switch-smshxb-stop').click(function () {
        bg.getStorage({smshxbStatus: 'off'}, function (items) {
            bg.smshxbOff($switchSmshxb);
        });
        $('#smshxb-form').fadeOut();
    });
    /* ↑smshxb↑ */

    /* ↓↓ */
    /* ↑↑ */

});
