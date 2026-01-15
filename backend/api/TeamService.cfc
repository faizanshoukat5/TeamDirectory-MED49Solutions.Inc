<cfcomponent rest="true" restpath="team">
    <cfset this.datasource = "team_directory">

    <cffunction name="getEmployees" access="remote" returntype="struct" httpmethod="GET" restpath="employees" produces="application/json">
        <cfset var response = {"success"=true, "data"=[]}>
        <cfset var qry = "">
        <cfset var employees = []>
        <cfset var row = {}>

        <cftry>
            <cfquery name="qry" datasource="#this.datasource#">
                SELECT ID, FirstName, LastName, Role
                FROM Employees
                WHERE 1 = <cfqueryparam value="1" cfsqltype="cf_sql_integer">
                ORDER BY LastName, FirstName
            </cfquery>

            <cfloop query="qry">
                <cfset row = {
                    "ID" = qry.ID,
                    "FirstName" = qry.FirstName,
                    "LastName" = qry.LastName,
                    "Role" = qry.Role
                }>
                <cfset arrayAppend(employees, row)>
            </cfloop>

            <cfset response.data = employees>

            <cfcatch type="any">
                <cfheader statuscode="500">
                <cfset response.success = false>
                <cfset response.data = []>
                <cfset response.error = "Unable to load employees.">
            </cfcatch>
        </cftry>

        <cfreturn response>
    </cffunction>
</cfcomponent>
