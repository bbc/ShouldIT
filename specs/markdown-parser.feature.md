# Markdown parser

+ IT callsback with the first spec found
+ IT adds describe that the spec is nested in
+ IT replaces the suite if a header is found at the same level
+ IT removes any suites that have been closed by a smaller level of header
+ IT handles specs defined with a +
+ IT handles files with extra returns
+ IT skips a file with a chevron on the first line
+ IT skips a file with a skip regardless of case
+ IT matches skips with no space between the chevron and skip keyword
+ IT skips everything after a skip
+ IT strips its from the matched spec
+ IT matches markers and returns only those specs when a marker is supplied