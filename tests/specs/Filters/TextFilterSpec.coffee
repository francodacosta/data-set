describe 'Text Filter', =>
    it 'match filter CASE INSENSITIVE', =>
        f = window.Francodacosta.DataSet.Filter.Text

        value = "text to search"
        expression = "text to SEARCH"


        filter = f.match(caseSensitive = false)
        expect(filter(value, expression)).toBeTruthy()

        expect(filter(value, 'asd')).toBeFalsy()

    it 'match filter CASE SENSITIVE', =>
        f = window.Francodacosta.DataSet.Filter.Text

        value = "text to search"
        expression = "text to SEARCH"


        filter = f.match(caseSensitive = true)
        expect(filter(value, expression)).toBeFalsy()
        expect(filter(value, "text to search")).toBeTruthy()

        expect(filter(value, 'asd')).toBeFalsy()


    it 'beginsWith filter works', =>

        f = window.Francodacosta.DataSet.Filter.Text

        value = "text to search"
        expression = "text"


        filter = f.beginsWith()
        expect(filter(value, expression)).toBeTruthy()

        expect(filter(value, 'asd')).toBeFalsy()

    it 'endsWith filter works', =>

        f = window.Francodacosta.DataSet.Filter.Text

        value = "text to search"
        expression = "rch"


        filter = f.endsWith()
        expect(filter(value, expression)).toBeTruthy()

        expect(filter(value, 'asd')).toBeFalsy()

    it 'contains filter works', =>

        f = window.Francodacosta.DataSet.Filter.Text

        value = "text to search"
        expression = "to "


        filter = f.contains()
        expect(filter(value, expression)).toBeTruthy()

        expect(filter(value, 'asd')).toBeFalsy()
