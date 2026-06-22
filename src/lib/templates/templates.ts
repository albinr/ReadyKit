import type { Template } from "$lib/types/domain";

function createTemplate(
  id: string,
  title: string,
  description: string,
  sections: Array<{ title: string; items: string[] }>
): Template {
  return {
    id,
    title,
    description,
    sections: sections.map((section, sectionIndex) => ({
      id: `${id}_section_${sectionIndex + 1}`,
      title: section.title,
      sortOrder: sectionIndex,
      items: section.items.map((item, itemIndex) => ({
        id: `${id}_item_${sectionIndex + 1}_${itemIndex + 1}`,
        title: item,
        required: itemIndex < 2,
        priority: itemIndex === 0 ? "high" : "medium",
        sortOrder: itemIndex
      }))
    }))
  };
}

export const starterTemplates: Template[] = [
  createTemplate("moving-apartment", "Moving Apartment", "Preparation structure for a residential move.", [
    { title: "Contracts", items: ["Confirm move-in date", "Review rental contract", "Update home insurance"] },
    { title: "Utilities", items: ["Transfer electricity contract", "Set up internet", "Update address with services"] },
    { title: "Packing", items: ["Pack kitchen items", "Pack clothes", "Label fragile boxes"] },
    { title: "Transport", items: ["Book transport", "Reserve parking", "Confirm helpers"] }
  ]),
  createTemplate("long-trip-abroad", "Long Trip Abroad", "Travel-oriented checklist for a longer stay away from home.", [
    { title: "Documents", items: ["Passport", "Travel insurance", "Accommodation details"] },
    { title: "Money", items: ["Bank card", "Emergency cash", "Budget plan"] },
    { title: "Packing", items: ["Chargers", "Medication", "Weather-appropriate clothing"] }
  ]),
  createTemplate("university-start", "University Start", "Administrative and packing prep for starting a new term.", [
    { title: "Documents", items: ["Admission information", "Student account login", "Course registration"] },
    { title: "Housing", items: ["Housing contract", "Move-in checklist", "Rent payment setup"] },
    { title: "Study Setup", items: ["Laptop", "Notebooks", "Calendar setup"] }
  ]),
  createTemplate("internship-preparation", "Internship Preparation", "First-day logistics and admin for a new internship.", [
    { title: "Documents", items: ["Contract", "Start date confirmation", "Tax information"] },
    { title: "Travel", items: ["Travel route", "Backup route", "Arrival time check"] },
    { title: "Work Setup", items: ["Laptop setup", "Required accounts", "Contact person"] }
  ]),
  createTemplate("training-camp", "Training Camp", "Practical checklist for travel, gear, and recovery.", [
    { title: "Gear", items: ["Training shoes", "Training clothes", "Water bottle"] },
    { title: "Nutrition", items: ["Snacks", "Hydration plan", "Meal prep"] },
    { title: "Recovery", items: ["Recovery clothes", "Sleep plan", "Mobility gear"] }
  ]),
  createTemplate("field-course", "Field Course", "Field preparation with travel, safety, and study materials.", [
    { title: "Documents", items: ["Course information", "Travel details", "Emergency contacts"] },
    { title: "Equipment", items: ["Field notebook", "Charged power bank", "Weather-appropriate clothing"] },
    { title: "Safety", items: ["Required reading", "Local safety notes", "Backup contact plan"] }
  ]),
  createTemplate("blank-kit", "Blank Kit", "Start from an empty preparation kit.", [])
];

