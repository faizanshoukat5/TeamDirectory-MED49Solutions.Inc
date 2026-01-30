component {
    this.name = "TeamDirectoryApp";
    this.datasource = "team_directory";
    this.restsettings = {
        cfclocation = "/backend/api",
        skipCFCWithError = true
    };

    public boolean function onApplicationStart() {
        try {
            restInitApplication(getDirectoryFromPath(getCurrentTemplatePath()) & "api", "api");
        } catch (any err) {
            // Ignore if already registered or REST init fails
        }
        return true;
    }

    public boolean function onRequestStart(string targetPage) {
        setupCorsHeaders();

        if (cgi.request_method EQ "OPTIONS") {
            cfheader(statuscode=204);
            return false;
        }

        return true;
    }

    private void function setupCorsHeaders() {
        cfheader(name="Access-Control-Allow-Origin", value="*");
        cfheader(name="Access-Control-Allow-Methods", value="GET,POST,OPTIONS");
        cfheader(name="Access-Control-Allow-Headers", value="Content-Type,Authorization");
        cfheader(name="Access-Control-Max-Age", value="86400");
    }
}
