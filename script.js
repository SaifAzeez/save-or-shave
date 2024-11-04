// Placeholder totals for demonstration
let shaveMoizTotal = 0;
let shaveSufTotal = 0;

// Function to update the progress bars and totals
function updateProgress() {
  // Fetch the latest totals from the server or API
  // For now, using dummy data that increments for demonstration
  shaveMoizTotal += Math.floor(Math.random() * 100);
  shaveSufTotal += Math.floor(Math.random() * 100);

  // Set total display
  document.getElementById("moiz-total").innerText = `$${shaveMoizTotal}`;
  document.getElementById("suf-total").innerText = `$${shaveSufTotal}`;

  // Calculate percentage (adjust max target as needed)
  const maxTarget = 1000;
  const moizPercentage = Math.min((shaveMoizTotal / maxTarget) * 100, 100);
  const sufPercentage = Math.min((shaveSufTotal / maxTarget) * 100, 100);

  // Update progress bar widths
  document.getElementById("moiz-progress-fill").style.width = `${moizPercentage}%`;
  document.getElementById("suf-progress-fill").style.width = `${sufPercentage}%`;

  // Determine the leader
  if (shaveMoizTotal > shaveSufTotal) {
    document.getElementById("leader").innerText = "Leading: Shave Moiz";
  } else if (shaveSufTotal > shaveMoizTotal) {
    document.getElementById("leader").innerText = "Leading: Shave Suf";
  } else {
    document.getElementById("leader").innerText = "It's a tie!";
  }
}

// Update every 5 seconds (or fetch interval)
setInterval(updateProgress, 5000);

// Initial load
updateProgress();
