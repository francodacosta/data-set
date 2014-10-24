# Dataset = require '../build/Dataset.coffee'
# Column = require '../build/Column.coffee'

describe 'Array Loader', =>

    it 'from array, with first row as headers', =>

        data = [
            ['col1', 'col2']
            [1,2]
            [3,4]
        ]

        d = new Francodacosta.DataSet.Loader.Array(data, firstRowHeaders = true).load()
        data = d.getData()

        expect(d.hasColumn('col1')).toBe(true)
        expect(d.hasColumn('col2')).toBe(true)
        expect(data.length).toEqual(2)
        expect(data[0].get('col1')).toBe(1)

    it 'from array, with no headers', =>

        data = [
            [1,2]
            [3,4]
        ]

        d = new Francodacosta.DataSet.Loader.Array(data).load()
        data = d.getData()

        expect(d.hasColumn(0)).toBe(true, 'we should have a Column named 0')
        expect(d.hasColumn(1)).toBe(true, 'we should have a Column named 1')
        expect(data.length).toEqual(2)
        expect(data[0].get('0')).toBe(1)
