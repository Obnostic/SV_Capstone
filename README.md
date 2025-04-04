# SV_Capstone
Final Capstone Project - Text Parser and Spreadsheet Creator

--- almost COMPLETE ----

Statistics reports can be generated from a Sharp Multifunction Printer (MFP) when SMTP is installed on the machine.

This detailed report only needs a few pieces of data extracted to assist with a dealership's billing purposes on maintenance contracts.

Extracting directly from the emailed report is beyone the scope of this project.
Thus, I have built a text file from several reports.
The code parses the text file to extract the relevant data, stores in a 1D array, converts it to a 2D array, to allow the UNPKG API to create and fill a spreadsheet.

To USE:
Call up the Index.html.
Click 'Choose File' and get the text file.
Click 'Read File' to parse.
Wait 3-5 seconds and click "Make Spreadsheet."
The result is placed in your Downloads folder under the name SV_Result etc.

Objectives yet to achieve are:

Displaying each record's data to the user in the browser, and waiting for their click to approve.  Currently, it only shows the last record processed.

Unable to provide data advising the user to keep a backup toner handy.

Cannot make distinction between Color Total Print Count and Single Color Total Print Count.  Thus the entire line is presented with both values.

Opening multiple files for processing will append data to the array, but the spreadsheet results may not be synchronized.

Minimum requirements achieved:
Get a text file of data and convert it to a spreadsheet, after filtering the data for relevant items.