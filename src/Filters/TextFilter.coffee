window.Francodacosta = window.Francodacosta || {};

window.Francodacosta.DataSet = window.Francodacosta.DataSet || {};

window.Francodacosta.DataSet.Filter = window.Francodacosta.DataSet.Filter || {};

window.Francodacosta.DataSet.Filter.Text =

    match: (caseSensitive) ->
        return (value, filterTerm) =>
            caseSensitive = caseSensitive || false

            if not caseSensitive
                value = ("" + value).toLowerCase()
                filterTerm = ("" + filterTerm).toLowerCase()

            return value == filterTerm


    beginsWith: () ->
        return (value, filterTerm) =>
            filterTerm = '^' + filterTerm

            return @_regExp(value, filterTerm)

    endsWith: () ->
        return (value, filterTerm) =>
            filterTerm = filterTerm + '$'

            return @_regExp(value, filterTerm)

    contains: () ->
        return (value, filterTerm) =>
            filterTerm = filterTerm

            return @_regExp(value, filterTerm)

    regularExpression: () ->
        return (value, filterTerm) =>
            return @_regExp(value, filterTerm)

    _regExp: (value, filterTerm) ->
            regExp = new RegExp(filterTerm)

            return regExp.test(value)
