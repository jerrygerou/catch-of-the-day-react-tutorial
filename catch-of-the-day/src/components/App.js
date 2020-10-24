import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId, 
            JSON.stringify(this.state.order)
        );
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = fish => {
        // Take a copy of existing state
        const fishes = { ...this.state.fishes };
        // Add new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // Set new fishes object to state
        this.setState({
            fishes: fishes
        })
    };

    updateFish = (key, updatedFish) => {
        // Take a copy of existing state of fishes
        const fishes = { ...this.state.fishes };
        // Update that state
        fishes[key] = updatedFish;
        // Set that to state
        this.setState({ fishes });
    };

    deleteFish = key => {
        // Take a copy of existing state of fishes
        const fishes = { ...this.state.fishes };
        // Update that state
        // using Firebase, we cannot just call .delete, must set to null
        fishes[key] = null;
        // Set the state
        this.setState({ fishes });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = key => {
        // Take a copy of existing state
        const order = { ...this.state.order };
        // Either add to order or update number in order
        order[key] = order[key] + 1 || 1;
        // Set order state
        this.setState({ order: order })
    };

    subtractFromOrder = key => {
        // Take a copy of existing state
        const order = { ...this.state.order };
        // If exists, subtract one
        if (order[key]) {
            order[key] = order[key] - 1;
        }
        // Set order state
        this.setState({ order: order })
    };

    removeFromOrder = key => {
        // Take a copy of existing state
        const order = { ...this.state.order };
        // Since we don't care if this persists in firebase, just delete
        delete order[key];
        // Set order state
        this.setState({ order: order })
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish 
                                key={key} 
                                index={key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder}
                                subtractFromOrder={this.subtractFromOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    storeId={this.props.match.params.storeId}
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                />
            </div>
        )
    }
}

export default App;