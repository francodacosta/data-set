var window,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Column = (function() {
  function Column(name, title, options) {
    this.name = name;
    this.title = title;
    this.options = options;
    this.title = this.title || this.name;
    this.options = this.options || {};
    if (Object.prototype.toString.call(this.options) !== '[object Object]') {
      throw new Error("Options should be an object");
    }
    if (!this.name && this.name !== 0) {
      throw new Error("Column needs a name");
    }
  }

  Column.prototype.getName = function() {
    return this.name;
  };

  Column.prototype.getTitle = function() {
    return this.title;
  };

  Column.prototype.getOptions = function() {
    return this.options;
  };

  return Column;

})();

window = window || {};

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.dataset = (function() {
  function dataset(data, columns) {
    this.getColumns = __bind(this.getColumns, this);
    data = data || [];
    columns = columns || [];
    this.setColumns(columns);
    this.setData(data);
    this.sortingInfo = [];
    this.filters = [];
  }

  dataset.prototype.clearFilters = function() {
    this.filters = [];
    return this.data = void 0;
  };

  dataset.prototype.clearFiltersForColumn = function(column) {
    delete this.filters[column];
    return this.data = void 0;
  };

  dataset.prototype.addFilter = function(column, fn, filterTerm) {
    if (typeof fn !== "function") {
      throw new Error('Filter: Expecting function, got ' + fn);
    }
    if (!this.hasColumn(column)) {
      throw new Error('Column does not exist ' + column);
    }
    if (!(column in this.filters)) {
      this.filters[column] = [];
    }
    this.filters[column].push([fn, filterTerm]);
    return this.data = void 0;
  };

  dataset.prototype.clearSorting = function() {
    this.sortingInfo = [];
    return this.data = void 0;
  };

  dataset.prototype.filter = function(data) {
    var column, columnFilters, filter, filterData, filterTerm, filteredData, match, record, value, _i, _j, _len, _len1;
    if (0 === Object.keys(this.filters).length) {
      return data;
    }
    filteredData = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      record = data[_i];
      for (column in this.filters) {
        match = false;
        columnFilters = this.filters[column];
        for (_j = 0, _len1 = columnFilters.length; _j < _len1; _j++) {
          filterData = columnFilters[_j];
          filter = filterData[0];
          filterTerm = filterData[1] || null;
          value = record.get(column);
          if (!filter(value, filterTerm)) {
            break;
          }
          match = true;
        }
      }
      if (match) {
        filteredData.push(record);
      }
    }
    return filteredData;
  };

  dataset.prototype.setSorting = function(column, direction) {
    if (!this.hasColumn(column)) {
      throw new Error('Unknown column ' + column);
    }
    direction = ("" + direction).toUpperCase();
    if (direction !== 'DESC') {
      direction = 'ASC';
    }
    this.sortingInfo.push([column, direction]);
    return this.data = void 0;
  };

  dataset.prototype.sort = function(data) {
    var L, alphaSortAsc, alphaSortDesc, me;
    if (!this.sortingInfo) {
      return data;
    }
    L = this.sortingInfo.length;
    if (!L) {
      return data;
    }
    alphaSortAsc = function(a, b) {
      if (a === b) {
        return 0;
      }
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    };
    alphaSortDesc = function(a, b) {
      if (a === b) {
        return 0;
      }
      if (a < b) {
        return 1;
      } else {
        return -1;
      }
    };
    me = this;
    data.sort(function(a, b) {
      var indx, itm, tem;
      tem = 0;
      indx = 0;
      while (tem === 0 && indx < L) {
        itm = me.sortingInfo[indx][0];
        if ('DESC' === me.sortingInfo[indx][1]) {
          tem = alphaSortDesc(a.get(itm), b.get(itm));
        } else {
          tem = alphaSortAsc(a.get(itm), b.get(itm));
        }
        indx += 1;
      }
      return tem;
    });
    return data;
  };

  dataset.prototype.hasColumn = function(name) {
    var column, _i, _len, _ref;
    _ref = this.getColumns();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      column = _ref[_i];
      if (column.getName() === name) {
        return true;
      }
    }
    return false;
  };

  dataset.prototype.getColumn = function(name) {
    var column, _i, _len, _ref;
    _ref = this.getColumns();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      column = _ref[_i];
      if (column.getName() === name) {
        return column;
      }
    }
    throw new Error('Unknown column ' + name);
  };

  dataset.prototype.setColumns = function(columns) {
    var columnDef, name, options, title, _i, _len;
    this.columns = [];
    if (Object.prototype.toString.call(columns) !== '[object Array]') {
      throw nwe(Error('Column definition should be an array of objects or strings'));
    }
    for (_i = 0, _len = columns.length; _i < _len; _i++) {
      columnDef = columns[_i];
      if (Object.prototype.toString.call(columnDef) === '[object Object]') {
        name = columnDef.name;
        title = columnDef.title || columnDef.name;
        options = columnDef.options || {};
      } else {
        name = columnDef;
        title = void 0;
        options = void 0;
      }
      this.addColumn(name, title, options);
    }
    return this.data = void 0;
  };

  dataset.prototype.addColumn = function(name, title, options) {
    this.columns.push(new window.Francodacosta.DataSet.Column(name, title, options));
    return this.data = void 0;
  };

  dataset.prototype.getColumns = function() {
    return this.columns;
  };

  dataset.prototype.setData = function(data) {
    var record, _i, _len, _results;
    this.originalData = [];
    this.data = void 0;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      record = data[_i];
      if (Object.prototype.toString.call(record) === '[object Array]') {
        record = this._normalizeDataArray(record);
      } else if (Object.prototype.toString.call(record) === '[object Object]') {
        record = this._normalizeDataObject(record);
      } else {
        throw new Error('Could not parse data');
      }
      _results.push(this.add(record));
    }
    return _results;
  };

  dataset.prototype._normalizeDataArray = function(record) {
    var col, index, tmpRecord, value, _i, _len, _ref;
    tmpRecord = {};
    _ref = this.getColumns();
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      col = _ref[index];
      if (!record[index]) {
        value = void 0;
      } else {
        value = record[index];
      }
      tmpRecord[col.getName()] = value;
    }
    return new window.Francodacosta.DataSet.Record(tmpRecord);
  };

  dataset.prototype._normalizeDataObject = function(record) {
    var col, tmpRecord, value, _i, _len, _ref;
    tmpRecord = {};
    _ref = this.getColumns();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      if (!col.getName() in record) {
        value = void 0;
      } else {
        value = record[col.getName()];
      }
      tmpRecord[col.getName()] = value;
    }
    return new window.Francodacosta.DataSet.Record(tmpRecord);
  };

  dataset.prototype.getData = function(start, offset) {
    start = start || 0;
    offset = offset || this.originalData.length;
    if (!this.data) {
      this.data = this._processData(start, offset);
    }
    return this.data;
  };

  dataset.prototype._processData = function(start, offset) {
    this.data = this.originalData;
    this.data = this.filter(this.data);
    this.data = this.sort(this.data);
    return this.data.slice(start, start + offset);
  };

  dataset.prototype.add = function(record) {
    if (!record instanceof window.Francodacosta.DataSet.Record) {
      throw new Error('record must be a instance of Record');
    }
    this.originalData.push(record);
    return this.data = void 0;
  };

  return dataset;

})();

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Filter = window.Francodacosta.DataSet.Filter || {};

window.Francodacosta.DataSet.Filter.Number = {
  equal: function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value === filterTerm;
    };
  },
  notEqual: function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value !== filterTerm;
    };
  },
  greaterThan: function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value > filterTerm;
    };
  },
  greaterThanOrEqualTo: function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value >= filterTerm;
    };
  },
  lessThan: function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value < filterTerm;
    };
  },
  lessThanOrEqualTo: function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value <= filterTerm;
    };
  }
};

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Filter = window.Francodacosta.DataSet.Filter || {};

window.Francodacosta.DataSet.Filter.Text = {
  match: function(caseSensitive) {
    return (function(_this) {
      return function(value, filterTerm) {
        caseSensitive = caseSensitive || false;
        if (!caseSensitive) {
          value = ("" + value).toLowerCase();
          filterTerm = ("" + filterTerm).toLowerCase();
        }
        return value === filterTerm;
      };
    })(this);
  },
  beginsWith: function() {
    return (function(_this) {
      return function(value, filterTerm) {
        filterTerm = '^' + filterTerm;
        return _this._regExp(value, filterTerm);
      };
    })(this);
  },
  endsWith: function() {
    return (function(_this) {
      return function(value, filterTerm) {
        filterTerm = filterTerm + '$';
        return _this._regExp(value, filterTerm);
      };
    })(this);
  },
  contains: function() {
    return (function(_this) {
      return function(value, filterTerm) {
        filterTerm = filterTerm;
        return _this._regExp(value, filterTerm);
      };
    })(this);
  },
  regularExpression: function() {
    return (function(_this) {
      return function(value, filterTerm) {
        return _this._regExp(value, filterTerm);
      };
    })(this);
  },
  _regExp: function(value, filterTerm) {
    var regExp;
    regExp = new RegExp(filterTerm);
    return regExp.test(value);
  }
};

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
    data = JSON.parse(this.data);
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

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Record = (function() {
  function Record(data) {
    this.data = data;
    this.dirty = false;
  }

  Record.prototype.getData = function() {
    return this.data;
  };

  Record.prototype.get = function(column) {
    if (column in this.data) {
      return this.data[column];
    }
  };

  Record.prototype.set = function(column, value) {
    if (this.get(column) === value) {
      return;
    }
    this.data[column] = value;
    return this.dirty = true;
  };

  Record.prototype.isDirty = function() {
    return this.dirty;
  };

  return Record;

})();
