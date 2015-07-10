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
        <button type="submit" class="btn btn-primary" v-attr="disabled: errors">Add Client</button>
    </div>

    <div class="alert alert-success animated fadeIn" v-if="submitted">Thanks!</div>

</form>