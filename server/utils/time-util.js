function getLocalDate(date){
    var newDate = date.setHours(date.getHours() + 3);
    return newDate;
}


module.exports = {
    getLocalDate : getLocalDate
}