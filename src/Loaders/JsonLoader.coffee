
window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}
window.Francodacosta.DataSet.Loader = window.Francodacosta.DataSet.Loader || {}

class window.Francodacosta.DataSet.Loader.Json

    constructor: (@data) ->


    load: () ->
        data =JSON.parse(@data)
        columns = []
        for prop of data[0]
            columns.push prop

        return new window.Francodacosta.DataSet.dataset(data, columns)
