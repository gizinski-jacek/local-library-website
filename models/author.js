const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
	let fullname = '';
	if (this.first_name && this.family_name) {
		fullname = this.family_name + ', ' + this.first_name;
	}
	if (!this.first_name || !this.family_name) {
		fullname = '';
	}
	return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
	let lifetime_string = '';
	if (this.date_of_birth) {
		lifetime_string = this.date_of_birth.getYear().toString();
	}
	lifetime_string += ' - ';
	if (this.date_of_death) {
		lifetime_string += this.date_of_death.getYear();
	}
	return lifetime_string;
});

// Virtual for author's lifespan formatted
AuthorSchema.virtual('lifespan_formatted').get(function () {
	if (!this.date_of_birth && !this.date_of_death) {
		return 'No lifespan data';
	}
	let birth = '';
	if (this.date_of_birth) {
		birth = new Date(this.date_of_birth).toLocaleString('en-GB', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
	let death = '';
	if (this.date_of_death) {
		death = new Date(this.date_of_death).toLocaleString('en-GB', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
	return `${birth} - ${death}`;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
	return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
