async function fetchDonationData() {
  try {
    const response = await fetch('/donations');
    const data = await response.json();

    // Define the maximum target for each campaign (e.g., £1000)
    const maxTarget = 1000;

    // Calculate the percentage for each campaign
    const sufyanPercentage = Math.min((data.sufyan / maxTarget) * 100, 100);
    const moizPercentage = Math.min((data.moiz / maxTarget) * 100, 100);

    // Update the donation amounts
    document.getElementById('sufyan-total').innerText = `£${data.sufyan}`;
    document.getElementById('moiz-total').innerText = `£${data.moiz}`;

    // Update the width of the progress bars based on the calculated percentage
    document.getElementById('sufyan-progress').style.width = `${sufyanPercentage}%`;
    document.getElementById('moiz-progress').style.width = `${moizPercentage}%`;

    // Display which campaign is leading
    const leaderText = data.sufyan > data.moiz ? "Leading: Shave Sufyan" :
                       data.moiz > data.sufyan ? "Leading: Shave Moiz" : "It's a tie!";
    document.getElementById('leader').innerText = leaderText;

  } catch (error) {
    console.error('Error fetching donation data:', error);
  }
}

// Fetch data every 30 seconds and update initially
setInterval(fetchDonationData, 30000);
fetchDonationData();
