﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CmsData;
using UtilityExtensions;
using System.Web.Mvc;

namespace CmsWeb.Models.OrganizationPage
{
    public class MemberModel
    {
        public enum GroupSelect
        {
            Active,
            Inactive,
            Pending,
        }
        public int? OrganizationId { get; set; }
        private int[] Groups;
        private GroupSelect Select;
        private string NameFilter;

        public PagerModel2 Pager { get; set; }
        public MemberModel(int? id, int[] groups, GroupSelect select, string name)
        {
            OrganizationId = id;
            if (groups == null)
                groups = new int[] { 0 };
            Groups = groups;
            Select = select;
            Pager = new PagerModel2(Count);
            Pager.Direction = "asc";
            Pager.Sort = "Name";
            NameFilter = name;
        }
        public IEnumerable<SelectListItem> SmallGroups()
        {
            var q = from mt in DbUtil.Db.MemberTags
                    where mt.OrgId == OrganizationId
                    orderby mt.Name
                    select new SelectListItem
                    {
                        Text = mt.Name,
                        Value = mt.Id.ToString()
                    };
            var list = q.ToList();
            list.Insert(0, new SelectListItem { Value = "-1", Text = "(not assigned)" });
            list.Insert(0, new SelectListItem { Value = "0", Text = "(not specified)" });
            return list;
        }
        public bool isFiltered
        {
            get { return Util2.CurrentGroups[0] != 0 || NameFilter.HasValue(); }
        }

        private IQueryable<OrganizationMember> _members;
        private IQueryable<OrganizationMember> FetchMembers()
        {
            int inactive = (int)OrganizationMember.MemberTypeCode.InActive;
            bool Active = true;
            bool Pending = false;
            switch (Select)
            {
                case GroupSelect.Inactive:
                    Active = false;
                    Pending = false;
                    break;
                case GroupSelect.Pending:
                    Active = true;
                    Pending = true;
                    break;
                //case GroupSelect.Previous:
                //    return PrevOrgMembers(OrganizationId, sortExpression, maximumRows, startRowIndex);
            }

            if (_members == null)
                _members = from om in DbUtil.Db.OrganizationMembers
                           where om.OrganizationId == OrganizationId
                           where om.OrgMemMemTags.Any(mt => Groups.Contains(mt.MemberTagId)) || Groups[0] <= 0
                           where om.OrgMemMemTags.Count() == 0 || Groups[0] != -1
                           select om;
            if (Active == true)
                if (Pending == false) // current
                    _members = from om in _members
                               where om.MemberTypeId != inactive
                               where (om.Pending ?? false) == false
                               select om;
                else // pending
                    _members = from om in _members
                               where om.MemberTypeId != inactive
                               where (om.Pending ?? false) == true
                               select om;
            else // inactive
                _members = from om in _members
                           where om.MemberTypeId == inactive
                           select om;
            if (NameFilter.HasValue())
            {
                string First, Last;
                Person.NameSplit(NameFilter, out First, out Last);
                if (First.HasValue())
                    _members = from om in _members
                               let p = om.Person
                               where p.LastName.StartsWith(Last)
                               where p.FirstName.StartsWith(First) || p.NickName.StartsWith(First)
                               select om;
                else
                    _members = from om in _members
                               let p = om.Person
                               where p.LastName.StartsWith(Last)
                               select om;
            }
            return _members;
        }
        int? _count;
        public int Count()
        {
            if (!_count.HasValue)
                _count = FetchMembers().Count();
            return _count.Value;
        }
        public IEnumerable<PersonMemberInfo> Members()
        {
            var q0 = ApplySort();
            q0 = q0.Skip(Pager.StartRow).Take(Pager.PageSize);
            var tagownerid = Util2.CurrentTagOwnerId;
            var q = from om in q0
                    let p = om.Person
                    select new PersonMemberInfo
                    {
                        PeopleId = p.PeopleId,
                        Name = p.Name,
                        Name2 = p.Name2,
                        BirthDate = Util.FormatBirthday(
                            p.BirthYear,
                            p.BirthMonth,
                            p.BirthDay),
                        Address = p.PrimaryAddress,
                        Address2 = p.PrimaryAddress2,
                        CityStateZip = Util.FormatCSZ(p.PrimaryCity, p.PrimaryState, p.PrimaryZip),
                        EmailAddress = p.EmailAddress,
                        PhonePref = p.PhonePrefId,
                        HomePhone = p.HomePhone,
                        CellPhone = p.CellPhone,
                        WorkPhone = p.WorkPhone,
                        MemberStatus = p.MemberStatus.Description,
                        Email = p.EmailAddress,
                        BFTeacher = p.BFClass.LeaderName,
                        BFTeacherId = p.BFClass.LeaderId,
                        Age = p.Age.ToString(),
                        MemberTypeCode = om.MemberType.Code,
                        MemberType = om.MemberType.Description,
                        MemberTypeId = om.MemberTypeId,
                        InactiveDate = om.InactiveDate,
                        AttendPct = om.AttendPct,
                        LastAttended = om.LastAttended,
                        HasTag = p.Tags.Any(t => t.Tag.Name == Util2.CurrentTagName && t.Tag.PeopleId == tagownerid),
                        //FromTab = fromtab,
                        Joined = om.EnrollmentDate,
                    };
            return q;
        }
        public IQueryable<OrganizationMember> ApplySort()
        {
            var q = FetchMembers();
            if (Pager.Direction == "asc")
                switch (Pager.Sort)
                {
                    case "Name":
                        q = from om in q
                            let p = om.Person
                            orderby p.Name2,
                            p.PeopleId
                            select om;
                        break;
                    case "Church":
                        q = from om in q
                            let p = om.Person
                            orderby p.MemberStatus.Code,
                            p.Name2,
                            p.PeopleId
                            select om;
                        break;
                    case "MemberType":
                        q = from om in q
                            let p = om.Person
                            orderby om.MemberType.Code,
                            p.Name2,
                            p.PeopleId
                            select om;
                        break;
                    case "Primary Address":
                        q = from om in q
                            let p = om.Person
                            orderby p.Family.StateCode,
                            p.Family.CityName,
                            p.Family.AddressLineOne,
                            p.PeopleId
                            select om;
                        break;
                    case "BFTeacher":
                        q = from om in q
                            let p = om.Person
                            orderby p.BFClass.LeaderName,
                            p.Name2,
                            p.PeopleId
                            select om;
                        break;
                    case "% Att.":
                        q = from om in q
                            orderby om.AttendPct
                            select om;
                        break;
                    case "Age":
                        q = from om in q
                            let p = om.Person
                            orderby p.BirthYear, p.BirthMonth, p.BirthDay
                            select om;
                        break;
                    case "Bday":
                        q = from om in q
                            let p = om.Person
                            orderby p.BirthMonth, p.BirthDay,
                            p.Name2
                            select om;
                        break;
                    case "Last Att.":
                        q = from om in q
                            let p = om.Person
                            orderby om.LastAttended, p.LastName, p.FirstName
                            select om;
                        break;
                }
            else
                switch (Pager.Sort)
                {
                    case "Church":
                        q = from om in q
                            let p = om.Person
                            orderby p.MemberStatus.Code descending,
                            p.Name2,
                            p.PeopleId descending
                            select om;
                        break;
                    case "MemberType":
                        q = from om in q
                            let p = om.Person
                            orderby om.MemberType.Code descending,
                            p.Name2,
                            p.PeopleId descending
                            select om;
                        break;
                    case "Address":
                        q = from om in q
                            let p = om.Person
                            orderby p.Family.StateCode descending,
                                   p.Family.CityName descending,
                                   p.Family.AddressLineOne descending,
                                   p.PeopleId descending
                            select om;
                        break;
                    case "BFTeacher":
                        q = from om in q
                            let p = om.Person
                            orderby p.BFClass.LeaderName descending,
                            p.Name2,
                            p.PeopleId descending
                            select om;
                        break;
                    case "% Att.":
                        q = from om in q
                            orderby om.AttendPct descending
                            select om;
                        break;
                    case "Name":
                        q = from om in q
                            let p = om.Person
                            orderby p.Name2,
                            p.PeopleId descending
                            select om;
                        break;
                    case "Bday":
                        q = from om in q
                            let p = om.Person
                            orderby p.BirthMonth descending, p.BirthDay descending,
                            p.Name2 descending
                            select om;
                        break;
                    case "Last Att.":
                        q = from om in q
                            let p = om.Person
                            orderby om.LastAttended descending, p.LastName descending, p.FirstName descending
                            select om;
                        break;
                    case "Age":
                        q = from om in q
                            let p = om.Person
                            orderby p.BirthYear descending, p.BirthMonth descending, p.BirthDay descending
                            select om;
                        break;
                }
            return q;
        }
    }
}
