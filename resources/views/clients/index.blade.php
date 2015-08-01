@extends('layouts.master')

@section('header')
    <meta id="token" name="token" value="{{ csrf_token() }}">
    <style>

    </style>
@endsection

@section('content')

    <div id="client">


        <h1>Clients</h1>


        @include('clients.partials._form')

        <hr />

        <div class="form-group">
            <label for="client_filter">
                Filter Clients Name:
            </label>
            <input type="text" name="client_filter" id="client_filter" v-model="client_filter" class="form-control">
        </div>

        <hr />

        <article v-show="newClient.client_name || newClient.client_address">
            <div class="panel panel-success">
                <div class="panel-heading">
                    #######
                </div>
                <div class="panel-body">
                    <p>@{{ newClient.client_name }}
                        <small>@{{ newClient.client_address }}</small>
                    </p>
                </div>
            </div>
        </article>

        <article v-repeat="clients | filterBy client_filter">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <samp><a href="/clients/@{{ client_id }}">@{{ client_id }}</a></samp>
                </div>
                <div class="panel-body">
                        <p>@{{ client_name }}
                            <small>@{{ client_address }}</small>
                        </p>
                </div>
            </div>
        </article>

        {{--<pre>@{{ $data | json }}</pre>--}}
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

                    this.newClient = {client_name: '', client_address: ''};

                    this.submitted = true;

                    client_name.focus();

                    this.$http.post('api/v1/clients', client);
                }
            }
        });
    </script>

@endsection