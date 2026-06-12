# ReadyKit

ReadyKit is an offline-first preparation planner for major life events.

It helps users organize everything they need before a fixed target date: packing lists, documents, deadlines, admin tasks, routines, and reusable templates.

Example use cases:

- moving apartment
- going on a long trip
- starting university
- preparing for an internship
- relocating for a job
- planning a training camp
- preparing for a field course
- organizing a longer stay away from home

ReadyKit is not intended to be a generic todo app. The product is focused on structured preparation before a specific event.

---

## Project Status

ReadyKit is in early development.

The first target is a production-quality MVP with:

- user authentication
- preparation kits
- checklist sections
- checklist items
- progress dashboard
- offline read/write support
- sync between local storage and backend
- reusable templates
- JSON import/export
- responsive mobile-first UI
- automated tests for important business logic

---

## Core Concept

A user creates a **Preparation Kit**.

Each kit represents one upcoming event.

Example:

```text
Moving to Gothenburg
```

A kit contains sections such as:

```text
Documents
Packing
Admin
Travel
Final Week
```

Each section contains checklist items.

Example:

```text
Documents
- ID card
- Bank card
- Rental contract
- Insurance information
- Emergency contacts

Packing
- Clothes
- Toiletries
- Chargers
- Important documents
```

The app tracks how ready the user is before the target date.

---

## Main Features

### Preparation Kits

A kit is the main entity in the app.

Each kit has:

- title
- description
- target date
- status
- sections
- checklist items
- progress score

Possible statuses:

```text
planning
active
completed
archived
```

Example kit:

```text
Title: Moving to Gothenburg
Target date: 2026-08-10
Status: active
Progress: 72%
```

---

### Sections

Sections group related checklist items.

Example sections:

```text
Documents
Packing
Admin
Travel
Final Week
```

Each section belongs to one kit.

Sections should be sortable.

---

### Checklist Items

Checklist items are the core working unit.

Each item can have:

- title
- description
- completed status
- required/optional flag
- priority
- due date
- quantity
- sort order

Example:

```text
Title: Travel adapter
Description: Needed for international trips.
Required: true
Priority: high
Quantity: 1
Completed: false
```

---

### Progress Dashboard

Each kit should show a dashboard with preparation status.

The dashboard should display:

- total completion percentage
- required items completed
- optional items completed
- overdue items
- high-priority remaining items
- days until target date

Example:

```text
Moving to Gothenburg

Starts in: 47 days
Overall progress: 72%

Required items: 18/22
Optional items: 7/13
Overdue items: 1
High-priority remaining: 3
```

---

### Templates

Templates allow users to create a kit from a predefined structure.

Example templates:

- Moving apartment
- Long trip abroad
- University start
- Internship preparation
- Training camp
- Field course
- Blank kit

A template contains predefined sections and items.

Users should be able to:

- browse templates
- preview a template
- create a kit from a template
- edit the generated kit afterward

For the MVP, templates can be hardcoded seed data.

Later, templates can become user-generated and shareable.

---

### Offline-First Support

ReadyKit should work without an internet connection.

Users must be able to:

- open the app offline
- view existing kits
- create checklist items
- edit checklist items
- mark items complete
- create notes
- continue using the app normally

When the user reconnects, local changes should sync to the backend.

The app should clearly display sync status:

```text
All changes synced
Offline
3 changes waiting to sync
Sync failed
Conflict detected
```

---

### Sync

The sync system should support:

- local-first writes
- background sync when online
- pending change queue
- server persistence
- basic conflict handling

Recommended simple sync model for the MVP:

```text
1. User changes data in the UI.
2. Change is immediately saved to IndexedDB.
3. Change is added to a local sync queue.
4. UI updates optimistically.
5. Sync worker sends queued changes to the backend.
6. Backend stores the change.
7. Local change is marked as synced.
```

MVP conflict strategy:

```text
last-write-wins
```

Stretch goal:

```text
manual conflict resolution UI
```

---

### Import and Export

Users should be able to export their kits.

Supported MVP formats:

- JSON export
- JSON import

Stretch formats:

- CSV checklist export
- print-friendly export
- calendar export

Exporting is important because users should not feel locked into the app.

---

## Recommended Tech Stack

This project is intended as a modern full-stack TypeScript application.

Recommended stack:

- Frontend: SvelteKit
- Language: TypeScript
- Styling: Tailwind CSS
- Local database: IndexedDB using Dexie.js
- Backend: SvelteKit server routes or separate Node API
- Database: PostgreSQL
- ORM: Prisma or Drizzle
- Authentication: session-based auth
- Testing: Vitest and Playwright
- Deployment: Docker-compatible platform

The stack may be changed, but the core requirements should remain:

- TypeScript
- mobile-first UI
- offline-first local persistence
- backend sync
- deployed live demo
- automated tests

---

## User Stories

### Kit Management

- As a user, I want to create a preparation kit so that I can organize an upcoming event.
- As a user, I want to edit a kit so that I can update its title, description, and target date.
- As a user, I want to archive a kit so that old preparations do not clutter my dashboard.

### Checklist Management

- As a user, I want to create sections inside a kit so that I can group related tasks.
- As a user, I want to add checklist items so that I can track what needs to be done.
- As a user, I want to mark items as complete so that I can see my progress.
- As a user, I want to mark items as required or optional so that important tasks are prioritized.
- As a user, I want to set due dates so that I know what must be done soon.

### Offline Usage

- As a user, I want to use the app offline so that I can prepare even without internet.
- As a user, I want my offline changes to sync later so that I do not lose work.
- As a user, I want to see whether my changes are synced so that I trust the app.

### Templates

- As a user, I want to start from a template so that I do not need to build a kit from scratch.
- As a user, I want to edit template-generated items so that the kit fits my situation.

### Export

- As a user, I want to export my kit so that I have a backup.
- As a user, I want to import a kit so that I can restore or move my data.

---

## MVP Scope

The MVP should include:

- landing page
- authentication
- kit list
- create, edit, delete, and archive kits
- kit dashboard
- create, edit, delete, and reorder sections
- create, edit, delete, and reorder checklist items
- mark checklist items complete
- required/optional flag
- priority flag
- due dates
- progress calculation
- hardcoded templates
- create kit from template
- IndexedDB local persistence
- basic sync queue
- PostgreSQL backend persistence
- JSON import/export
- responsive mobile-first UI
- basic automated tests

---

## Non-Goals for MVP

Do not implement these in the first version:

- payments
- AI features
- native mobile app
- real-time collaboration
- social feed
- complex permissions
- full document upload
- push notifications
- public template marketplace
- advanced encryption
- complex conflict resolution

These can be considered after the MVP is stable.

---

## Data Model

### User

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};
```

### Kit

```ts
type Kit = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetDate?: string;
  status: "planning" | "active" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  syncVersion: number;
};
```

### Section

```ts
type Section = {
  id: string;
  kitId: string;
  title: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  syncVersion: number;
};
```

### Item

```ts
type Item = {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  completed: boolean;
  required: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  quantity?: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  syncVersion: number;
};
```

### Template

```ts
type Template = {
  id: string;
  title: string;
  description?: string;
  sections: TemplateSection[];
};
```

### TemplateSection

```ts
type TemplateSection = {
  id: string;
  title: string;
  sortOrder: number;
  items: TemplateItem[];
};
```

### TemplateItem

```ts
type TemplateItem = {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  priority: "low" | "medium" | "high";
  quantity?: number;
  sortOrder: number;
};
```

### SyncQueueItem

```ts
type SyncQueueItem = {
  id: string;
  entityType: "kit" | "section" | "item";
  entityId: string;
  operation: "create" | "update" | "delete";
  payload: unknown;
  createdAt: string;
  retryCount: number;
  lastError?: string;
};
```

---

## Suggested Database Tables

```text
users
kits
sections
items
templates
template_sections
template_items
```

Recommended database behavior:

- use UUID primary keys
- use soft deletes for syncable entities
- include `created_at` and `updated_at` on all main tables
- include `sync_version` on syncable entities
- enforce user ownership on kits
- sections belong to kits
- items belong to sections

---

## API Design

The backend API should be simple and predictable.

### Auth

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Kits

```http
GET    /api/kits
POST   /api/kits
GET    /api/kits/:kitId
PATCH  /api/kits/:kitId
DELETE /api/kits/:kitId
```

### Sections

```http
POST   /api/kits/:kitId/sections
PATCH  /api/sections/:sectionId
DELETE /api/sections/:sectionId
```

### Items

```http
POST   /api/sections/:sectionId/items
PATCH  /api/items/:itemId
DELETE /api/items/:itemId
```

### Templates

```http
GET  /api/templates
GET  /api/templates/:templateId
POST /api/templates/:templateId/create-kit
```

### Sync

```http
POST /api/sync/push
GET  /api/sync/pull?since=<timestamp>
```

MVP sync can also be simplified by using normal CRUD endpoints first, then adding sync endpoints later.

---

## Progress Calculation

Progress should be calculated per kit.

Basic formula:

```text
completed items / total items
```

Better formula:

```text
required completed / total required
```

Recommended dashboard values:

```ts
type KitProgress = {
  totalItems: number;
  completedItems: number;
  requiredItems: number;
  completedRequiredItems: number;
  optionalItems: number;
  completedOptionalItems: number;
  overdueItems: number;
  highPriorityRemaining: number;
  completionPercentage: number;
  requiredCompletionPercentage: number;
};
```

For MVP, use:

```text
completionPercentage = completedItems / totalItems * 100
```

If there are no items, progress should be `0`.

---

## Routes

Suggested app routes:

```text
/
/login
/register
/app
/app/kits
/app/kits/new
/app/kits/:kitId
/app/kits/:kitId/edit
/app/templates
/app/templates/:templateId
/app/import-export
/app/settings
```

Suggested API routes:

```text
/api/auth/*
/api/kits/*
/api/sections/*
/api/items/*
/api/templates/*
/api/sync/*
```

---

## UI Requirements

The UI should be mobile-first.

### Kit List

Shows all active kits.

Each kit card should display:

- title
- target date
- progress percentage
- days remaining
- status

### Kit Dashboard

Shows:

- title
- target date
- progress
- required items remaining
- overdue items
- sections
- checklist summary

### Section View

Shows checklist items inside a section.

Users should be able to:

- add item
- edit item
- delete item
- mark item complete
- change priority
- change required/optional status

### Templates Page

Shows available templates.

Users can preview a template and create a kit from it.

### Import/Export Page

Allows:

- export all kits
- export one kit
- import kit from JSON

---

## Accessibility Requirements

The app should be usable with keyboard and screen readers.

Minimum requirements:

- semantic HTML
- visible focus states
- labels for form inputs
- accessible buttons
- sufficient color contrast
- no interaction that only works with hover
- checklist state should be exposed correctly to assistive technologies

---

## Offline Requirements

The app should register a service worker and cache the app shell.

Offline storage should use IndexedDB.

Minimum offline entities:

```text
kits
sections
items
sync queue
```

Offline behavior:

- reads should come from local storage first
- writes should update local storage immediately
- failed sync attempts should stay in the queue
- user should never lose data because of network failure

---

## Sync Requirements

Each local mutation should create a sync queue entry.

Example:

```ts
const queueItem: SyncQueueItem = {
  id: "queue_123",
  entityType: "item",
  entityId: "item_456",
  operation: "update",
  payload: {
    completed: true,
    updatedAt: "2026-06-12T10:00:00.000Z"
  },
  createdAt: "2026-06-12T10:00:00.000Z",
  retryCount: 0
};
```

Sync worker behavior:

```text
1. Check if browser is online.
2. Read unsynced queue entries.
3. Send each entry to backend.
4. If successful, remove entry from queue.
5. If failed, increment retry count and store error.
6. Retry later.
```

---

## Error Handling

The app should handle:

- failed login
- failed registration
- failed API requests
- offline state
- sync failure
- invalid import JSON
- missing kit
- unauthorized access
- deleted entities

Errors should be clear and actionable.

Example:

```text
You are offline. Changes are saved on this device and will sync when your connection returns.
```

---

## Security Requirements

Minimum security requirements:

- hash passwords on the server
- never store plain-text passwords
- validate all API input
- protect all authenticated routes
- enforce user ownership on all entities
- do not allow users to access another user's kits
- use HTTP-only cookies for sessions if using cookie auth
- avoid storing sensitive personal documents in the MVP
- sanitize user-generated text when rendering

---

## Testing

Recommended tests:

### Unit Tests

- progress calculation
- date calculations
- import/export validation
- sync queue behavior

### Integration Tests

- create kit
- create section
- create item
- mark item complete
- create kit from template
- API authorization

### End-to-End Tests

- register user
- log in
- create kit
- add checklist item
- complete checklist item
- reload page and confirm data persists
- simulate offline behavior where possible

---

## Suggested Project Structure

```text
readykit/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   ├── db/
│   │   ├── sync/
│   │   ├── auth/
│   │   ├── templates/
│   │   ├── validation/
│   │   └── utils/
│   ├── routes/
│   │   ├── app/
│   │   ├── api/
│   │   ├── login/
│   │   └── register/
│   └── app.html
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── static/
├── README.md
├── package.json
├── docker-compose.yml
└── .env.example
```

---

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/readykit"
SESSION_SECRET="replace-with-secure-random-string"
```

Do not commit real secrets.

---

## Development Setup

Install dependencies:

```bash
npm install
```

Start the database:

```bash
docker compose up -d
```

Run migrations:

```bash
npm run db:migrate
```

Seed templates:

```bash
npm run db:seed
```

Start development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Build production version:

```bash
npm run build
```

---

## Seed Templates

The project should include initial templates.

### Moving Apartment

Sections:

- Contracts
- Utilities
- Packing
- Cleaning
- Transport
- Address Change

Example items:

- Confirm move-in date
- Review rental contract
- Update home insurance
- Book transport
- Pack kitchen items
- Pack clothes
- Clean old apartment
- Submit address change
- Transfer electricity contract

### Long Trip Abroad

Sections:

- Documents
- Tickets
- Packing
- Money
- Health
- Emergency

Example items:

- Passport
- Travel insurance
- Flight or train tickets
- Accommodation details
- Bank card
- Emergency contacts
- Medication
- Chargers
- Local transport plan

### University Start

Sections:

- Documents
- Housing
- Study Setup
- Admin
- Packing
- First Week

Example items:

- Admission information
- Student account login
- Course registration
- Housing contract
- Laptop
- Notebooks
- Calendar setup
- Budget plan
- First-week schedule

### Internship Preparation

Sections:

- Documents
- Travel
- Work Setup
- Admin
- First Day

Example items:

- Contract
- Start date confirmation
- Contact person
- Travel route
- Laptop setup
- Required accounts
- Tax information
- First-day schedule

### Training Camp

Sections:

- Gear
- Travel
- Nutrition
- Schedule
- Recovery

Example items:

- Training shoes
- Water bottle
- Training clothes
- Travel plan
- Camp schedule
- Snacks
- Recovery clothes
- Sleep plan

### Field Course

Sections:

- Documents
- Equipment
- Travel
- Study Material
- Safety
- Final Check

Example items:

- Course information
- Field notebook
- Weather-appropriate clothing
- Travel details
- Required reading
- Emergency contacts
- Charged power bank

### Blank Kit

Empty kit with no sections.

---

## Implementation Plan

### Phase 1: Foundation

- initialize project
- configure TypeScript
- configure styling
- set up database
- define schema
- create basic layout
- create auth flow

### Phase 2: Core CRUD

- create kits
- list kits
- edit kits
- archive kits
- create sections
- create items
- mark items complete

### Phase 3: Dashboard

- calculate progress
- show required item progress
- show overdue items
- show high-priority remaining items
- show days until target date

### Phase 4: Templates

- add seed templates
- template preview page
- create kit from template
- allow editing generated kit

### Phase 5: Offline Storage

- add IndexedDB
- store kits locally
- store sections locally
- store items locally
- read from local storage first
- keep UI usable offline

### Phase 6: Sync

- add sync queue
- sync local mutations to backend
- show sync status
- retry failed sync
- handle last-write-wins conflicts

### Phase 7: Import/Export

- export kit as JSON
- import kit from JSON
- validate imported data

### Phase 8: Polish

- improve mobile UI
- add loading states
- add empty states
- improve error messages
- add tests
- deploy live demo

---

## Coding Agent Instructions

This section is written for AI coding agents working on the project.

### Primary Objective

Build ReadyKit as a production-quality MVP, not a prototype.

Prioritize:

1. correctness
2. clear architecture
3. simple maintainable code
4. offline-first behavior
5. useful UI
6. tests for important business logic

### Do Not Overbuild

Avoid implementing features outside the MVP unless explicitly requested.

Do not add:

- AI chat
- payments
- social features
- native mobile wrappers
- complex analytics
- document upload
- real-time collaboration

### Use Clear Domain Naming

Use these domain terms consistently:

- Kit
- Section
- Item
- Template
- SyncQueueItem

Do not rename `Kit` to `Project`, `Board`, or `List`.

### Prefer Simple State Management

Avoid large global state libraries unless necessary.

Prefer:

- server data from API
- local IndexedDB data for offline use
- small stores for UI state
- derived values for progress

### Keep Business Logic Separate

Progress calculation, import/export validation, and sync queue logic should live outside UI components.

Recommended locations:

```text
src/lib/utils/progress.ts
src/lib/sync/
src/lib/db/
src/lib/validation/
```

### Validate Inputs

All server endpoints must validate input.

Recommended validation library:

```text
zod
```

Validation should exist for:

- create kit
- update kit
- create section
- update section
- create item
- update item
- import JSON

### Use Soft Deletes for Syncable Entities

For kits, sections, and items, prefer soft deletes:

```ts
deletedAt?: string;
```

This makes sync safer than hard deletes.

### Build Offline Support Incrementally

Do not attempt perfect offline sync immediately.

Recommended order:

```text
1. Local IndexedDB persistence
2. Local-first reads
3. Local-first writes
4. Sync queue
5. Push local changes
6. Pull server changes
7. Conflict handling
```

### MVP Conflict Rule

Use last-write-wins for the MVP.

Later versions can add manual conflict resolution.

### Testing Priority

Highest priority tests:

- progress calculation
- import/export validation
- sync queue behavior
- authorization checks
- create kit from template

### UI Style

The UI should feel calm, practical, and mobile-friendly.

Avoid overly playful gamification.

Use clear dashboard cards, checklists, and progress indicators.

### Accessibility

Use semantic HTML before custom components.

Checklist items should be actual buttons or checkbox controls where appropriate.

---

## Definition of Done for MVP

The MVP is complete when:

- a user can register and log in
- a user can create a kit
- a user can create sections in a kit
- a user can create checklist items
- a user can complete checklist items
- a user can see kit progress
- a user can create a kit from a template
- the app works on mobile screen sizes
- basic offline usage works
- changes persist locally
- changes sync to the backend
- a user can export and import a kit as JSON
- important business logic has tests
- the app is deployed
- the README explains how to run the project

---

## Future Ideas

Possible post-MVP features:

- shareable templates
- public template gallery
- calendar export
- push reminders
- manual conflict resolution
- encrypted private notes
- file/document tracking
- collaborative kits
- print-friendly packing list
- CSV export
- analytics for preparation habits

---

## License

MIT

---

## Short Description

ReadyKit is an offline-first preparation planner for major life events. It helps users create structured kits with checklists, deadlines, templates, and progress tracking so they can prepare confidently before a target date.
