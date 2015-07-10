@extends('layouts.master')

@section('header')
    <meta id="token" name="token" value="{{ csrf_token() }}">
@endsection

@section('content')

    <div id="client">

        <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
                <h1>Clients</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3">

                @include('clients.partials._form')

                <hr/>

                <div class="form-group">
                    <label for="client_filter">
                    Filter Clients Name:
                    </label>
                    <input type="text" name="client_filter" id="client_filter" v-model="client_filter" class="form-control">
                </div>

                <hr>

                <article v-repeat="clients | filterBy client_filter">
                <div class="panel panel-default">
                        <div class="panel-body">
                            <h3>@{{ client_id }} - @{{ client_name }} <small>@{{ client_address }}</small></h3>
                        </div>
                </div>
                </article>

                {{--<pre>@{{ $data | json }}</pre>--}}
            </div>
        </div>


    </div>


@endsection

@section('footer')

    <script>
        Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

        new Vue({
            el: '#client',

            data: {

//                clients: {
//                    client_id: '',
//                    client_address: '',
//                    client_name: '',
//                    client_category_id: ''
//                },

                newClient: {
                    client_name: '',
                    client_address: ''
                },

                submitted: false
            },

            computed: {
                errors: function () {
                    for (var key in this.newClient) {
                        if (!this.newClient[key]) return true;
                    }

                    return false;
                }
            },

            ready: function () {
                this.fetchClients();
            },

            methods: {
                fetchClients: function () {
                    this.$http.get('api/v1/clients', function (clients) {
                        this.$set('clients', clients);
                    })
                },

                onSubmitForm: function (e) {
                    e.preventDefault();

                    var client = this.newClient;

                    this.clients.push(client);

                    this.newClient = { client_name: '', client_address: '' };

                    this.submitted = true;

                    client_name.focus();

                    this.$http.post('api/v1/clients', client);
                }
            }
        });
    </script>

@endsection