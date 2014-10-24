Data-set
================
A powerfull dataset class


>    __Features__:
>* load data from array, json or html markup
>* sort per multiple columns
>* complex filters (text, numerical and RegExp)
>* define your own filters
>* filter per multiple columns
>* pagination
>* framework agnostic _(except for the html markup loader that uses jQuery)_
>* __Unit Tested__


data-set has 3 main components, the core, the filters and the data loaders. Filters and data loaders are optional and don't need to be included

Getting Started
----------------------
1. ```npm install javascript-data-set``` or download the [latest version](https://github.com/francodacosta/data-set/releases/latest)

2. include either ```dist/data-set-complete.min.js```

3. use it ...

Example Usage
---------
Take a look at our [jsfiddle page](http://jsfiddle.net/francodacosta/d7k15Lw2/) and play with it

### Data Loader
The data loader is actually a factory that will return a properly configured and populated dataset

#### Json
The json loader can load data from a Json object or string.
I will configure the dataset columns based on the object properties
The Json should contain an array of objects

```js
var dataset, data;
data = [ { col1: 1, col2: 2 }, { col1: 3, col2: 4 } ];
dataset = new Francodacosta.DataSet.Loader.Json(JSON.stringify(data)).load();
```

#### Array
The json loader can load data from an array.
Optionally you can specify if the first row contains ```column``` information
The array array should contain one array per row,

```js
var d, data, firstRowHeaders;
data = [['col1', 'col2'], [1, 2], [3, 4]];
dataset = new Francodacosta.DataSet.Loader.Array(data, firstRowHeaders = true).load();
// in this case the first row (['col1', 'col2']) will be discarded and used as column names
```

#### Markup
This will load data from an HTML table

```html
    <table>
        <thead>
            <tr>
                <!-- it data-name attribute is present, then it will be used for the column name -->
                <th data-name="col1">Column 1</th>
                <th>Col1</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>4</td>
            </tr>
        </tbody>
    </table>
```
You can load data from this table in the following way
```js
// Please note that this loader requires jQuery
dataset = new window.Francodacosta.DataSet.Loader.Markup('table').load();
```

### Sorting
You can sort by any column and you can specify multiple columns

```js
// sort colum 1 ascending and then by column 2 descending
dataset.setSorting('column 1');
dataset.setSorting('column 2', 'DESC');

// remove all sorting specifications
dataset.clearSorting();

data = dataset.getData()
```

### Filters
A filter is just a function that accepts two arguments, the value and the searchTerm and returns ```true``` if a match is found

The filter is executed for each row

For your convenience a set of standard filters are included

##### Text Filter

_window.Francodacosta.DataSet.Filter.Text._

>   * __match()__ returns true if there is an exact match
>   * __beginsWith()__ returns true if the value starts with searchTerm
>   * __endsWith()__ returns true if the value ends with searchTerm
>   * __contains__ returns true if the value contains searchTerm
>   * __regularExpression__ if you need more flexibility you can write your own regular expression

##### Number Filter

_window.Francodacosta.DataSet.Filter.Number._

>   * __equal()__
>   * __notEqual()__
>   * __greaterThan()__
>   * __greaterThanOrEqualTo()__
>   * __lessThan()__
>   * __lessThanOrEqualTo()__

You can add more than one filter, in this case an ```and``` search will be performed
