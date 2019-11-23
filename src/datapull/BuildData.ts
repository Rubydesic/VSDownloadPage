interface BuildData {
    build_num: number;
    branch: string;
    sha: string;
    buildUrl: string;
    all_commit_details: CommitData[];
}

interface CommitData {
    committer_date: string;
    body: string;
    subject: string;
    author_date: string;
    sha: string;
    committer_name: string;
    commit: string;
    [key: string]: string;
}
