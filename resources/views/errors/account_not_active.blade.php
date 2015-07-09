<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="">

    <meta name="author" content="">

    <title>Hawksmoor</title>

    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">

    <style>
        body {
            font-family: "HelveticaNeueLight", "HelveticaNeue-Light", "Helvetica Neue Light", "HelveticaNeue", "Helvetica Neue", 'TeXGyreHerosRegular', "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif;
            font-weight: 200;
            width: 100%;
            height: 100%;
        }

        html {
            width: 100%;
            height: 100%;
        }

        section.account-status {
            display: table;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        section.account-status div.account-status-body {
            display: table-cell;
            vertical-align: middle;
        }

        p.status-icon {
            animation-duration: 2s;
            animation-delay: 0s;
            -webkit-animation-duration: 2s;
            -webkit-animation-delay: 0s;
        }

        p.status-heading,
        p.status-message {
            animation-duration: 3s;
            animation-delay: 2s;
            -webkit-animation-duration: 3s;
            -webkit-animation-delay: 2s;
        }

        .status-icon {
            font-size: 96px;
        }

        .status-heading {
            font-size: 32px;
        }

        .status-message {
            font-size: 16px;
        }

        @media(min-width:768px) {
            .status-icon {
                font-size: 144px;
            }

            .status-heading {
                font-size: 48px;
            }
            .status-message {
                font-size: 24px;
            }
        }

        @media(min-width:992px) {

            .status-icon {
                font-size: 192px;
            }

            .status-heading {
                font-size: 64px;
            }

            .status-message {
                font-size: 32px;
            }

        }
    </style>

</head>

<body>

<section class="account-status">

    <div class="account-status-body">

        <div class="container">

            {{--@if ( $statusIcon )--}}
                {{--<p class="status-icon animated infinite pulse"><i class='fa fa-{{ $statusIcon }}'></i></p>--}}
            {{--@endif--}}

            {{--@if ( $statusHeading )--}}
                {{--<p class="status-heading animated fadeIn">{!! $statusHeading !!}</p>--}}
            {{--@endif--}}

            {{--@if ( $statusMessage )--}}
                {{--<p class="status-message animated fadeIn">{!! $statusMessage !!}</p>--}}
            {{--@endif--}}

            <p class="status-icon animated infinite pulse"><i class='fa fa-lock'></i></p>

            <p class="status-heading animated fadeIn">Account Not Active</p>

            <p class="status-message animated fadeIn">
                Please call the office on +44 (0) 1206 323 333<br />
                and we'll look into this for you. Please have<br />
                your email address: {{ $email }} to hand.
            </p>

        </div>

    </div>

</section>

</body>

</html>