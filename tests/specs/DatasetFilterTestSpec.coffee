# Dataset = require '../build/Dataset.coffee'
# Column = require '../build/Column.coffee'

describe 'Dataset Filter', =>

    it "filters a single columns", =>
        columns = ['col1', 'col2']
        values = [
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        filter = window.Francodacosta.DataSet.Filter.Number.greaterThan()

        d.addFilter('col1', filter, 2)

        data = d.getData()
        expect(data.length).toEqual(1)
        expect(data[0].get('col1')).toEqual(3)


    it "filters more than one column", =>
        columns = ['col1', 'col2']
        values = [
            [1, 1],
            [2, 1],
            [3, 'c'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        filter = window.Francodacosta.DataSet.Filter.Number.equal()

        d.addFilter('col2', filter, 1)
        d.addFilter('col1', filter, 2)

        data = d.getData()
        expect(data.length).toEqual(1)
        expect(data[0].get('col1')).toEqual(2)



    it "clears all filters", =>
        columns = ['col1', 'col2']
        values = [
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        filter = window.Francodacosta.DataSet.Filter.Number.greaterThan()

        d.addFilter('col1', filter, 2)

        data = d.getData()
        expect(data.length).toEqual(1)

        d.clearFilters()

        data = d.getData()
        expect(data.length).toEqual(3)

    it "clears filter for column", =>
        columns = ['col1', 'col2']
        values = [
            [1, 1],
            [2, 1],
            [3, 'c'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        filter = window.Francodacosta.DataSet.Filter.Number.equal()

        d.addFilter('col2', filter, 1)
        d.addFilter('col1', filter, 2)

        data = d.getData()
        expect(data.length).toEqual(1)

        d.clearFiltersForColumn('col1')

        data = d.getData()
        expect(data.length).toEqual(2)
