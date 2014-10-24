# Dataset = require '../build/Dataset.coffee'
# Column = require '../build/Column.coffee'

describe 'Dataset columns', =>

    it 'adds column definition', =>
        d = new window.Francodacosta.DataSet.dataset()
        expect(d.getColumns().length).toEqual(0);

        d.addColumn('col1')
        expect(d.getColumns().length).toEqual(1);

        expectedCols = [ new window.Francodacosta.DataSet.Column('col1') ]

        expect(d.getColumns()).toEqual(expectedCols);


    it 'Set all Column definitions via array of strings', =>
        columns = ['col1', 'col2']
        d = new window.Francodacosta.DataSet.dataset()
        d.setColumns(columns)

        expectedCols = [
            new window.Francodacosta.DataSet.Column('col1'),
            new window.Francodacosta.DataSet.Column('col2')
            ]

        expect(d.getColumns()).toEqual(expectedCols);


    it 'Set all Column definitions via array of objects', =>
        columns = [
            {
                title: 'col1'
                name: 'col1'
                options: {
                    a: 0
                }
            },
            {
                name : 'col2'
            }
        ]

        d = new window.Francodacosta.DataSet.dataset()
        d.setColumns(columns)

        expectedCols = [
            new window.Francodacosta.DataSet.Column('col1', 'col1', {a:0}),
            new window.Francodacosta.DataSet.Column('col2')
            ]

        expect(d.getColumns()).toEqual(expectedCols)
        expect(d.getColumn('col1').getTitle()).toEqual('col1')
        # expect(d.getColumn('col1').getType()).toEqual('number')
        # expect(d.getColumn('col1').getFormat()).toEqual('0,0')
