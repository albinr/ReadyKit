export function daysUntil(targetDate?: string, now = new Date()): number | null {
  if (!targetDate) {
    return null;
  }

  const target = new Date(targetDate);
  if (Number.isNaN(target.getTime())) {
    return null;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target.getTime() - now.getTime()) / millisecondsPerDay);
}

export function isOverdue(date?: string, now = new Date()): boolean {
  if (!date) {
    return false;
  }

  const dueDate = new Date(date);
  if (Number.isNaN(dueDate.getTime())) {
    return false;
  }

  return dueDate.getTime() < now.getTime();
}

