import { Component, h } from "preact";
import { BuildDataProvider } from "../../datapull/BuildDataProvider";
import BuildInfo from "../../components/build_info";
import { RouterProps } from "preact-router";


interface State {
    build?: BuildData;
    artifact?: string;
}
interface Props extends RouterProps {
    buildNum: number;
}

class BuildInfoPage extends Component<Props, State> {

    constructor() {
        super();
    }

    async componentDidMount() {
        const builds = await BuildDataProvider.getBuildData();
        const validBuilds = builds.filter(b => b.build_num == this.props.buildNum);
        if (validBuilds.length === 0) {
            if (this.props.history) this.props.history.push("/404-not-found")
        } else {
            const build = validBuilds[0];
            this.setState({ build });

            const artifacts: string[] = await BuildDataProvider.getArtifactUrls(build.build_num);
            const artifact = artifacts.filter(s => /.*ValkyrienSkies-1.12.2-1.0.jar$/.test(s)).pop();
            this.setState({ artifact })
        }
    }

    render() {
        return (
            <div>
                { this.state.build &&
                    <BuildInfo build={this.state.build} artifact={this.state.artifact}/>
                }
            </div>
        );
    }
}

export default BuildInfoPage;
