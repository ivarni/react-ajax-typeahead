var TypeAheadSelect = React.createClass({
    getInitialState: function() {
        return {
            options: [],
            showing: [],
            position: -1
        };
    },
    componentDidMount: function() {
        if (this.props.xhr) {
            this.doRequest = this.props.xhr;
        }
    },
    doRequest: function(searchStr, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200) {
                cb(JSON.parse(this.response));
            } else {
                //TODO errorhandling
                throw new Error(this.response);
            }
        };
        xhr.open('GET', this.props.url + searchStr);
        xhr.send();
    },
    handleInput: function(e) {
        if (e.key === 'ArrowDown') {
            this.move(1)
        } else if (e.key === 'ArrowUp') {
            this.move(-1)
        } else if (e.key === 'Enter') {
            this.selectHighlighted();
        } else {
            this.updateOptions(e.target.value)
        }
    },
    selectHighlighted: function() {
        var selectedOption = this.state.showing[this.state.position];
        if (selectedOption) {
            this.selectOption(selectedOption);
        }
    },
    updateOptions: function(value) {
        if (value === '') {
            return this.setOptions([]);
        }
        this.doRequest(value, function(result) {
            if (this.props.filter) {
                result = this.props.filter(result, value);
            }
            this.setOptions(result);
        }.bind(this));
    },
    setOptions: function(options) {
        this.setState({
            showing: options
        });
    },
    selectOption: function(option) {
        React.findDOMNode(this.refs.input).value = option.text;
        this.setState({ showing: [], position: -1 });
    },
    move: function(dPosition) {
        var newPosition = Math.min(this.state.showing.length, Math.max(this.state.position + dPosition, 0));
        this.setState({ position: newPosition });
    },
    render: function() {
        var options = this.state.showing.map(function(option, index) {
            return (
                <TypeAheadOption
                    text={option.text}
                    key={option.value}
                    selectOption={this.selectOption}
                    highlight={index === this.state.position} />
            );
        }.bind(this))
        return (
            <div>
                <input type="text" onKeyUp={this.handleInput} ref="input" onBlur={this.selectHighlighted} />
                <ul onKeyDown={this.handleInput}>
                    {options}
                </ul>
            </div>
        );
    }
});

var TypeAheadOption = React.createClass({
    handleSelection: function(e) {
        this.props.selectOption({ value: this.props.key, text: this.props.text });
    },
    render: function() {
        return (
            <li
                onClick={this.handleSelection}
                className={this.props.highlight ? 'highlight': ''}>
                    {this.props.text}
            </li>
        );
    }
});
