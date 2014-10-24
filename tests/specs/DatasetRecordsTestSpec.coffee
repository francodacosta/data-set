# Dataset = require '../build/Dataset.coffee'
# Column = require '../build/Column.coffee'

describe 'Dataset record crud', =>

    it 'adds record from array', =>

        columns = ['col1', 'col2']
        values = [
            ['1-1', '1-2'],
            ['2-1', '2-2'],
        ]

        d = new window.Francodacosta.DataSet.dataset(values, columns)

        expectedResult = [ new window.Francodacosta.DataSet.Record({
                col1: '1-1',
                col2: '1-2',
            }),
            new window.Francodacosta.DataSet.Record({
                col1: '2-1',
                col2: '2-2',
            })
        ]

        # console.log d.getData()

        expect(d.getData().length).toEqual(2)
        expect(d.getData()).toEqual(expectedResult)

    it 'adds record from an Object', =>

        columns = ['col1', 'col2']
        values = [
            {
                col1: '1-1',
                col2: '1-2',
            },
            {
                col1: '2-1',
                col2: '2-2',
            }
        ]

        expectedResult = [ new window.Francodacosta.DataSet.Record({
                col1: '1-1',
                col2: '1-2',
            }),
            new window.Francodacosta.DataSet.Record({
                col1: '2-1',
                col2: '2-2',
            })
        ]


        d = new window.Francodacosta.DataSet.dataset(values, columns)



        expect(d.getData().length).toEqual(2);
        expect(d.getData()).toEqual(expectedResult);
