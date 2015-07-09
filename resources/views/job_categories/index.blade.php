@extends('layouts.master')

@section('header')
    <meta id="token" name="token" value="{{ csrf_token() }}">
@endsection

@section('content')

    <div id="job">

        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <h1>Job Categories</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">

                <form method="POST" v-on="submit: onSubmitForm">

                    <div class="form-group">
                        <label for="job_id">
                            Job ID:
                            <span class="error" v-if="! newJob.job_id">*</span>
                        </label>
                        <input type="text" name="job_id" id="job_id" class="form-control" v-model="newJob.job_id">
                    </div>

                    <div class="form-group">
                        <label for="job_number">
                            Job Number:
                            <span class="error" v-if="! newJob.job_number">*</span>
                        </label>
                        <input type="text" name="job_number" id="job_number" class="form-control"
                               v-model="newJob.job_number">
                    </div>

                    <div class="form-group">
                        <label for="job_name">
                            Job Name:
                            <span class="error" v-if="! newJob.job_name">*</span>
                        </label>
                        <input type="text" name="job_name" id="job_name" class="form-control"
                               v-model="newJob.job_name">
                    </div>

                    <div class="form-group">
                        <label for="job_category_id">
                            Job Category ID:
                            <span class="error" v-if="! newJob.job_category_id">*</span>
                        </label>
                        <input type="text" name="job_category_id" id="job_category_id" class="form-control"
                               v-model="newJob.job_category_id">
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-default" v-attr="disabled: errors">Add Job</button>
                    </div>

                    <div class="alert alert-success animated fadeIn" v-if="submitted">Thanks!</div>

                </form>

                <hr/>

                <article v-repeat="jobs">
                    <h3>@{{ job_number }}</h3>
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
            el: '#job',

            data: {

//                jobs: {
//                    job_id: '',
//                    job_number: '',
//                    job_name: '',
//                    job_category_id: ''
//                },

                newJob: {
                    job_id: '',
                    job_number: '',
                    job_name: '',
                    job_category_id: ''
                },

                submitted: false
            },

            computed: {
                errors: function () {
                    for (var key in this.newJob) {
                        if (!this.newJob[key]) return true;
                    }

                    return false;
                }
            },

            ready: function () {
                this.fetchJobs();
            },

            methods: {
                fetchJobs: function () {
                    this.$http.get('api/v1/jobs', function (jobs) {
                        this.$set('jobs', jobs);
                    })
                },

                onSubmitForm: function (e) {
                    e.preventDefault();

                    var job = this.newJob;

                    this.jobs.push(job);

                    this.newJob = { job_id: '', job_number: '', job_name: '', job_category_id: '' };

                    this.submitted = true;

                    job_id.focus();

                    this.$http.post('api/v1/jobs', job);
                }
            }
        });
    </script>

@endsection