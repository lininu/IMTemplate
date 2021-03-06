(function ($){
    if(typeof $.dateRangePickerLanguages == "object") {
        var language = {
            'zh-tw' : {
                    'selected': '已選擇：',
                    'day':'天',
                    'days': '天',
                    'apply': '確定',
                    'week-1' : '一',
                    'week-2' : '二',
                    'week-3' : '三',
                    'week-4' : '四',
                    'week-5' : '五',
                    'week-6' : '六',
                    'week-7' : '日',
                    'week-number': '周',
                    'month-name': ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                    'shortcuts' : '快速選擇',
                    'past': '過去',
                    'following':'未來',
                    'previous' : '&nbsp;&nbsp;&nbsp;',
                    'prev-week' : '上周',
                    'prev-month' : '上個月',
                    'prev-year' : '去年',
                    'next': '&nbsp;&nbsp;&nbsp;',
                    'next-week':'下周',
                    'next-month':'下個月',
                    'next-year':'明年',
                    'less-than' : '選擇日期範圍不能大於%d天',
                    'more-than' : '選擇日期範圍不能小於%d天',
                    'default-more' : '請選擇大於%d天的日期範圍',
                    'default-less' : '請選擇小于%d天的日期範圍',
                    'default-range' : '請選擇%d天到%d天的日期範圍',
                    'default-single':'請選擇一個日期',
                    'default-default': '請選擇一個日期範圍',
                    'time':'時間',
                    'hour':'小時',
                    'minute':'分鐘'
            }
        }
        $.extend($.dateRangePickerLanguages, language);
    }
}( jQuery ));