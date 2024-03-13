error_reporting(E_ALL); ini_set('display_errors', 1);
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if any games are selected
    if (isset($_POST["game"])) {
        // Get the selected games
        $selectedGames = $_POST["game"];
        
        // Initialize an associative array to store vote counts for each game
        $voteCounts = array(
            "Rocket League" => 0,
            "Phasmophobia" => 0,
            // Add more games as needed
        );
        
        // Increment vote count for each selected game
        foreach ($selectedGames as $game) {
            if (array_key_exists($game, $voteCounts)) {
                $voteCounts[$game]++;
            }
        }
        
        // Calculate total number of votes
        $totalVotes = array_sum($voteCounts);
        
        // Display voting results
        echo "<h3>Voting Results:</h3>";
        foreach ($voteCounts as $game => $votes) {
            $percentage = ($votes / $totalVotes) * 100;
            echo "<p>$game: $percentage%</p>";
        }
    } else {
        echo "<p>No games selected.</p>";
    }
}
?>
