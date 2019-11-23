import { FunctionalComponent, h } from "preact";
import { Button, Table } from "react-bootstrap";

interface Props {
    builds: BuildData[]
}

const BuildsList: FunctionalComponent<Props> = ({ builds }) => {
    const buildsRows = builds.map(build => (
        <tr key={build.build_num}>
            <td>{build.build_num}</td>
            <td>{build.branch}</td>
            <td>{build.sha.substring(0,7)}</td>
            <td><Button href={`/${build.build_num}`}>Download</Button></td>
        </tr>
    ));
    return (
        <div>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Build</th>
                    <th>Branch</th>
                    <th>SHA</th>
                    <th>Download</th>
                </tr>
                </thead>
                <tbody>{buildsRows}</tbody>
            </Table>
        </div>
    );
};

export default BuildsList;
