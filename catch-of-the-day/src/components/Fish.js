import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
        addToOrder: PropTypes.func,
        subtractFromOrder: PropTypes.func
       })
    };
    render() {
        const {image, name, price, status, desc} = this.props.details;
        const isAvailable = status === "available";

        return(
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                    {isAvailable ? "Add to Order" : "Sold Out!"}
                </button>
                <button onClick={() => this.props.subtractFromOrder(this.props.index)}>Remove</button>
            </li>
        )
    }
}

export default Fish;