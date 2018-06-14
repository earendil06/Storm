<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <title>Storm Web Client</title>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="styles.css">

    <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic" rel="stylesheet" type="text/css">

    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

    <!--Components-->
    <script src="Block.js"></script>

</head>
<body>

<div id="container" >
    <command
            v-for="command in commands"
            v-bind:command="command"
            v-bind:user="user">
    </command>


    <div id="input-line" class="input-line">
        <div class="prompt" >{{ user }}</div>
        <div>
            <input v-model="currentInputValue" style="color: white"
                   @keyup.enter="executeCommand"
                   @keyup.38="setPositionHistory"
                   @keyup.40="setPositionHistory"
                   class="cmdline" autofocus/>
        </div>
    </div>
</div>


<script src="scripts.js"></script>
<script>
   <?php 
    if (isset($_GET['server'])) {
        echo "var server = '".$_GET['server']."';";
    } else {
        echo "var server = 'florentpastor.ddns.net';";
    }
   ?> 
</script>
</body>
</html>
