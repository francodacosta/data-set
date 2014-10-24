# Dataset = require '../build/Dataset.coffee'
# Column = require '../build/Column.coffee'

describe 'Dataset columns', =>

    it "sorts a single column ASCENDING", =>
        columns = ['col1', 'col2']
        values = [
            ['ab', '1-2'],
            ['aa', '2-2'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        d.setSorting('col1')

        sortedData = [ new window.Francodacosta.DataSet.Record({
                col1: 'aa',
                col2: '2-2',
            }),
            new window.Francodacosta.DataSet.Record({
                col1: 'ab',
                col2: '1-2',
            })
        ]
        expect(d.getData()).toEqual(sortedData)

    it "sorts a single column DESSCENDING", =>
        columns = ['col1', 'col2']
        values = [
            ['ab', '1-2'],
            ['aa', '2-2'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)
        d.clearSorting()
        d.setSorting('col1', 'desc')

        sortedData = [
            new window.Francodacosta.DataSet.Record({
                col1: 'ab',
                col2: '1-2',
            }),
            new window.Francodacosta.DataSet.Record({
                col1: 'aa',
                col2: '2-2',
            }),
        ]

        expect(d.getData()).toEqual(sortedData)

    it "sorts clears sorting info when instructed ", =>

        columns = ['col1', 'col2']
        values = [
            ['ab', '1-2'],
            ['aa', '2-2'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        d.setSorting('col1')

        sortedData = [ new window.Francodacosta.DataSet.Record({
                col1: 'aa',
                col2: '2-2',
            }),
            new window.Francodacosta.DataSet.Record({
                col1: 'ab',
                col2: '1-2',
            })
        ]
        expect(d.getData()).toEqual(sortedData)

        d.clearSorting()
        d.setSorting('col1', 'desc')

        sortedData = [
            new window.Francodacosta.DataSet.Record({
                col1: 'ab',
                col2: '1-2',
            }),
            new window.Francodacosta.DataSet.Record({
                col1: 'aa',
                col2: '2-2',
            }),
        ]

        expect(d.getData()).toEqual(sortedData)
