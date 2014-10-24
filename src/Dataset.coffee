window = window || {}
window.Francodacosta = window.Francodacosta || {}
window.Francodacosta.DataSet = window.Francodacosta.DataSet || {}

class window.Francodacosta.DataSet.dataset

    #
    # Initlializes class
    #
    # @param array data
    # @param array columns
    #
    #
    constructor: (data, columns) ->
        data    = data || []
        columns = columns || []

        @setColumns(columns)
        @setData(data)
        @sortingInfo = []
        @filters = []

    clearFilters: () ->
        @filters = []
        @data = undefined

    clearFiltersForColumn: (column) ->
        # @filters[column] = undefined
        # @filters.splice(column,1)
        delete @filters[column]

        @data = undefined

    addFilter: (column, fn, filterTerm) ->
        if typeof fn != "function"
            throw new Error('Filter: Expecting function, got ' + fn)

        if not @hasColumn(column)
            throw new Error('Column does not exist ' + column)

        if  not (column of @filters)
            @filters[column] = []


        @filters[column].push [fn, filterTerm]
        @data = undefined

    clearSorting: ->
        @sortingInfo = []
        @data =undefined

    filter: (data) ->

        if 0 == Object.keys(@filters).length
            return data

        filteredData = []
        for record in data
            for column of @filters
                match = false
                columnFilters = @filters[column]
                for filterData in columnFilters
                    filter = filterData[0]
                    filterTerm = filterData[1] || null
                    value = record.get(column)

                    if not filter(value, filterTerm)
                        break;
                    match = true

            if match
                filteredData.push record


        return filteredData



    setSorting: (column, direction) ->
        if not @hasColumn(column)
            throw new Error('Unknown column ' + column)

        direction = ("" + direction).toUpperCase()
        if direction != 'DESC'
            direction = 'ASC'

        @sortingInfo.push [column, direction]
        @data = undefined


    sort: (data)->

        if ! @sortingInfo
            return data

        L = @sortingInfo.length

        if !L
            return data

        alphaSortAsc = (a, b) ->
            if a == b
                return 0

            if a > b
                return 1
            else
                return -1;

        alphaSortDesc = (a, b) ->
            if a == b
                return 0;

            if a < b
                return 1
            else
                return -1;


        me = @
        data.sort(
            (a, b) ->
                tem= 0
                indx=0;
                while (tem==0 && indx<L)
                    itm=me.sortingInfo[indx][0]
                    if 'DESC' == me.sortingInfo[indx][1]
                        tem = alphaSortDesc(a.get(itm), b.get(itm))
                    else
                        tem= alphaSortAsc(a.get(itm), b.get(itm));

                    indx+=1;

                return tem;
        )

        return data

    hasColumn: (name) ->
        for column in @getColumns()
            if column.getName() == name
                return true

        return false
    #
    # returns a column definition by its name
    #
    # @param string name
    getColumn: (name) ->
        for column in @getColumns()
            if column.getName() == name
                return column

        throw new Error('Unknown column ' + name)

    #
    # Sets column definitions
    # Columns can either be an array fo strings or an an aray of objects
    #
    # @param array columns
    setColumns: (columns) ->
        @columns = []

        if Object.prototype.toString.call( columns ) != '[object Array]'
            throw nwe Error('Column definition should be an array of objects or strings')

        for columnDef in columns
            if Object.prototype.toString.call( columnDef ) == '[object Object]'
                name = columnDef.name
                title = columnDef.title || columnDef.name
                options = columnDef.options || {}
            else
                name = columnDef
                title = undefined
                options = undefined

            @addColumn(name, title, options)

        @data = undefined


    #
    # Adds a column definition
    #
    # @param string name
    # @param string title
    # @param Object options
    addColumn: (name, title, options) ->
        @columns.push new window.Francodacosta.DataSet.Column(name, title, options)
        @data = undefined


    #
    # retuns the current column definition
    #
    # @return [Column]
    getColumns: =>
        return @columns

    #
    # sets the record set data
    #
    # @param array|object
    #
    setData:(data) ->
        @originalData = []
        @data = undefined

        for record in data
            if Object.prototype.toString.call( record ) == '[object Array]'
                record = @_normalizeDataArray(record)
            else if Object.prototype.toString.call( record ) == '[object Object]'
                record = @_normalizeDataObject(record)
            else
                throw new Error ('Could not parse data')

            @add(record)

    _normalizeDataArray: (record) ->
        tmpRecord = {}
        for col, index in @getColumns()
            if not record[index]
                value = undefined
            else
                value = record[index]

            tmpRecord[col.getName()] = value

        return new window.Francodacosta.DataSet.Record(tmpRecord)

    _normalizeDataObject: (record) ->
        tmpRecord = {}
        for col in @getColumns()

            if not col.getName() of record
                value = undefined
            else
                value = record[col.getName()]

            tmpRecord[col.getName()] = value

        return new window.Francodacosta.DataSet.Record(tmpRecord)

    getData: (start, offset) ->

        start  = start  || 0
        offset = offset || @originalData.length

        if not @data
            @data = @_processData(start, offset)

        return @data


    _processData: (start, offset) ->
        # filter
        @data = @originalData

        @data = @filter(@data)
        @data = @sort(@data)
        # sort
        # slice
        return @data.slice(start, start + offset)

    add: (record) ->

        if not record instanceof window.Francodacosta.DataSet.Record
            throw new Error('record must be a instance of Record')

        @originalData.push record

        # reset working data
        @data = undefined


# module.exports = Dataset
