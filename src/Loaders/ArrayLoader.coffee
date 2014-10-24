window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}
window.Francodacosta.DataSet.Loader = window.Francodacosta.DataSet.Loader || {}

class window.Francodacosta.DataSet.Loader.Array

    constructor: (@data, @headerInFirstRow) ->
        @headerInFirstRow = @headerInFirstRow || false

    load: () ->
        if @headerInFirstRow
            columns = @data.shift()
        else
            columns = [0..@data[0].length]


        return new window.Francodacosta.DataSet.dataset(@data, columns)
