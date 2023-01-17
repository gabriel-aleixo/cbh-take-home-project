# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket #1 - "Front End Modifications"
**1. Problem Statement**

Facilities have internal IDs for agents, but they cannot identify Agents on our platform using their own IDs. This generates manual work and potential for errors.

**2. User Story**

*As a facility manager, I want to easily match the reports on the Agents I hire with my own internal control systems, by providing an internal ID for the Agents on the platform.*

**3. Proposed Work**

Modify the screen that shows the summary of the hours worked by each Agent, to allow user to add an internal ID to each Agent.

**4. Implementation**
- Add a new field next to the ID of each Agent in the shifts summary report;
- The field initially contains a placeholder "add internal ID";
- User can click the field to add and save an internal ID for each Agent in the report;

**5. Acceptance Criteria**
- New field is easy to locate and doesn't disrupt page layout;
- New design works in all screen sizes, devices and browsers supported by the platform;
- User can save, modify or delete ID;
- If an internal ID exists, system must warn user before allowing canges;
- Internal ID field must accept all formats used by clients;

**6. Effort**
- 6h Front End
- 2h Design
- 1h Customer Team

**7. Dependencies**
- UI/UX, page designs;
- Information on formats used by clients;
- Mock data / API for development;

### Ticket #2 - "Back End and Data Model"
**1. Problem Statement**

The platoform has a unique ID per Agent, but some clients need to use their own internal IDs for Agents. There is no way to guarantee client's IDs will be unique or properly structured.

**2. User Story**

*As a system administrator, I need to store internal Agent IDs provided by clients keeping them accessible only to the client that provided them, without risking duplicates or ID insconsistencies*

**3. Proposed Work**

Create a new table and corresponding API endpoints (if required) to store internal Agent IDs provided by clients

**4. Implementation**
- Add table `internal_ids` to database;
- Primary key: standard UUID;
- Facility ID: foreign key, references id in Facilities table, not null;
- Agent ID: foreign key, references id in Agents table, not null;
- Internal ID: text, user input;
- created_at, modified_at: timestamp;
- Expose CRUD endpoints for the new table in the API;

**5. Acceptance Criteria**
- Front-end successfully creates, reads, updates internal IDs;
- Only owner (Facility) can read, update, delete internal IDs;
- Internal IDs are deleted, or marked for deletion on cascade with Facility or Agent;

**6. Effort**
- 4h Data;
- 4h Back-end;
- 2h Testing;

**7. Dependencies**
- Front-end work

### Ticket #3 - "Rework `getShiftsByFacility`
**1. Problem Statement**

The current function to retrieve shifts by Facility does not contemplate internal IDs when returning data.

**2. User Story**

*As a user, I want my shifts reports to inlcude the internal IDs I entered in the platform*

**3. Proposed Work**

Modify the `getShiftsByFacility` function to query the new `internal_ids` table;

**4. Implementation**
- Modify SQL query to JOIN `iternal_ids` on Facility and Agent ids;
- Return null if no ids exist for the Facility and Agent;

**5. Acceptance Criteria**
- Function returns internal ID linked to the Facility and the Agents;
- Non-existing IDs are treated correctly;

**6. Effort**
- 2h Back-end;
- 2h Testing;

**7. Dependencies**
- Front-end work
- Data model work

### Ticket #4 - "Rework `generateReport`
**1. Problem Statement**

The current PDF report generated by the system does not inlcude the internal IDs for the agents.

**2. User Story**

*As a user, I want my PDF report to include the internal IDs I added for the agents in the platform*

**3. Proposed Work**

Modify the `generateReport` function to treat the new Internal IDs data returned by `getShiftsByFacility`;

**4. Implementation**
- Modify PDF layout to include Internal ID next to the existing ID of each agent;
- Modify function code to generate new PDF layout;

**5. Acceptance Criteria**
- PDF layout clearly displays internal ID for each agent, when one exists;
- Long Internal IDs do not corrupt page layout;

**6. Effort**
- 4h Back-end;
- 2h Testing;

**7. Dependencies**
- Front-end work
- Data model work
- `getShiftsByFacility` rework
- PDF layout
