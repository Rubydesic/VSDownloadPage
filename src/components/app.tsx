import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import BuildsPage from "../routes/builds_page";
import BuildInfoPage from "../routes/build_info_page";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

interface State {}
interface Props {}

class App extends Component<Props, State> {

    currentUrl?: string;

    private onRouteChange(event: RouterOnChangeArgs) {
        this.currentUrl = event.url;
    }

    render() {
        return (
            <div id="app">
                <Router onChange={e => this.onRouteChange(e)}>
                    <Route path="/" component={BuildsPage} />
                    <Route path="/:buildNum" component={BuildInfoPage} />
                </Router>
            </div>
        );
    }
}

export default App;
