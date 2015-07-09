@extends('layouts.master')

@section('header')
    <meta id="token" name="token" value="{{ csrf_token() }}">
@endsection

@section('content')

    <div id="client">

        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <h1>Clients</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">

                <form method="POST" v-on="submit: onSubmitForm">

                    <div class="form-group">
                        <label for="client_name">
                            Client Name:
                            <span class="error" v-if="! newClient.client_name">*</span>
                        </label>
                        <input type="text" name="client_name" id="client_name" class="form-control"
                               v-model="newClient.client_name">
                    </div>

                    <div class="form-group">
                        <label for="client_address">
                            Client Address:
                            <span class="error" v-if="! newClient.client_address">*</span>
                        </label>
                        <input type="text" name="client_address" id="client_address" class="form-control"
                               v-model="newClient.client_address">
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-default" v-attr="disabled: errors">Add Client</button>
                    </div>

                    <div class="alert alert-success animated fadeIn" v-if="submitted">Thanks!</div>

                </form>

                <hr/>

                <article v-repeat="clients">
                    <h3>@{{ client_id }} - @{{ client_name }} <small>@{{ client_address }}</small></h3>
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