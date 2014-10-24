#
describe 'Markup Loader', =>



    it 'from HTML table', =>



        d = new window.Francodacosta.DataSet.Loader.Markup('table').load()
        data = d.getData()

        expect(d.hasColumn('col1')).toBe(true, 'we should have a Column named col1')
        expect(d.hasColumn('col2')).toBe(true, 'we should have a Column named col2')
        expect(data.length).toEqual(2)
        expect(data[0].get('col1')).toBe('1')
