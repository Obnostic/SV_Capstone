# SV_Capstone
Final Capstone Project - Text Parser and Spreadsheet Creator

--- INCOMPLETE ----

Statistics reports can be generated from a Sharp Multifunction Printer (MFP) when SMTP is installed on the machine.

This detailed report only needs a few pieces of data extracted to assist with a dealership's billing purposes on maintenance contracts.

Extracting directly from the emailed report is beyone the scope of this project.
Thus, I have built a text file from several reports.
The code parses the text file to extract the relevant data, builds a JSON, and then uses that JSON to create and fill a spreadsheet.

Google's API has been utilized to this end.

Objectives yet to achieve are:

Displaying each record's data to the user and waiting for their click to approve.
Populating JSON with the data parsed from the records
Using the JSON as a base to create the spreadsheet.

Right now, there is working Google API script to create both a test spreadsheet and a JSON.  Unfortunately, it saves to the Download folder.
You may test and issue recommendations.  Please use goog_xlsx.html for this purpose.