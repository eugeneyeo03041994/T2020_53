import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import rateLimit from "axios-rate-limit";

const dbs = rateLimit(axios.create({
    baseURL: "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/",
    headers: {
        "Identity": "T2",
        "Token": "b6c1b36c-db5a-4620-abc7-bf58fc22bf93"
    }
}), {maxRPS: 5});

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        };
        if (!!this.props.user) {
            dbs.get(`/customers/${this.props.user}`)
                .then(({data}) => data.customerId)
                .then(customerId => dbs.get(`/accounts/deposit/${customerId}`))
                .then(({data}) => {

                    return data[0].accountId
                })
                .then(accountId => dbs.get(`/transactions/${accountId}?from=01-01-2018&to=01-31-2020`))
                .then(({data}) => this.setState({transactions: data}))
                .catch(err => {
                   // Redirect to error page
                   console.error(err);
                });
        } else {
            // Not signed in
        }
    }

    render() {
        console.log(this.state.transactions.length);
        return (
            <div  className="ui container">
                <h1 className="ui dividing header header-style">
                    Title here
                    <h2 className="ui sub header">
                        sub title intruduction
                    </h2>
                </h1>

                <div className="ui raised segment">
                    Put Graph here

                </div>

                <div className="">
                    <table className="ui fluid table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount(SGD)</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.transactions.map(transaction =>
                                <tr key={transaction.transactionId}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.tag}</td>
                                    <td>{transaction.referenceNumber}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            )
                        }

                        </tbody>

                        <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>$51.00</th>
                        </tr>
                        </tfoot>

                    </table>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.appState.user
});

export default connect(mapStateToProps)(PersonalPage);
