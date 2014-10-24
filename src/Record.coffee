window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}

class window.Francodacosta.DataSet.Record

    ##
    # initilaizes
    #
    # @param object data
    ##
    constructor: (@data) ->
        @dirty = false

    getData: ->
        return @data

    get: (column) ->
        if column of @data
            return @data[column]

    set: (column, value) ->
        if @get(column) == value
            return

        @data[column] = value
        @dirty = true

    isDirty: () ->
        return @dirty
