# react-ajax-typeahead

Diving into React and trying to build a simple AJAX backed typeahead

Work in progress.

## Develop

* npm install
* npm install -g react-tools
* jsx --watch src/ dist/
* http://localhost:3000/

## Usage

### Basic

    React.render(
        <TypeAheadSelect
            name="inputName"
            url="/data?search="/>,
        document.getElementById('demo')
    );

### BYO filter-function

    function rawMatcher(raw, searchStr) {
        return raw.filter(function (c) { return c.text !== 'One' });
    }

    React.render(
        <TypeAheadSelect
            name="inputName"
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
            name="inputName"
            xhr={xhr} />,
        document.getElementById('demo')
    );

## License

ISC
