import { Component, h } from "preact";
import BuildsList from "../../components/builds_list";
import { BuildDataProvider } from "../../datapull/BuildDataProvider";
import * as style from "./style.css";


interface State {
    builds: BuildData[];
}
interface Props {}

class BuildsPage extends Component<Props, State> {

    constructor() {
        super();
        this.state = {
            builds: []
        };
    }

    async componentDidMount() {
        const builds = await BuildDataProvider.getBuildData();
        this.setState({ builds });
    }

    render() {
        console.log(this.state.builds);
        return (
            <div id={style.builds_page}>
                <BuildsList builds={this.state.builds}/>
            </div>
        );
    }
}

export default BuildsPage;
