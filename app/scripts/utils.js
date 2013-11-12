function errorBroadcast(msg, $rootScope) {
    alertBroadcast('danger', msg, $rootScope);
}

function successBroadcast(msg, $rootScope) {
    alertBroadcast('success', msg, $rootScope);
}

function alertBroadcast(msgType, msg, $rootScope) {
    $rootScope.$broadcast("alert-generated", {
        alertType: msgType,
        message: msg
    });
}

function dateToString(d) {
    //loose equality check (==) checks both null and undefined
    //so d == null also catches undefined values
    //which is not what we want to explicitly check for undefined
    if (d === null || d === undefined) {
        return "";
    }
    if (Object.prototype.toString.call(d) !== "[object Date]") {
        return "";
    }
    var month = d.getMonth() + 1 + "";
    if (month.length == 1) {
        month = "0" + month;
    }
    var day = d.getDate() + "";
    if (day.length == 1) {
        day = "0" + day;
    }
    var year = d.getFullYear();
    return month + "/" + day + "/" + year;
}

function clearSearchBlanks(searchParams) {
    var cleaned = {};
    for (var key in searchParams) {
        if (searchParams[key]) {
            cleaned[key] = searchParams[key];
        }
    }
    return cleaned;
}

//convenience function to get a particular dropdown's options
//aList is meant to be the dropdown array from Introspection.
function getDropdown(aList, id) {
    var dropdown = {};
    for (var i = 0; i < aList.length; i++) {
        if (aList[i].name === id) {
            dropdown = aList[i];
            break;
        }
    }
    return dropdown.options;
}