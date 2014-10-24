# window.Francodacosta.DataSet.Column = require '../build/window.Francodacosta.DataSet.Column.coffee'

describe 'window.Francodacosta.DataSet.Column', =>
    it 'initializes', =>

        expectedOptions = {}
            # type   : 'string'
            # format : ''

        c = new window.Francodacosta.DataSet.Column("name", "title", {})
        expect(c.getName()).toEqual("name");
        expect(c.getTitle()).toEqual("title");
        expect(c.getOptions()).toEqual(expectedOptions);

        # expect(c.getType()).toEqual('string');
        # expect(c.getFormat()).toEqual('');


    # it 'initializes with number type', =>
    #     expectedOptions =
    #         type   : 'number'
    #         format : '0,0'
    #
    #     c = new window.Francodacosta.DataSet.Column("name", "title", {type: 'number'})
    #
    #     expect(c.getType()).toEqual('number');
    #     expect(c.getFormat()).toEqual('0,0');

    it 'assumes name for title', =>
        c = new window.Francodacosta.DataSet.Column("name")
        expect(c.getName()).toEqual("name");
        expect(c.getTitle()).toEqual("name");

    it 'requires a name', =>
        expect(=> new window.Francodacosta.DataSet.Column()).toThrow(new Error("Column needs a name"));

    it 'column options should be an object', =>
        expect(=> new window.Francodacosta.DataSet.Column("name", "title", "options")).toThrow( new Error("Options should be an object") )
