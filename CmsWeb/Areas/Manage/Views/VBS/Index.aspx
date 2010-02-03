<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<CMSWeb.Models.VBSModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Index</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <script src="/Content/js/jquery.pagination.js" type="text/javascript"></script>
    <script src="/Content/js/jquery.form.js" type="text/javascript"></script>
    <script src="/Content/js/jquery.form2.js" type="text/javascript"></script>
    <script src="/Scripts/Vbs.js" type="text/javascript"></script>
    
    <form id="filter" method="get" action="/VBS/Index">
    <div class="modalPopup">
       UserInfo: <%=Html.DropDownList("UserInfo", Model.FetchUserInfos())%>
       | Grade Completed: <%=Html.DropDownList("Grade", Model.FetchClasses())%>
       | New Applications Only: <%=Html.CheckBox("NewAppsOnly")%>
    </div>
    <%=Html.Hidden("Sort", Model.Sort) %>
    <%=Html.Hidden("Dir", Model.Dir) %>
    </form>
    <table id="VbsApps">
        <tr>
            <th><a href="#" class="sortable">UserInfo</a></th>
            <th><a href="#" class="sortable">App Date</a></th>
            <th><a href="#" class="sortable">Name</a></th>
            <th>Request</th>
            <th><a href="#" class="sortable">Member</a></th>
            <th>Active</th>
            <th><a href="#" class="sortable">Grade</a></th>
            <th><a href="#" class="sortable">Gender</a></th>
            <th><a href="#" class="sortable">Class</a></th>
        </tr>
        <tbody>
        <% foreach (var v in Model.FetchVBSInfo())
           { %>
        <tr>
            <td><%=v.UserInfo%></td>
            <td><a href="/VBS/Detail/<%=v.Id%>"><%="{0:MM-dd-yy HH:mm}".Fmt(v.Uploaded)%></a></td>
            <td>
            <% if(v.PeopleId != null) 
               { %>
                <a id='n<%=v.Id%>' href='/Person/Index/<%=v.PeopleId%>'><%=v.Name%></a>
            <% } %>
            </td>
            <td width="20%"><%=v.Request%></td>
            <td><%=v.MemberOurChurch%></td>
            <td><%=v.ActiveInAnotherChurch%></td>
            <td><%=v.GradeCompleted%></td>
            <td><%=v.Gender%></td>
            <td>
            <% if(v.PeopleId != null) 
               { %>
            <a href="#" id='<%=v.Id%>' class="orgchooser" divid='<%=v.DivId%>' orgid='<%=v.OrgId%>'><%=v.OrgName%></a>
            <% } %>
            </td>
        </tr>
        <% } %>
        </tbody>
    </table>
    <div id="OrgChooser" style="width: 366px;height:138px">
        <table>
        <tr><td>Division</td><td><%=Html.DropDownList("Divs", Model.FetchDivisions()) %></td></tr>
        <tr><td>Organization</td><td><select id="Orgs"></select></td></tr>
        <tr><td colspan="2" align="right"><input type="button" id="selectorg" value="OK" /></td></tr>
        </table>
    </div>
</asp:Content>
