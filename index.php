<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="theme-color" content="#1ebaed">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> <!--320-->
	
	<title>Rube Goldberg Message Machine</title>

	<link rel="stylesheet" type="text/css" href="css/normalize.css"/>
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
	<link rel="stylesheet" type="text/css" href="css/media-query.css"/>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script src="js/horizontal-scrolling.js"></script>

	<link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>

</head>

<body id="build">
	<?php
		$name = "friend";
		$parts = 'aeghj';
		$message = 'Good Job! Now <a href="build.html">build your own!</a>';
		if (isset($_GET['n'])) { $name = $_GET['n']; }
		if (isset($_GET['p'])) { $parts = $_GET['p']; }
		if (isset($_GET['m'])) { $message = $_GET['m']; }
	?>
	<div class="white-border top"></div>
	<div class="white-border bottom"></div>

	<a href="index.php">
		<div id="logo"></div>
	</a>

	<a href="about.html" class="headerBtn">
		<div class="buttonDepthIcon" id="infoBtn">
			<div class="topBtn">INFO</div>
			<div class="bottomBtn"></div>
		</div>
	</a>

	<a href="build.html" class="headerBtn">
		<div class="buttonDepthIcon" id="buildBtn">
			<div class="topBtn">BUILD</div>
			<div class="bottomBtn"></div>
		</div>
	</a>

	<div id="wrapper">
		<div id="rube-container">
			<div class='block part' id='spacer'></div>
		</div>
	</div>

	<div id='callToActionBlock'>
		<div class="prompt-message" id="scroll-prompt">
			<h2>Scroll,<br><span class="name"><?php echo $name ?></span></h2>
		</div>
		<img src='./img/handpoint.svg' id='handpoint' alt='hand'>
	</div>

	<div class="white-border left"></div>
	<div class="white-border right"></div>

	<p id="hidden-parts" class="invisible"><?php echo $parts ?></p>
	<p id="hidden-message" class="invisible"><?php echo $message ?></p>

<script src="js/build.js"></script>
<script>
    var parts = $("#hidden-parts").text();
    var message = $("#hidden-message").text();
	buildMachine(parts, message)
</script>
</body>
</html>