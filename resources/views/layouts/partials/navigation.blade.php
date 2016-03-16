
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">Tvrtle</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            @if ( auth()->check() )
            <ul class="nav navbar-nav">
                <li><a href="/clients">Clients</a></li>
                <li><a href="/invoices">Invoices</a></li>
                <li><a href="/jobs">Jobs</a></li>
                <li><a href="/categories">Categories</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-fw fa-user"></i> {{ auth()->user()->name }} <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="/logout"><i class="fa fa-fw fa-sign-out"></i> Sign out</a></li>
                    </ul>
                </li>
            </ul>
            @else
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/login"><i class="fa fa-fw fa-lock"></i> Sign in</a></li>
            </ul>
            @endif
        </div><!-- /.navbar-collapse -->
            </div>
        </div>
    </div><!-- /.container-fluid -->
</nav>
