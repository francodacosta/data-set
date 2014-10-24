window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}
window.Francodacosta.DataSet.Filter = window.Francodacosta.DataSet.Filter || {}

window.Francodacosta.DataSet.Filter.Number =
    equal: ->
        return (value, filterTerm) ->
            value = parseFloat(value)
            filterTerm = parseFloat(filterTerm)

            return value == filterTerm


    notEqual: ->
        return (value, filterTerm) ->
            value = parseFloat(value)
            filterTerm = parseFloat(filterTerm)

            return value != filterTerm


    greaterThan: ->
        return (value, filterTerm) ->
            value = parseFloat(value)
            filterTerm = parseFloat(filterTerm)

            return value > filterTerm


    greaterThanOrEqualTo: ->
        return (value, filterTerm) ->
            value = parseFloat(value)
            filterTerm = parseFloat(filterTerm)

            # console.log filterTerm ,'>=', value, filterTerm >= value
            return value >= filterTerm


    lessThan: ->
        return (value, filterTerm) ->
            value = parseFloat(value)
            filterTerm = parseFloat(filterTerm)

            return value < filterTerm


    lessThanOrEqualTo: ->
        return (value, filterTerm) ->
            value = parseFloat(value)
            filterTerm = parseFloat(filterTerm)

            return value <= filterTerm
