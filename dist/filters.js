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
