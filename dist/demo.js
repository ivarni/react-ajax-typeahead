function rawMatcher(raw, searchStr) {
    return raw.filter(function (c) { return c.text !== 'One' });
}

function xhr(searchStr, cb) {
    cb([{ text: 'asda', value: 1 }]);
}

React.render(
    React.createElement(TypeAheadSelect, {
        name: "inputName", 
        url: "/data?search="}),
    document.getElementById('demo')
);

React.render(
    React.createElement(TypeAheadSelect, {
        name: "inputName", 
        url: "/data?search=", 
        filter: rawMatcher}),
    document.getElementById('demo-filter')
);

React.render(
    React.createElement(TypeAheadSelect, {
        name: "inputName", 
        xhr: xhr}),
    document.getElementById('demo-xhr')
);
