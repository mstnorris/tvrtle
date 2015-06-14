<!DOCTYPE html>
<html>
    <head>
        <title>Tvrtle</title>

        <link href='http://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/animate.css/3.3.0/animate.min.css">
        <style>
            html, body {
                height: 100%;
            }

            body {
                background: #16a085;
                margin: 0;
                padding: 0;
                width: 100%;
                color: #16a085;
                display: table;
                font-weight: 100;
                font-family: 'Indie Flower', cursive;
                text-shadow: 0px 0px 1px #1abc9c, 0 0 2px #16a085, 0 0 5px #1abc9c;
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 192px;
                margin-bottom: 48px;
            }

            .quote {
                font-size: 24px;
            }

            .title {
                -webkit-animation-duration: 10s;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title animated fadeIn">Tvrtle</div>
            </div>
        </div>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script>
        $('.title').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).addClass('pulse infinite').removeClass('fadeIn');
        });
        </script>
    </body>
</html>
