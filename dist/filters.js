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

window.Francodacosta.DataSet.Filter.Number = (function() {
  function Number() {}

  Number.prototype.equal = function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value === filterTerm;
    };
  };

  Number.prototype.notEqual = function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value !== filterTerm;
    };
  };

  Number.prototype.greaterThan = function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value > filterTerm;
    };
  };

  Number.prototype.greaterThanOrEqualTo = function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value >= filterTerm;
    };
  };

  Number.prototype.lessThan = function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value < filterTerm;
    };
  };

  Number.prototype.lessThanOrEqualTo = function() {
    return function(value, filterTerm) {
      value = parseFloat(value);
      filterTerm = parseFloat(filterTerm);
      return value <= filterTerm;
    };
  };

  return Number;

})();

window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Filter = window.Francodacosta.DataSet.Filter || {};

window.Francodacosta.DataSet.Filter.Text = (function() {
  function Text() {}

  Text.prototype.match = function(caseSensitive) {
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
  };

  Text.prototype.beginsWith = function() {
    return (function(_this) {
      return function(value, filterTerm) {
        filterTerm = '^' + filterTerm;
        return _this._regExp(value, filterTerm);
      };
    })(this);
  };

  Text.prototype.endsWith = function() {
    return (function(_this) {
      return function(value, filterTerm) {
        filterTerm = filterTerm + '$';
        return _this._regExp(value, filterTerm);
      };
    })(this);
  };

  Text.prototype.contains = function() {
    return (function(_this) {
      return function(value, filterTerm) {
        filterTerm = filterTerm;
        return _this._regExp(value, filterTerm);
      };
    })(this);
  };

  Text.prototype.regularExpression = function() {
    return (function(_this) {
      return function(value, filterTerm) {
        return _this._regExp(value, filterTerm);
      };
    })(this);
  };

  Text.prototype._regExp = function(value, filterTerm) {
    var regExp;
    regExp = new RegExp(filterTerm);
    return regExp.test(value);
  };

  return Text;

})();
