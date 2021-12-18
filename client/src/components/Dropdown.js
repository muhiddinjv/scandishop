import React, { Component } from 'react'

export default class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            currencies: [],
        };
    }

    componentDidMount() {
        let initialCurrencies = [];
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({query: `{ currencies }`})
        }).then(response => response.json())
            .then(data => {
            initialCurrencies = data.data.currencies.map((currency) => {
                return currency
            });
            // console.log(initialCurrencies);
            this.setState({
                currencies: initialCurrencies,
            });
        });
    }

    render() {
        return ( <Currency state={this.state}/> )
    }
}

class Currency extends Component {
    constructor() {
        super();
    }

    render () {
        let currencies = this.props.state.currencies;
        let optionItems = currencies.map((currency) =>
                <option key={currency}>{currency}</option>
            );

        return (
         <div>
             <select>
                {optionItems}
             </select>
         </div>
        )
    }
}
