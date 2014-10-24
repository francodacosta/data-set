# Column = require '../build/Column.coffee'

describe 'Record', =>
    it 'initializes', =>
        values  =  { col1: '1-1', col2: '1-2' }

        c = new window.Francodacosta.DataSet.Record(values)

        expect(c.getData()).toEqual(values);
        expect(c.get('col1')).toEqual("1-1");
        expect(c.get('col2')).toEqual("1-2");

    it 'marks a record as dirty', =>
        values  =  { col1: '1-1', col2: '1-2' }

        c = new window.Francodacosta.DataSet.Record(values)
        c.set('col1', 'changed')

        expect(c.isDirty()).toEqual(true)
