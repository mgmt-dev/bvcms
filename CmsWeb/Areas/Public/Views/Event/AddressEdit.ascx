﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<CMSWeb.Models.PersonEventModel>" %>
    <tr><th colspan="3"><span style="color:Red">Please provide additional information</span></th></tr>
    <% if(Model.index == 0)
       { %>
    <tr>
        <td><label for="addr">Address</label></td>
        <td><input type="text" name="list[<%=Model.index%>].address" value="<%=Model.address%>" />
        <input type="hidden" name="list[<%=Model.index%>].ShowAddress" value="<%=Model.ShowAddress %>" /></td>
        <td><%= Html.ValidationMessage("address")%></td>
    </tr>
    <tr>
        <td><label for="zip">Zip</label></td>
        <td><input type="text" name="list[<%=Model.index%>].zip" value="<%=Model.zip%>" /></td>
        <td><%= Html.ValidationMessage("zip")%></td>
    </tr>
    <tr>
        <td><label for="city">City</label></td>
        <td><input type="text" name="list[<%=Model.index%>].city" value="<%=Model.city%>" /></td>
        <td><%= Html.ValidationMessage("city")%></td>
    </tr>
    <tr>
        <td><label for="state">State</label></td>
        <td><input type="text" name="list[<%=Model.index%>].state" value="<%=Model.state%>" /></td>
        <td></td>
    </tr>
    <% }
       else
       { %>
    <tr>
        <td><label for="email">Contact Email</label></td>
        <td><input type="text" name="list[<%=Model.index%>].email" value="<%=Model.email%>" /></td>
        <td><%= Html.ValidationMessage("email")%></td>
    </tr>
    <% } %>
    <tr>
        <td><label for="gender">Gender</label></td>
        <td><input type="radio" name="list[<%=Model.index%>].gender" value="1" <%=Model.gender == 1 ? "checked='checked'" : "" %> /> Male<br />
        <input type="radio" name="list[<%=Model.index%>].gender" value="2" <%=Model.gender == 2 ? "checked='checked'" : "" %> /> Female</td>
        <td><%= Html.ValidationMessage("gender") %></td>
    </tr>
    <tr>
        <td><label for="gender">Marital Status</label></td>
        <td><input type="radio" name="list[<%=Model.index%>].married" value="10" <%=Model.married == 10 ? "checked='checked'" : "" %> /> Single<br />
        <input type="radio" name="list[<%=Model.index%>].married" value="20" <%=Model.married == 20 ? "checked='checked'" : "" %> /> Married</td>
        <td><%= Html.ValidationMessage("married") %></td>
    </tr>
