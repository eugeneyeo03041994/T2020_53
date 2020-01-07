import React from 'react';
import passion from "./posb-passion-debit-square-683x630.png";
import visad from "./dbs-visa-debit-square-684x630.png";
import safrad from "./safra-dbs-debit-square-684x630.png";
import livef from "./prod-comparator-220x140-dbs-livefreshplat-new-aug14.png";
import evrda from "./prod-comparator-220x140-posb-everyday-cardface.png";
import black from "./prod-comparator-220x140-dbs-visa-black-card-face.png";
import women from "./prod-comparator-220x140-dbs-womans-platinum-card.png";
import {connect} from "react-redux";
import {dbs} from "./PersonalPage";
import {USERS} from "./SignInPage";

const cards = [
    {
        name: "PAssion",
        type: "DEBIT",
        image: passion,
        EVERYDAY: 0.04,
        TRANSPORT: 0.05,
        "F&B": 0.05,
        ONLINE: 0.01,
        LEISURE: 0.05,
    },
    {
        name: "Visa debit",
        type: "DEBIT",
        image: visad,
        EVERYDAY: 0.03,
        TRANSPORT: 0.03,
        "F&B": 0.03,
        ONLINE: 0,
        LEISURE: 0.03,
    },
    {
        name: "SAFRA debit",
        type: "DEBIT",
        image: safrad,
        EVERYDAY: 0.02,
        TRANSPORT: 0.02,
        "F&B": 0.02,
        ONLINE: 0.01,
        LEISURE: 0.01,
    },
    {
        name: "LIVE FRESH",
        type: "CREDIT",
        image: livef,
        EVERYDAY: 0.04,
        TRANSPORT: 0.05,
        "F&B": 0.05,
        ONLINE: 0.01,
        LEISURE: 0.05,
    },
    {
        name: "EVERYDAY",
        type: "CREDIT",
        image: evrda,
        EVERYDAY: 0.03,
        TRANSPORT: 0.03,
        "F&B": 0.03,
        ONLINE: 0,
        LEISURE: 0.03,
    },
    {
        name: "BLACK",
        type: "CREDIT",
        image: black,
        EVERYDAY: 0.02,
        TRANSPORT: 0.02,
        "F&B": 0.02,
        ONLINE: 0.01,
        LEISURE: 0.01,
    },
    {
        name: "WOMENS",
        type: "CREDIT",
        image: women,
        gender: "F",
        EVERYDAY: 0.02,
        TRANSPORT: 0.02,
        "F&B": 0.02,
        ONLINE: 0.01,
        LEISURE: 0.01,
    },
];

const comparatorGen = (age, everyday, transport, fnb, online, leisure) => (a, b) => {
    if (age < 21 && a.type === "CREDIT" && b.type === "CREDIT") {
        return 0;
    } else if (age < 21 && a.type === "CREDIT" && b.type === "DEBIT") {
        return -1;
    } else if (age < 21 && a.type === "DEBIT" && b.type === "CREDIT") {
        return 1;
    }

    const asum =
        everyday * a.EVERYDAY +
        transport * a.TRANSPORT +
        fnb * a["F&B"] +
        online * a.ONLINE +
        leisure * a.LEISURE;

    const bsum =
        everyday * b.EVERYDAY +
        transport * b.TRANSPORT +
        fnb * b["F&B"] +
        online * b.ONLINE +
        leisure * b.LEISURE;

    return bsum - asum;
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendedCards: []
        };
        if (!!this.props.user) {
            const currentUser = USERS[this.props.user];
            dbs.get(`/customers/${this.props.user}`)
                .then(({data}) => data.customerId)
                .then(customerId => dbs.get(`/accounts/deposit/${customerId}`))
                .then(({data}) => data[0].accountId)
                .then(accountId => dbs.get(`/transactions/${accountId}?from=01-01-2019&to=12-31-2019`))
                .then(({data}) => {
                    let averageMap = {};
                    let annualSpending = 0;
                    data.filter(txn => txn.type === "DEBIT").forEach(txn => {
                        if (!averageMap[txn.tag]) {
                            averageMap[txn.tag] = 0;
                        }
                        const value = parseFloat(txn.amount);
                        averageMap[txn.tag] += value;
                        annualSpending += value;
                    });
                    const comparator = comparatorGen(currentUser.age, averageMap["EVERYDAY"] || 0, averageMap["TRANSPORT"] || 0, averageMap["F&B"] || 0, averageMap["ONLINE"] || 0, averageMap["LEISURE"] || 0);
                    this.setState({recommendedCards: cards.filter(card => {
                        if (currentUser.gender === "M" && card.gender === "F") return false;
                        return !(annualSpending < 12000 && card.name === "BLACK");
                    }).sort(comparator).slice(0, 3)});
                })
                .catch(err => {
                    // Redirect to error page
                    console.error(err);
                });
        } else {
            // Not signed in -> show form
        }
    }

    render() {
        return this.props.user ? (
            <div className="ui container">
                <div>
                    <h1>Debit Cards</h1>
                    <p>Hey {this.props.user}, based on your spending patterns, we recommend you the top 3 following cards:</p>
                    <div style={{
                        display:"flex",
                        justifyContent: "space-evenly"
                    }}>
                        {
                            this.state.recommendedCards.map(card =>
                                <div key={card.name} className="ui card">
                                    <div className="image">
                                        <img src={card.image} alt={card.name}/>
                                    </div>
                                    <div className="content">
                                        <p className="header">{card.name}</p>
                                        <div className="description">
                                            Rebates:
                                            <ul>
                                                <li>Everyday Groceries: {Math.floor(card.EVERYDAY * 100)}%</li>
                                                <li>Transport: {Math.floor(card.TRANSPORT * 100)}%</li>
                                                <li>F&B: {Math.floor(card["F&B"] * 100)}%</li>
                                                <li>Online Purchases: {Math.floor(card.ONLINE * 100)}%</li>
                                                <li>Leisure: {Math.floor(card.LEISURE * 100)}%</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        ) : (
            <div className="ui container">
                <h1>Not signed in</h1>
                <p>Please sign in to use our system</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.appState.user
});

export default connect(mapStateToProps)(HomePage);
