# Dataset = require '../build/Dataset.coffee'
# Column = require '../build/Column.coffee'

describe 'Json Loader', =>



    it 'from json string', =>

        data = [
            {col1: 1, col2: 2}
            {col1: 3, col2: 4}
        ]

        d = new Francodacosta.DataSet.Loader.Json(JSON.stringify(data)).load()
        data = d.getData()

        expect(d.hasColumn('col1')).toBe(true, 'we should have a Column named col1')
        expect(d.hasColumn('col2')).toBe(true, 'we should have a Column named col2')
        expect(data.length).toEqual(2)
        expect(data[0].get('col1')).toBe(1)
