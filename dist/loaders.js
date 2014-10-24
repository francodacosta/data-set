/*!
 * DataSet | Powerfull dataset for your app
 * http://francodacosta.com/data-set/
 *
 * Copyright 2013-2014, Nuno Costa <nuno@francodacosta.com>
 * Released under the MIT license
 * https://github.com/francodacosta/data-set/blob/master/LICENSE
 *
 */
window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Loader = window.Francodacosta.DataSet.Loader || {};

window.Francodacosta.DataSet.Loader.Array = (function() {
  function Array(data, headerInFirstRow) {
    this.data = data;
    this.headerInFirstRow = headerInFirstRow;
    this.headerInFirstRow = this.headerInFirstRow || false;
  }

  Array.prototype.load = function() {
    var columns, _i, _ref, _results;
    if (this.headerInFirstRow) {
      columns = this.data.shift();
    } else {
      columns = (function() {
        _results = [];
        for (var _i = 0, _ref = this.data[0].length; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    }
    return new window.Francodacosta.DataSet.dataset(this.data, columns);
  };

  return Array;

})();

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Loader = window.Francodacosta.DataSet.Loader || {};

window.Francodacosta.DataSet.Loader.Json = (function() {
  function Json(data) {
    this.data = data;
  }

  Json.prototype.load = function() {
    var columns, data, prop;
    data = this.data;
    if (typeof data !== 'object') {
      data = JSON.parse(data);
    }
    columns = [];
    for (prop in data[0]) {
      columns.push(prop);
    }
    return new window.Francodacosta.DataSet.dataset(data, columns);
  };

  return Json;

})();

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Loader = window.Francodacosta.DataSet.Loader || {};

window.Francodacosta.DataSet.Loader.Markup = (function() {
  function Markup(htmlTable) {
    this.htmlTable = htmlTable;
  }

  Markup.prototype.load = function() {
    var columns, table, values;
    table = $(this.htmlTable);
    columns = [];
    table.find('tr').first().find('th').each(function(index, el) {
      var name;
      el = $(el);
      name = el.attr('data-name');
      if (!name) {
        name = el.text();
      }
      return columns.push(name);
    });
    values = [];
    table.find('tr').each(function(index, el) {
      var row;
      row = void 0;
      $(this).find('td').each(function() {
        if (!row) {
          row = [];
        }
        return row.push($(this).html());
      });
      if (row) {
        return values.push(row);
      }
    });
    return new window.Francodacosta.DataSet.dataset(values, columns);
  };

  return Markup;

})();
