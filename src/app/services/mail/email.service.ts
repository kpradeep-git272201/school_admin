import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor() {}

    assignToTemp(issue: any) {
        const temp = `<!DOCTYPE html>
              <html>
              <head>
                <style>
                  .container {
                    font-family: Arial, sans-serif;
                    border: 1px solid #e0e0e0;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    color: #333;
                    max-width: 600px;
                    margin: auto;
                  }
                  .header {
                    background-color: #007bff;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px 8px 0 0;
                  }
                  .details-table {
                    width: 100%;
                    margin-top: 15px;
                    border-collapse: collapse;
                  }
                  .details-table td {
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                  }
                  .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>New Issue Assigned</h2>
                  </div>

                  <p>Hello <strong>${issue.assignTo}</strong>,</p>

                  <p>You have been assigned a new issue. Please find the details below:</p>

                  <table class="details-table">
                    <tr>
                      <td><strong>Issue Title</strong></td>
                      <td>${issue.title}</td>
                    </tr>
                    <tr>
                      <td><strong>Project Code</strong></td>
                      <td>${issue.projectCode}</td>
                    </tr>
                    <tr>
                      <td><strong>Description</strong></td>
                      <td>${issue.description}</td>
                    </tr>
                    <tr>
                      <td><strong>Start Date</strong></td>
                      <td>${issue.startDate}</td>
                    </tr>
                    <tr>
                      <td><strong>End Date</strong></td>
                      <td>${issue.endDate}</td>
                    </tr>
                    <tr>
                      <td><strong>Assigned By</strong></td>
                      <td>${issue.requester}</td>
                    </tr>
                  </table>

                  <p>Please login to your dashboard to take further action.</p>

                  <div class="footer">
                    © 2025 FixPoint. All rights reserved.
                  </div>
                </div>
              </body>
              </html>`;
        return temp;
    }
}
