describe('window.Francodacosta.DataSet.Column', (function(_this) {
  return function() {
    it('initializes', function() {
      var c, expectedOptions;
      expectedOptions = {};
      c = new window.Francodacosta.DataSet.Column("name", "title", {});
      expect(c.getName()).toEqual("name");
      expect(c.getTitle()).toEqual("title");
      return expect(c.getOptions()).toEqual(expectedOptions);
    });
    it('assumes name for title', function() {
      var c;
      c = new window.Francodacosta.DataSet.Column("name");
      expect(c.getName()).toEqual("name");
      return expect(c.getTitle()).toEqual("name");
    });
    it('requires a name', function() {
      return expect(function() {
        return new window.Francodacosta.DataSet.Column();
      }).toThrow(new Error("Column needs a name"));
    });
    return it('column options should be an object', function() {
      return expect(function() {
        return new window.Francodacosta.DataSet.Column("name", "title", "options");
      }).toThrow(new Error("Options should be an object"));
    });
  };
})(this));

describe('Dataset columns', (function(_this) {
  return function() {
    it('adds column definition', function() {
      var d, expectedCols;
      d = new window.Francodacosta.DataSet.dataset();
      expect(d.getColumns().length).toEqual(0);
      d.addColumn('col1');
      expect(d.getColumns().length).toEqual(1);
      expectedCols = [new window.Francodacosta.DataSet.Column('col1')];
      return expect(d.getColumns()).toEqual(expectedCols);
    });
    it('Set all Column definitions via array of strings', function() {
      var columns, d, expectedCols;
      columns = ['col1', 'col2'];
      d = new window.Francodacosta.DataSet.dataset();
      d.setColumns(columns);
      expectedCols = [new window.Francodacosta.DataSet.Column('col1'), new window.Francodacosta.DataSet.Column('col2')];
      return expect(d.getColumns()).toEqual(expectedCols);
    });
    return it('Set all Column definitions via array of objects', function() {
      var columns, d, expectedCols;
      columns = [
        {
          title: 'col1',
          name: 'col1',
          options: {
            a: 0
          }
        }, {
          name: 'col2'
        }
      ];
      d = new window.Francodacosta.DataSet.dataset();
      d.setColumns(columns);
      expectedCols = [
        new window.Francodacosta.DataSet.Column('col1', 'col1', {
          a: 0
        }), new window.Francodacosta.DataSet.Column('col2')
      ];
      expect(d.getColumns()).toEqual(expectedCols);
      return expect(d.getColumn('col1').getTitle()).toEqual('col1');
    });
  };
})(this));

describe('Dataset Filter', (function(_this) {
  return function() {
    it("filters a single columns", function() {
      var columns, d, data, filter, values;
      columns = ['col1', 'col2'];
      values = [[1, 'a'], [2, 'b'], [3, 'c']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      filter = window.Francodacosta.DataSet.Filter.Number.greaterThan();
      d.addFilter('col1', filter, 2);
      data = d.getData();
      expect(data.length).toEqual(1);
      return expect(data[0].get('col1')).toEqual(3);
    });
    it("filters more than one column", function() {
      var columns, d, data, filter, values;
      columns = ['col1', 'col2'];
      values = [[1, 1], [2, 1], [3, 'c']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      filter = window.Francodacosta.DataSet.Filter.Number.equal();
      d.addFilter('col2', filter, 1);
      d.addFilter('col1', filter, 2);
      data = d.getData();
      expect(data.length).toEqual(1);
      return expect(data[0].get('col1')).toEqual(2);
    });
    it("clears all filters", function() {
      var columns, d, data, filter, values;
      columns = ['col1', 'col2'];
      values = [[1, 'a'], [2, 'b'], [3, 'c']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      filter = window.Francodacosta.DataSet.Filter.Number.greaterThan();
      d.addFilter('col1', filter, 2);
      data = d.getData();
      expect(data.length).toEqual(1);
      d.clearFilters();
      data = d.getData();
      return expect(data.length).toEqual(3);
    });
    return it("clears filter for column", function() {
      var columns, d, data, filter, values;
      columns = ['col1', 'col2'];
      values = [[1, 1], [2, 1], [3, 'c']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      filter = window.Francodacosta.DataSet.Filter.Number.equal();
      d.addFilter('col2', filter, 1);
      d.addFilter('col1', filter, 2);
      data = d.getData();
      expect(data.length).toEqual(1);
      d.clearFiltersForColumn('col1');
      data = d.getData();
      return expect(data.length).toEqual(2);
    });
  };
})(this));

describe('Dataset record crud', (function(_this) {
  return function() {
    it('adds record from array', function() {
      var columns, d, expectedResult, values;
      columns = ['col1', 'col2'];
      values = [['1-1', '1-2'], ['2-1', '2-2']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      expectedResult = [
        new window.Francodacosta.DataSet.Record({
          col1: '1-1',
          col2: '1-2'
        }), new window.Francodacosta.DataSet.Record({
          col1: '2-1',
          col2: '2-2'
        })
      ];
      expect(d.getData().length).toEqual(2);
      return expect(d.getData()).toEqual(expectedResult);
    });
    return it('adds record from an Object', function() {
      var columns, d, expectedResult, values;
      columns = ['col1', 'col2'];
      values = [
        {
          col1: '1-1',
          col2: '1-2'
        }, {
          col1: '2-1',
          col2: '2-2'
        }
      ];
      expectedResult = [
        new window.Francodacosta.DataSet.Record({
          col1: '1-1',
          col2: '1-2'
        }), new window.Francodacosta.DataSet.Record({
          col1: '2-1',
          col2: '2-2'
        })
      ];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      expect(d.getData().length).toEqual(2);
      return expect(d.getData()).toEqual(expectedResult);
    });
  };
})(this));

describe('Dataset columns', (function(_this) {
  return function() {
    it("sorts a single column ASCENDING", function() {
      var columns, d, sortedData, values;
      columns = ['col1', 'col2'];
      values = [['ab', '1-2'], ['aa', '2-2']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      d.setSorting('col1');
      sortedData = [
        new window.Francodacosta.DataSet.Record({
          col1: 'aa',
          col2: '2-2'
        }), new window.Francodacosta.DataSet.Record({
          col1: 'ab',
          col2: '1-2'
        })
      ];
      return expect(d.getData()).toEqual(sortedData);
    });
    it("sorts a single column DESSCENDING", function() {
      var columns, d, sortedData, values;
      columns = ['col1', 'col2'];
      values = [['ab', '1-2'], ['aa', '2-2']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      d.clearSorting();
      d.setSorting('col1', 'desc');
      sortedData = [
        new window.Francodacosta.DataSet.Record({
          col1: 'ab',
          col2: '1-2'
        }), new window.Francodacosta.DataSet.Record({
          col1: 'aa',
          col2: '2-2'
        })
      ];
      return expect(d.getData()).toEqual(sortedData);
    });
    return it("sorts clears sorting info when instructed ", function() {
      var columns, d, sortedData, values;
      columns = ['col1', 'col2'];
      values = [['ab', '1-2'], ['aa', '2-2']];
      d = new window.Francodacosta.DataSet.dataset(values, columns);
      d.setSorting('col1');
      sortedData = [
        new window.Francodacosta.DataSet.Record({
          col1: 'aa',
          col2: '2-2'
        }), new window.Francodacosta.DataSet.Record({
          col1: 'ab',
          col2: '1-2'
        })
      ];
      expect(d.getData()).toEqual(sortedData);
      d.clearSorting();
      d.setSorting('col1', 'desc');
      sortedData = [
        new window.Francodacosta.DataSet.Record({
          col1: 'ab',
          col2: '1-2'
        }), new window.Francodacosta.DataSet.Record({
          col1: 'aa',
          col2: '2-2'
        })
      ];
      return expect(d.getData()).toEqual(sortedData);
    });
  };
})(this));

describe('Number() Filter', (function(_this) {
  return function() {
    it('eqFilter.uals', function() {
      var f, filter;
      f = window.Francodacosta.DataSet.Filter.Number;
      filter = f.equal();
      expect(filter(5, 5)).toBeTruthy('5 == 5');
      return expect(filter(5, 3)).toBeFalsy('5 == 3');
    });
    it('Not Equal', function() {
      var f, filter;
      f = window.Francodacosta.DataSet.Filter.Number;
      filter = f.notEqual();
      expect(filter(5, 25)).toBeTruthy('5 != 25');
      return expect(filter(5, 5)).toBeFalsy('5 != 5');
    });
    it('greater than', function() {
      var f, filter;
      f = window.Francodacosta.DataSet.Filter.Number;
      filter = f.greaterThan();
      expect(filter(2, 5)).toBeFalsy('2 > 5');
      expect(filter(7, 5)).toBeTruthy('7 > 5');
      return expect(filter(5, 5)).toBeFalsy('5 > 5');
    });
    it('greater than or equal', function() {
      var f, filter;
      f = window.Francodacosta.DataSet.Filter.Number;
      filter = f.greaterThanOrEqualTo();
      expect(filter(2, 5)).toBeFalsy('2 >= 5');
      expect(filter(7, 5)).toBeTruthy('7 >= 5');
      return expect(filter(5, 5)).toBeTruthy('5 >= 5');
    });
    it('less than or equal', function() {
      var f, filter;
      f = window.Francodacosta.DataSet.Filter.Number;
      filter = f.lessThan();
      expect(filter(2, 5)).toBeTruthy('2 < 5');
      expect(filter(7, 5)).toBeFalsy('7 < 5');
      return expect(filter(5, 5)).toBeFalsy('5 < 5');
    });
    return it('less than or equal', function() {
      var f, filter;
      f = window.Francodacosta.DataSet.Filter.Number;
      filter = f.lessThanOrEqualTo();
      expect(filter(2, 5)).toBeTruthy('2 <= 5');
      expect(filter(7, 5)).toBeFalsy('7 <= 5');
      return expect(filter(5, 5)).toBeTruthy('5 <= 5');
    });
  };
})(this));

describe('Text Filter', (function(_this) {
  return function() {
    it('match filter CASE INSENSITIVE', function() {
      var caseSensitive, expression, f, filter, value;
      f = window.Francodacosta.DataSet.Filter.Text;
      value = "text to search";
      expression = "text to SEARCH";
      filter = f.match(caseSensitive = false);
      expect(filter(value, expression)).toBeTruthy();
      return expect(filter(value, 'asd')).toBeFalsy();
    });
    it('match filter CASE SENSITIVE', function() {
      var caseSensitive, expression, f, filter, value;
      f = window.Francodacosta.DataSet.Filter.Text;
      value = "text to search";
      expression = "text to SEARCH";
      filter = f.match(caseSensitive = true);
      expect(filter(value, expression)).toBeFalsy();
      expect(filter(value, "text to search")).toBeTruthy();
      return expect(filter(value, 'asd')).toBeFalsy();
    });
    it('beginsWith filter works', function() {
      var expression, f, filter, value;
      f = window.Francodacosta.DataSet.Filter.Text;
      value = "text to search";
      expression = "text";
      filter = f.beginsWith();
      expect(filter(value, expression)).toBeTruthy();
      return expect(filter(value, 'asd')).toBeFalsy();
    });
    it('endsWith filter works', function() {
      var expression, f, filter, value;
      f = window.Francodacosta.DataSet.Filter.Text;
      value = "text to search";
      expression = "rch";
      filter = f.endsWith();
      expect(filter(value, expression)).toBeTruthy();
      return expect(filter(value, 'asd')).toBeFalsy();
    });
    return it('contains filter works', function() {
      var expression, f, filter, value;
      f = window.Francodacosta.DataSet.Filter.Text;
      value = "text to search";
      expression = "to ";
      filter = f.contains();
      expect(filter(value, expression)).toBeTruthy();
      return expect(filter(value, 'asd')).toBeFalsy();
    });
  };
})(this));

describe('Array Loader', (function(_this) {
  return function() {
    it('from array, with first row as headers', function() {
      var d, data, firstRowHeaders;
      data = [['col1', 'col2'], [1, 2], [3, 4]];
      d = new Francodacosta.DataSet.Loader.Array(data, firstRowHeaders = true).load();
      data = d.getData();
      expect(d.hasColumn('col1')).toBe(true);
      expect(d.hasColumn('col2')).toBe(true);
      expect(data.length).toEqual(2);
      return expect(data[0].get('col1')).toBe(1);
    });
    return it('from array, with no headers', function() {
      var d, data;
      data = [[1, 2], [3, 4]];
      d = new Francodacosta.DataSet.Loader.Array(data).load();
      data = d.getData();
      expect(d.hasColumn(0)).toBe(true, 'we should have a Column named 0');
      expect(d.hasColumn(1)).toBe(true, 'we should have a Column named 1');
      expect(data.length).toEqual(2);
      return expect(data[0].get('0')).toBe(1);
    });
  };
})(this));

describe('Json Loader', (function(_this) {
  return function() {
    return it('from json string', function() {
      var d, data;
      data = [
        {
          col1: 1,
          col2: 2
        }, {
          col1: 3,
          col2: 4
        }
      ];
      d = new Francodacosta.DataSet.Loader.Json(JSON.stringify(data)).load();
      data = d.getData();
      expect(d.hasColumn('col1')).toBe(true, 'we should have a Column named col1');
      expect(d.hasColumn('col2')).toBe(true, 'we should have a Column named col2');
      expect(data.length).toEqual(2);
      return expect(data[0].get('col1')).toBe(1);
    });
  };
})(this));

describe('Markup Loader', (function(_this) {
  return function() {
    return it('from HTML table', function() {
      var d, data;
      d = new window.Francodacosta.DataSet.Loader.Markup('table').load();
      data = d.getData();
      expect(d.hasColumn('col1')).toBe(true, 'we should have a Column named col1');
      expect(d.hasColumn('col2')).toBe(true, 'we should have a Column named col2');
      expect(data.length).toEqual(2);
      return expect(data[0].get('col1')).toBe('1');
    });
  };
})(this));

describe('Record', (function(_this) {
  return function() {
    it('initializes', function() {
      var c, values;
      values = {
        col1: '1-1',
        col2: '1-2'
      };
      c = new window.Francodacosta.DataSet.Record(values);
      expect(c.getData()).toEqual(values);
      expect(c.get('col1')).toEqual("1-1");
      return expect(c.get('col2')).toEqual("1-2");
    });
    return it('marks a record as dirty', function() {
      var c, values;
      values = {
        col1: '1-1',
        col2: '1-2'
      };
      c = new window.Francodacosta.DataSet.Record(values);
      c.set('col1', 'changed');
      return expect(c.isDirty()).toEqual(true);
    });
  };
})(this));
