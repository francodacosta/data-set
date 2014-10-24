describe 'Number() Filter', =>
    it 'eqFilter.uals', =>
        f =  window.Francodacosta.DataSet.Filter.Number
        filter = f.equal()
        expect(filter(5, 5)).toBeTruthy('5 == 5')

        expect(filter(5, 3)).toBeFalsy('5 == 3')

    it 'Not Equal', =>
        f =  window.Francodacosta.DataSet.Filter.Number
        filter = f.notEqual()
        expect(filter(5, 25)).toBeTruthy('5 != 25')

        expect(filter(5, 5)).toBeFalsy('5 != 5')

    it 'greater than', =>
        f =  window.Francodacosta.DataSet.Filter.Number
        filter = f.greaterThan()
        expect(filter(2, 5)).toBeFalsy('2 > 5')

        expect(filter(7, 5)).toBeTruthy('7 > 5')
        expect(filter(5, 5)).toBeFalsy('5 > 5')

    it 'greater than or equal', =>
        f =  window.Francodacosta.DataSet.Filter.Number
        filter = f.greaterThanOrEqualTo()
        expect(filter(2, 5)).toBeFalsy('2 >= 5')

        expect(filter(7, 5)).toBeTruthy('7 >= 5')
        expect(filter(5, 5)).toBeTruthy('5 >= 5')

    it 'less than or equal', =>
        f =  window.Francodacosta.DataSet.Filter.Number
        filter = f.lessThan()
        expect(filter(2, 5)).toBeTruthy('2 < 5')

        expect(filter(7, 5)).toBeFalsy('7 < 5')
        expect(filter(5, 5)).toBeFalsy('5 < 5')

    it 'less than or equal', =>
        f =  window.Francodacosta.DataSet.Filter.Number
        filter = f.lessThanOrEqualTo()
        expect(filter(2, 5)).toBeTruthy('2 <= 5')

        expect(filter(7, 5)).toBeFalsy('7 <= 5')
        expect(filter(5, 5)).toBeTruthy('5 <= 5')
