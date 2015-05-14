# react-ajax-typeahead

Diving into React and trying to build a simple AJAX backed typeahead

Work in progress.

## Develop

* npm install -g react-tools
* jsx --watch src/ dist/

## Usage

### Basic

    React.render(
        <TypeAheadSelect url="/data?search="/>,
        document.getElementById('demo')
    );

### BYO filter-function

    function rawMatcher(raw, searchStr) {
        return raw.filter(function (c) { return c.text !== 'One' });
    }

    React.render(
        <TypeAheadSelect
            url="/data?search="
            filter={rawMatcher} />,
        document.getElementById('demo')
    );

### BYO AJAX

    function xhr(searchStr, cb) {
        cb([{ text: 'asda', value: 1 }]);
    }

    React.render(
        <TypeAheadSelect
            xhr={xhr} />,
        document.getElementById('demo')
    );

## License

ISC
