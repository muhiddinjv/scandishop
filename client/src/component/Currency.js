import React, { Component } from 'react'

export default class Currency extends Component {
    render() {
        return (
            <div>
                <label htmlFor="currency">$</label>
                    <select name="currency" id="currency">
                        <option value="dollar">$ USD</option>
                    </select>
            </div>
        )
    }
}
