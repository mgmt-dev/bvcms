﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Net;
using System.Xml.Linq;
using System.Drawing.Printing;

namespace CmsCheckin
{
    public partial class StartUp : Form
    {
        public int CampusId
        {
            get
            {
                var c = cbCampusId.SelectedItem as Campus;
                if (c != null)
                    return c.Id;
                return 0;
            }
        }
        public int DayOfWeek
        {
            get
            {
                var d = cbDayOfWeek.SelectedItem as DayOfWeek;
                return d.Day;
            }
        }
        public StartUp()
        {
            InitializeComponent();
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 0, Text = "Sunday" });
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 1, Text = "Monday" });
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 2, Text = "Tuesday" });
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 3, Text = "Wednesday" });
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 4, Text = "Thursday" });
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 5, Text = "Friday" });
            cbDayOfWeek.Items.Add(new DayOfWeek { Day = 6, Text = "Saturday" });
            cbDayOfWeek.SelectedIndex = (int)DateTime.Now.DayOfWeek;

#if DEBUG
            cbDayOfWeek.SelectedIndex = 0;
            Program.TestMode = true;
            HideCursor.Checked = false;
            EarlyCheckin.SelectedIndex = EarlyCheckin.Items.Count - 1;
#endif
            var prtdoc = new PrintDocument();
            var defp = prtdoc.PrinterSettings.PrinterName;
            foreach (var s in PrinterSettings.InstalledPrinters)
                Printer.Items.Add(s);
            Printer.SelectedIndex = Printer.FindStringExact(defp);

            //if (PrintRawHelper.HasPrinter(Print.datamax1))
            //    Printer.Items.Add(Print.datamax1);
            //if (PrintRawHelper.HasPrinter(Print.datamax2))
            //    Printer.Items.Add(Print.datamax2);
            //if (PrintRawHelper.HasPrinter(Print.zebra))
            //    Printer.Items.Add(Print.zebra);
            //if (PrintRawHelper.HasPrinter(Print.zebra2))
            //    Printer.Items.Add(Print.zebra2);
            //if (Printer.Items.Count > 0)
            //    Printer.SelectedIndex = 0;


            var wc = new WebClient();
            var url = new Uri(new Uri(Util.ServiceUrl()), "Checkin/Campuses");
            var str = wc.DownloadString(url);
            var x = XDocument.Parse(str);
            foreach (var e in x.Descendants("campus"))
                cbCampusId.Items.Add(new Campus
                {
                    Id = int.Parse(e.Attribute("id").Value),
                    Name = e.Attribute("name").Value
                });
            if (cbCampusId.Items.Count > 0)
                cbCampusId.SelectedIndex = 0;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
        }

        private void button2_Click(object sender, EventArgs e)
        {
        }
    }
    class DayOfWeek
    {
        public string Text { get; set; }
        public int Day { get; set; }
        public override string ToString()
        {
            return Text;
        }
    }
    class Campus
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public override string ToString()
        {
            return Name;
        }
    }
}
