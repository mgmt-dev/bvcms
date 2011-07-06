﻿/* Author: David Carroll
 * Copyright (c) 2008, 2009 Bellevue Baptist Church 
 * Licensed under the GNU General Public License (GPL v2)
 * you may not use this code except in compliance with the License.
 * You may obtain a copy of the License at http://bvcms.codeplex.com/license 
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UtilityExtensions;
using System.Web.Mvc;
using System.Web.Routing;
using System.Text.RegularExpressions;
using System.Threading;
using System.Data.Linq;
using CmsData;
using System.Collections;

namespace CmsWeb.Models
{
    public class DivisionModel
    {
        public int ProgramId { get; set; }
        public int? TagProgramId { get; set; }

        public IEnumerable<DivisionInfo> DivisionList()
        {
            var q = from d in DbUtil.Db.Divisions
                    where ProgramId == 0 || d.ProgDivs.Any(pd => pd.ProgId == ProgramId)
                    orderby d.Program.Name, d.ReportLine, d.Name
                    select d;
            return DivisionInfos(q);
        }
        public IEnumerable<DivisionInfo> DivisionItem(int id)
        {
            var q = from d in DbUtil.Db.Divisions
                    where d.Id == id
                    select d;
            return DivisionInfos(q);
        }
        private IEnumerable<DivisionInfo> DivisionInfos(IQueryable<Division> q)
        {
            var qq = from d in q
                     select new DivisionInfo
                     {
                         Id = d.Id,
                         Name = d.Name,
                         ProgId = d.ProgId,
                         Program = d.Program.Name,
                         ReportLine = d.ReportLine,
                         NoDisplayZero = (d.NoDisplayZero ?? false) ? "yes" : "no",
                         MeetingCount = DbUtil.Db.Organizations.Where(o => o.OrganizationStatusId == 30 && (o.DivisionId == d.Id || o.DivOrgs.Any(dg => dg.DivId == d.Id))).Sum(o => o.Meetings.Count()),
                         OrgCount = d.Organizations.Count(o => o.OrganizationStatusId == 30),
                         DivOrgsCount = d.DivOrgs.Count(o => o.Organization.OrganizationStatusId == 30),
                         Programs = d.ProgDivs.Select(pd => pd.Program.Name).ToArray(),
                         Tag = (TagProgramId == null || TagProgramId == 0) ? "" : d.ProgDivs.Any(ot => ot.ProgId == TagProgramId) ? "Remove" : "Add",
                         ChangeMain = (d.ProgId == null || d.ProgId != TagProgramId) && d.ProgDivs.Any(pd => pd.ProgId == TagProgramId),
                     };
            return qq;
        }
        public SelectList ProgramIds()
        {
            var q = from c in DbUtil.Db.Programs
                    orderby c.Name
                    select new
                    {
                        Value = c.Id.ToString(),
                        Text = c.Name
                    };
            var list = q.ToList();
            list.Insert(0, new
            {
                Value = "0",
                Text = "(not specified)",
            });
            return new SelectList(list, "Value", "Text");
        }
    }
    public class DivisionInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ProgId { get; set; }
        public string Program { get; set; }
        public int? ReportLine { get; set; }
        public int? MeetingCount { get; set; }
        public int OrgCount { get; set; }
        public int DivOrgsCount { get; set; }
        public string NoDisplayZero { get; set; }
        public string NoZero(int? arg)
        {
            if (arg == 0)
                return "";
            return arg.ToString2("n0");
        }
        public bool CanDelete
        {
            get
            {
                return OrgCount + DivOrgsCount == 0;
            }
        }
        public string Tag { get; set; }
        public bool? ChangeMain { get; set; }
        public string[] Programs;
        public string ToolTip
        {
            get
            {
                if (Programs == null)
                    return "";
                return "{0}|Orgs:{1}|DivOrgs:{2}|Meetings:{3}|Programs:|{4}".Fmt(Name, OrgCount, DivOrgsCount, MeetingCount,
                    string.Join("|", Programs));
            }
        }
    }
}
