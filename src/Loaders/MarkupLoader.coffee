window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}
window.Francodacosta.DataSet.Loader = window.Francodacosta.DataSet.Loader || {}
 # =  MarkupLoader()

class window.Francodacosta.DataSet.Loader.Markup

    constructor: (@htmlTable) ->


    load: () ->
        table = $(@htmlTable)

        columns = []
        table.find('tr').first().find('th').each((index, el) ->
            el =$(el)
            name = el.attr('data-name')
            if not name
                name = el.text()

            columns.push name
        )

        values = []
        table.find('tr').each((index, el) ->
            row = undefined
            $(this).find('td').each(() ->
                if not row
                    row = []
                row.push $(this).html()
            )
            if row
                values.push row
        )

        return new window.Francodacosta.DataSet.dataset(values, columns)
