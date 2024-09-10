# Thought Process

## Core Features

- **Create Request Types**: Users can define new request types (e.g., "NDA Request - Sales," "MSA Review Request - Procurement").
- **Define Fields Dynamically**: Each request type can specify the fields to be collected, with options for text, long text, dates, options (with `boundValues`), and tags.
- **Modify and Delete Request Types**: Users can view, modify, and delete request types to keep them updated with current business needs.
- **Data Validation**: Client-side form validation ensures required fields are completed with appropriate input types.
- **Assign Request Type Owners**: Each request type is linked to an owner for follow-up.
- **Time Tracking**: Record the creation time of each request type.

## Steps to Build the Solution

### 1. Data Structure Design

Leverage the existing types (`DataRequest`, `DataField`, `User`) to form the backbone of the dynamic request type creation.

#### DataRequest

- **id**: Unique identifier for the request.
- **requestType**: Name of the request type.
- **purpose**: Explains when and why the request should be used.
- **info**: Array of `DataField` to represent each piece of information needed.
- **createdAt**: Timestamp for when the request type was created.
- **createdBy**: The user responsible for creating this request type.

#### DataField

- **format**: Specifies the input type, such as `text`, `longText`, `date`, `tags`, `option`, etc.
- **isRequired**: Boolean flag to mark fields as mandatory or optional.
- **name**: The label for the field.
- **description**: Explains what kind of information should be input.
- **boundValues**: Array of allowed values for `option` or `tags` types, used for validation and UI generation.

### 2. No-Code Interface for Request Type Definition

#### a. Form Building UX

- **Drag-and-Drop/Step-by-Step Builder**: Allow users to choose field types (text, number, date, etc.) and configure them without code.
  - **Dropdown** for selecting field types.
  - **Field settings** for marking as required, giving examples, or setting default values (especially for options).

#### b. Validation and Error Handling

- Validate user inputs (e.g., required fields, date formats) on the client side using Next.js form validation. Implement inline validations with immediate feedback.
- For fields like `option` and `tags`, ensure that `boundValues` are checked to avoid invalid input.

### 3. Viewing & Managing Request Types

- **Dashboard/Overview Screen**: List of all request types created by the user, with the ability to filter, search, or sort by `createdAt` or `requestType`.
- **Edit/Delete Actions**: Allow users to update or remove existing request types.

### 4. Integration with AI System

Upon form submission, the AI system will:

- Identify the correct request type based on the `purpose`.
- Automatically collect the specified fields from the user via the chat interface.

### 5. Time of Creation Tracking

- Use timestamps to record when a request type is created. Display this in the UI so users can track recent updates.

## Considerations for Future Enhancements

- **Role-Based Permissions**: Implement a permissions model allowing different levels of access (e.g., view-only for some users).
- **Versioning of Request Types**: Keep track of different versions of a request type in case of modifications.
- **Template Library**: Offer pre-defined templates (e.g., NDA request, contract review) that users can easily customize.
- **Localization**: Consider supporting multiple languages for international users.

