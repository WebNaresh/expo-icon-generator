# SkillCircle Database Schema

This document describes the Prisma schema for the SkillCircle skill exchange platform.

## Overview

SkillCircle is a barter-based platform where users can teach skills they know in exchange for learning skills they need. The database schema supports:

- User profiles and authentication
- Skill offerings and requests
- Skill exchange matching and tracking
- Rating and review system
- Flexible location data for future geographic features

## Models

### User

Core user profile with authentication and profile information.

**Key Features:**

- Google OAuth integration (profileImage from Google)
- Flexible location data stored as JSON
- Account verification and status tracking
- **Enhanced Privacy Controls:**
  - `isPrivate`: Hide entire profile from public searches
  - `showLocation`: Control location visibility
  - `showRatings`: Control rating visibility
  - `showSkillsOffered/Wanted`: Control skill visibility
  - `allowDirectContact`: Control direct messaging
- Relationships to all user activities

### SkillOffered

Skills that users can teach to others.

**Key Features:**

- Detailed skill descriptions and categorization
- Experience level and teaching preferences
- Availability and format preferences
- What they're looking for in exchange
- Public/private visibility controls

### SkillWanted

Skills that users want to learn.

**Key Features:**

- Learning goals and current skill level
- Preferred learning format and timeline
- What skills they can offer in return
- Target completion dates

### SkillExchange

Tracks actual skill exchange sessions between users.

**Key Features:**

- Links teacher and learner
- References specific offered and wanted skills
- Progress tracking with milestones
- Status management (pending → completed)
- Scheduling and time tracking

### Availability

**NEW:** Detailed scheduling system for skill availability.

**Key Features:**

- Specific day-of-week and time-slot combinations
- Timezone-aware scheduling
- Recurring patterns vs one-time availability
- Custom time ranges and session durations
- Skill-specific or general availability
- Date exceptions and overrides
- Calendar integration ready

### RatingGiven

User ratings and reviews for completed exchanges.

**Key Features:**

- Overall rating (1-5) plus category-specific ratings
- Detailed review text and titles
- Verification status for authentic exchanges
- Public/private visibility controls
- Prevents duplicate ratings per exchange

## Enums

- **SkillCategory**: Technology, Business, Creative, Languages, Music, etc.
- **ExperienceLevel**: Beginner, Intermediate, Advanced, Expert
- **AvailabilityType**: Weekdays, Weekends, Evenings, Flexible, etc. _(Legacy)_
- **LearningPreference**: One-on-one, Group, Online, In-person, Hybrid
- **ExchangeStatus**: Pending, Accepted, In Progress, Completed, Cancelled
- **DayOfWeek**: Monday through Sunday _(NEW)_
- **TimeSlot**: Early Morning, Morning, Afternoon, Evening, Late Evening, Custom _(NEW)_
- **SessionDuration**: 30min, 1hr, 2hr, 3hr, Half Day, Full Day, Flexible _(NEW)_

## Indexes

Performance indexes are strategically placed on:

- User lookup fields (email, active status)
- Skill search fields (category, active/public status)
- Exchange tracking (participants, status, dates)
- Rating queries (rated user, rating scores)

## JSON Fields

### User.location

Flexible location data for future geographic features:

```json
{
  "city": "San Francisco",
  "state": "California",
  "country": "United States",
  "coordinates": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "timezone": "America/Los_Angeles",
  "isPublic": true
}
```

### SkillExchange.milestones

Progress tracking for skill exchanges:

```json
[
  {
    "id": 1,
    "title": "Basic concepts covered",
    "description": "Completed introduction to React components",
    "completedAt": "2024-01-15T10:00:00Z",
    "isCompleted": true
  }
]
```

## Usage Examples

### Creating a User

```typescript
const user = await prisma.user.create({
  data: {
    email: "john@example.com",
    name: "John Doe",
    profileImage: "https://lh3.googleusercontent.com/...",
    location: {
      city: "San Francisco",
      state: "California",
      country: "United States",
      isPublic: true,
    },
  },
});
```

### Finding Skills by Category

```typescript
const techSkills = await prisma.skillOffered.findMany({
  where: {
    category: "TECHNOLOGY",
    isActive: true,
    isPublic: true,
  },
  include: {
    user: {
      select: {
        name: true,
        profileImage: true,
        location: true,
      },
    },
  },
});
```

### Creating a Skill Exchange

```typescript
const exchange = await prisma.skillExchange.create({
  data: {
    teacherId: "teacher-user-id",
    learnerId: "learner-user-id",
    offeredSkillId: "offered-skill-id",
    wantedSkillId: "wanted-skill-id",
    title: "React Development for Guitar Lessons",
    format: "HYBRID",
    estimatedHours: 20,
  },
});
```

### Creating Detailed Availability

```typescript
const availability = await prisma.availability.create({
  data: {
    userId: "user-id",
    skillOfferedId: "skill-id", // Optional: specific to a skill
    daysOfWeek: ["MONDAY", "WEDNESDAY", "FRIDAY"],
    timeSlots: ["EVENING"],
    sessionDuration: "TWO_HOURS",
    timezone: "America/Los_Angeles",
    isRecurring: true,
    validFrom: new Date("2024-02-01"),
    validUntil: new Date("2024-12-31"),
    specificDates: [
      {
        date: "2024-02-15",
        startTime: "19:00",
        endTime: "21:00",
        note: "Special extended session",
      },
    ],
  },
});
```

### Finding Users with Matching Availability

```typescript
const matchingUsers = await prisma.user.findMany({
  where: {
    isPrivate: false,
    isActive: true,
    availabilities: {
      some: {
        daysOfWeek: { has: "MONDAY" },
        timeSlots: { has: "EVENING" },
        timezone: "America/Los_Angeles",
        isActive: true,
      },
    },
  },
  include: {
    skillsOffered: {
      where: { isActive: true, isPublic: true },
    },
    availabilities: {
      where: { isActive: true },
    },
  },
});
```

## Migration Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database in Prisma Studio
npx prisma studio
```

## Security Considerations

- All user data includes proper cascade deletion
- Unique constraints prevent duplicate ratings
- Public/private visibility controls on skills and ratings
- User verification status tracking
- Flexible location privacy controls
