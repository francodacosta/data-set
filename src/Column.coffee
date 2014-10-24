window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}

class window.Francodacosta.DataSet.Column
    constructor: (@name, @title, @options) ->
        @title   = @title   || @name
        @options = @options || {}

        if Object.prototype.toString.call( @options ) != '[object Object]'
            throw new Error("Options should be an object")

        if not @name and @name != 0
            throw new Error("Column needs a name")


    getName: ->
        return @name

    getTitle: ->
        return @title


    getOptions: ->
        return @options

# module.exports = Column
