const API_QUERY_PARAM = "?circle-token=a96ec0b4c4c58c8d89455aec06f95ec1dd8c6c60";
const VS_API_STRING = "https://circleci.com/api/v1.1/project/github/ValkyrienSkies/Valkyrien-Skies";

export class BuildDataProvider {
    public static async getBuildData(): Promise<BuildData[]> {
        const apiUrl: string = `${VS_API_STRING}${API_QUERY_PARAM}&limit=20&offset=5&filter=completed`;

        let results: any[];
        let cachedResults = window.localStorage.getItem("results");
        if (cachedResults) {
            console.log("using cache");
            results = JSON.parse(cachedResults);
        } else {
            results = await fetch(apiUrl).then(res => res.json());
            window.localStorage.setItem("results", JSON.stringify(results));
        }

        const builds: BuildData[] = [];
        for (const result of results) {
            builds.push(Object.assign(result, {
                sha: result.vcs_revision,
                build_num: Number(result.build_num)
            }));
        }
        return builds;
    }

    public static async getArtifactUrls(buildNum: number): Promise<string[]> {
        const apiUrl: string = `${VS_API_STRING}/${buildNum}/artifacts${API_QUERY_PARAM}`;

        let results: any[];
        let cachedResults = window.localStorage.getItem(`${buildNum}artifacts`);
        if (cachedResults) {
            results = JSON.parse(cachedResults);
        } else {
            results = await fetch(apiUrl).then(res => res.json());
            window.localStorage.setItem(`${buildNum}artifacts`, JSON.stringify(results));
        }

        return results.map(res => res.url);
    }
}
