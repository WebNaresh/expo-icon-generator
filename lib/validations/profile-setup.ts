/**
 * Validation Schemas for Profile Setup
 * SkillCircle Platform - Comprehensive user onboarding validation
 */

import { z } from "zod";

// Enums from Prisma schema
export const SkillCategoryEnum = z.enum([
  "TECHNOLOGY",
  "BUSINESS",
  "CREATIVE",
  "LANGUAGES",
  "MUSIC",
  "SPORTS",
  "COOKING",
  "CRAFTS",
  "HEALTH_WELLNESS",
  "EDUCATION",
  "AUTOMOTIVE",
  "HOME_GARDEN",
  "OTHER"
]);

export const ExperienceLevelEnum = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT"
]);

export const DayOfWeekEnum = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
]);

export const TimeSlotEnum = z.enum([
  "EARLY_MORNING",
  "MORNING",
  "AFTERNOON",
  "EVENING",
  "LATE_EVENING"
]);

export const SessionDurationEnum = z.enum([
  "THIRTY_MINUTES",
  "ONE_HOUR",
  "TWO_HOURS",
  "THREE_HOURS",
  "HALF_DAY",
  "FULL_DAY",
  "FLEXIBLE"
]);

// Availability schema
export const availabilitySchema = z.object({
  daysOfWeek: z.array(DayOfWeekEnum).min(1, "Select at least one day"),
  timeSlots: z.array(TimeSlotEnum).min(1, "Select at least one time slot"),
  sessionDuration: SessionDurationEnum,
  timezone: z.string().min(1, "Timezone is required"),
  isRecurring: z.boolean().default(true),
});

// Skill offered schema
export const skillOfferedSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description too long"),
  category: SkillCategoryEnum,
  experienceLevel: ExperienceLevelEnum,
  yearsOfExperience: z.number().min(0, "Years cannot be negative").max(50, "Years cannot exceed 50").optional(),
});

// Skill wanted schema
export const skillWantedSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description too long"),
  category: SkillCategoryEnum,
  currentLevel: ExperienceLevelEnum.optional(),
  desiredLevel: ExperienceLevelEnum,
});

// Privacy settings schema
export const privacySettingsSchema = z.object({
  isPrivate: z.boolean().default(false),
  showLocation: z.boolean().default(true),
  showRatings: z.boolean().default(true),
  showSkillsOffered: z.boolean().default(true),
  showSkillsWanted: z.boolean().default(true),
  allowDirectContact: z.boolean().default(true),
});

// Location data schema
export const locationDataSchema = z.object({
  address: z.string().optional(),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
}).optional();

// Main profile setup schema
export const profileSetupSchema = z.object({
  // Basic info
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  bio: z.string().max(500, "Bio too long").optional(),
  location: locationDataSchema,

  // Availability
  availability: availabilitySchema,

  // Privacy settings
  privacy: privacySettingsSchema,

  // Skills
  skillsOffered: z.array(skillOfferedSchema).min(0),
  skillsWanted: z.array(skillWantedSchema).min(0),
}).refine(
  (data) => data.skillsOffered.length > 0 || data.skillsWanted.length > 0,
  {
    message: "Please add at least one skill you can offer or want to learn",
    path: ["skillsOffered"],
  }
);

export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
export type SkillOfferedData = z.infer<typeof skillOfferedSchema>;
export type SkillWantedData = z.infer<typeof skillWantedSchema>;
export type AvailabilityData = z.infer<typeof availabilitySchema>;
export type LocationData = z.infer<typeof locationDataSchema>;
