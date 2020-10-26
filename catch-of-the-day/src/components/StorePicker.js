import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component{
    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object
    }

    goToStore = event => {
        // prevent form from submitting
        event.preventDefault();
        // get the text from input
        const storeName = this.myInput.current.value;
        // change page to /store/{whatever}
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required placeholder="Store name" 
                    defaultValue={getFunName()} 
                />
                <button type="submit">Visit Store ▶</button>
            </form>
        )
    }
}

export default StorePicker;