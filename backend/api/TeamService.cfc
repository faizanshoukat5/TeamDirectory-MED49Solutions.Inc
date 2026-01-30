<cfcomponent rest="true" restpath="team">
    <cfset this.datasource = "team_directory">

    <!--- List all employees --->
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

    <!--- Get single employee by ID --->
    <cffunction name="getEmployee" access="remote" returntype="struct" httpmethod="GET" restpath="employees/{id}" produces="application/json">
        <cfargument name="id" type="numeric" required="true">
        <cfset var response = {"success"=true, "data"={}}>
        <cfset var qry = "">

        <cftry>
            <cfquery name="qry" datasource="#this.datasource#">
                SELECT ID, FirstName, LastName, Role
                FROM Employees
                WHERE ID = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
            </cfquery>

            <cfif qry.recordcount gt 0>
                <cfset response.data = {
                    "ID" = qry.ID,
                    "FirstName" = qry.FirstName,
                    "LastName" = qry.LastName,
                    "Role" = qry.Role
                }>
            <cfelse>
                <cfheader statuscode="404">
                <cfset response.success = false>
                <cfset response.error = "Employee not found">
            </cfif>

            <cfcatch type="any">
                <cfheader statuscode="500">
                <cfset response.success = false>
                <cfset response.error = "Unable to load employee.">
            </cfcatch>
        </cftry>

        <cfreturn response>
    </cffunction>

    <!--- Create a new employee (accepts JSON body) --->
    <cffunction name="createEmployee" access="remote" returntype="struct" httpmethod="POST" restpath="employees" consumes="application/json" produces="application/json">
        <cfset var response = {"success"=false, "data"={}}>
        <cfset var payload = {}>
        <cfset var first = "">
        <cfset var last = "">
        <cfset var role = "">

        <cftry>
            <cfset var req = getHttpRequestData()>
            <cfset var raw = "">
            <cfif structKeyExists(req, 'content')>
                <cfset raw = trim(req.content)>
            </cfif>
            <cfif len(raw) and (left(raw,1) eq '{' or left(raw,1) eq '[')>
                <cfset payload = deserializeJson(raw)>
            <cfelse>
                <cfset payload = {}>
            </cfif>

            <cfset first = trim(structKeyExists(payload, 'FirstName') ? payload.FirstName : (structKeyExists(payload, 'firstName') ? payload.firstName : ''))>
            <cfset last  = trim(structKeyExists(payload, 'LastName')  ? payload.LastName  : (structKeyExists(payload, 'lastName')  ? payload.lastName  : ''))>
            <cfset role  = trim(structKeyExists(payload, 'Role')      ? payload.Role      : (structKeyExists(payload, 'role')      ? payload.role      : ''))>

            <!--- Fallback to form fields if JSON parsing failed or client sent urlencoded form data --->
            <cfif first eq '' and structKeyExists(form,'FirstName')>
                <cfset first = trim(form.FirstName)>
            </cfif>
            <cfif last eq '' and structKeyExists(form,'LastName')>
                <cfset last = trim(form.LastName)>
            </cfif>
            <cfif role eq '' and structKeyExists(form,'Role')>
                <cfset role = trim(form.Role)>
            </cfif>

            <cfif first eq '' or last eq '' or role eq ''>
                <cfheader statuscode="400">
                <cfset response.success = false>
                <cfset response.error = "Missing required fields: FirstName, LastName, Role">
                <cfreturn response>
            </cfif>

            <cfquery name="ins" datasource="#this.datasource#">
                INSERT INTO Employees (FirstName, LastName, Role)
                VALUES (
                    <cfqueryparam value="#first#" cfsqltype="cf_sql_varchar">,
                    <cfqueryparam value="#last#"  cfsqltype="cf_sql_varchar">,
                    <cfqueryparam value="#role#"  cfsqltype="cf_sql_varchar">
                )
            </cfquery>

            <cfquery name="getId" datasource="#this.datasource#">
                SELECT SCOPE_IDENTITY() AS NewID
            </cfquery>

            <cfset response.success = true>
            <cfset response.data = {"ID" = getId.NewID, "FirstName" = first, "LastName" = last, "Role" = role}>

            <cfcatch type="any">
                <cfheader statuscode="500">
                <cfset response.success = false>
                <cfset response.error = "Unable to create employee.">
                <cfset response.details = cfcatch.message & (structKeyExists(cfcatch,'detail') ? ' - ' & cfcatch.detail : '')>
            </cfcatch>
        </cftry>

        <cfreturn response>
    </cffunction>

</cfcomponent>
