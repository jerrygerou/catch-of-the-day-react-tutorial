import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
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

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        // Take a copy of existing state
        const order = { ...this.state.order };
        // Either add to order or update number in order
        order[key] = order[key] + 1 || 1;
        // Set order state
        this.setState({
            order: order
        })
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
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                />
                <Inventory 
                    addFish={this.addFish} 
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        )
    }
}

export default App;