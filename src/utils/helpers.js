
module.exports = {
  queryToObject(history) {
    let query = history.location.search.substr(1);
    let obj = {};
    let indexOf = query.indexOf('=');
    while (indexOf !== -1) {
      if (query.indexOf('&') !== -1) {
        obj[query.substring(0, indexOf)] = query.substring(indexOf + 1, query.indexOf('&'));
        query = query.substring(query.indexOf('&') + 1);
      } else {
        obj[query.substring(0, indexOf)] = query.substring(indexOf + 1);
        query = '';
      }
      indexOf = query.indexOf('=');
    }
    return obj;
  }
}