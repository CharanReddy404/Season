import React from 'react';
import { createRoot } from 'react-dom/client';
import SeasonDisply from './SeasonDisplay';
import Loader from './Loader';

// const App = () => {
//     window.navigator.geolocation.getCurrentPosition(
//         (position) => console.log(position),
//         (err) => console.log(err)
//     );

//     return <div>Hello React</div>;
// };

class App extends React.Component {
    state = { lat: null, errMsg: '' }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errMsg: err.message })
        );
    }

    renderContent() {
        if (this.state.errMsg && !this.state.lat) {
            return <div>Error Message:- {this.state.errMsg}</div>;
        } else if (this.state.lat) {
            return (
                <div>
                    <SeasonDisply lat={this.state.lat} />
                </div>
            );
        } else {
            return <Loader message="Please accept loaction request" />;
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
