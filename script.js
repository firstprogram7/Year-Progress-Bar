function updateYearProgress() {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Find the exact start of the current year
  const startOfYear = new Date(currentYear, 0, 1);

  // Calculate the difference in milliseconds, then convert to days
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Check if it's a leap year to get total days
  const isLeapYear =
    (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
    currentYear % 400 === 0;
  const totalDaysInYear = isLeapYear ? 366 : 365;

  // Calculate remaining days and percentage
  const daysRemaining = totalDaysInYear - dayOfYear;

  // Prevent percentage from going below 0 at the very end of the year
  const rawPercentage = (daysRemaining / totalDaysInYear) * 100;
  const percentageRemaining = Math.max(0, rawPercentage);

  // Get DOM elements
  const progressBar = document.getElementById("yearProgress");
  const progressText = document.getElementById("progressText");

  // Format the percentage to 2 decimal places (e.g., 75.34%)
  const displayPercent = percentageRemaining.toFixed(2) + "%";

  // Update the UI
  progressBar.style.width = displayPercent;
  progressText.textContent = displayPercent;

  // If the bar gets too small, keep the text visible by pushing it outside or hiding it
  if (percentageRemaining < 5) {
    progressText.style.color = "#333";
    progressText.style.paddingRight = "0";
    progressText.style.transform = "translateX(120%)"; // Push text outside the bar
  }
}

// Run the function immediately when the page loads
updateYearProgress();

// Optional: Update the bar every hour so it stays accurate without refreshing
setInterval(updateYearProgress, 1000 * 60 * 60);
